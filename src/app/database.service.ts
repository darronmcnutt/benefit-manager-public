import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: AngularFirestore) { }

  getItems(): Observable<any> {
    return this.db.collection('items').valueChanges();
  }

  getPatrons(): Observable<any> {
    return this.db.collection('patrons').valueChanges();
  }

  getItemsByPatronID(patronID): Observable<any> {
    return this.db.collection('items',
                ref => ref.where('owner', '==', patronID))
                .valueChanges();
  }

  getPatronInfoByID(patronID): Observable<any> {
    return this.db.doc(`patrons/${patronID}`).valueChanges();
  }

  addLiveItem(itemID, patronID, description, purchasePrice) {
    this.db.doc(`items/L${itemID}`).set(
      { owner: patronID,
        description: description,
        purchasePrice: Number(purchasePrice),
        id: `L${itemID}`,
        marketValue: Number(0)
      }
    ).catch(() => console.log(`addLiveItem failed on ${itemID}, ${patronID}, ${description}, ${purchasePrice}`));
  }

  linkItemToPatron(itemID, patronID, purchasePrice) {
    // TODO: Investigate using batch transactions in firestore. Need a rollback feature.

    // Update purchase price and owner of item
    // Update patron's list of owned items
    this.db.doc(`items/${itemID}`).update(
      { purchasePrice: Number(`${purchasePrice}`),
        owner: patronID })
      .catch(() => console.log(`linkItemToPatron failed on ${itemID}, ${patronID}, ${purchasePrice}`));
}

  unlinkItemToPatron(itemID) {
    // Update owner of item
    this.db.doc(`items/${itemID}`).update({ owner: null })
    .catch(() => console.log(`unlinkItemToPatron failed on ${itemID}`));
  }

  mergeItemOwners(fromPatronID, toPatronID) {
    const fromItems = this.db.collection('items',
            ref => ref.where('owner', '==', fromPatronID))
            .valueChanges().pipe(take(1));

    fromItems.subscribe( itemArray => itemArray.map(item => {
                          // this.unlinkItemToPatron(item['id']);
                          this.linkItemToPatron(item['id'], toPatronID, item['purchasePrice']);
    }));
  }

  uploadCSV(file, dest) {
    let upload;

    switch (dest) {
      case 'patrons':
        upload = this.uploadPatronCSV;
        break;
      case 'items':
        upload = this.uploadItemCSV;
        break;
      default:
        console.log(`uploadCSV: ${dest} is not a valid destination`);
        break;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const rawText = reader.result.toString();
      const cleanedText = rawText.replace(/["]+/g, '').trim();
      const rows = cleanedText.split('\r');
      rows.shift();
      upload(rows, this.db);
    };

    reader.readAsText(file);
  }

  uploadPatronCSV(rows: Array<string>, db: AngularFirestore) {
    for (const row of rows) {
      const values = row.split(',');
      const patron = {
        id: values[0].toString().trim(),
        firstName: values[1].toString().trim(),
        lastName: values[2].toString().trim(),
        email: values[3],
        items: []
      };
      db.doc(`patrons/${values[0].toString().trim()}`).set(patron)
      .catch(() => console.log(`uploadPatronCSV failed`));
    }
  }

  uploadItemCSV(rows: Array<string>, db: AngularFirestore) {
    for (const row of rows) {
      const values = row.split(',');
      const item = {
        id: values[0].toString().trim(),
        description: values[1].toString().trim(),
        marketValue: Number(values[2]),
        purchasePrice: Number(values[3]),
        owner: values[4].toString().trim()
      };

      db.doc(`items/${values[0].toString().trim()}`).set(item)
      .catch(() => console.log(`uploadItemCSV failed`));
    }
  }

  isAdmin(uid) {
    return this.db.doc(`admins/${uid}`).valueChanges().pipe(map(result => !!result));
  }

  addItem(itemID, description, marketValue, purchasePrice, owner) {
    this.db.doc(`items/${itemID}`).set(
      { id: itemID.trim(),
        description: description.trim(),
        marketValue: Number(marketValue),
        purchasePrice: Number(purchasePrice),
        owner: owner.trim()
      }).catch( () => console.log(`addItem failed`));
  }

  addPatron(patronID, firstName, lastName, email) {
    this.db.doc(`patrons/${patronID}`).set(
    {
      id: patronID.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      items: []
    }).catch( () => console.log(`addPatron failed`));
  }

  createSession(userID): string {
    const sessionID = this.db.createId();
    this.db.doc(`sessions/${sessionID}`).set(
      {
        sessionID: sessionID,
        created: Date.now(),
        userID: userID
      }).catch( () => console.log(`createSession failed`));
    return sessionID;
  }

  updateAuctionHistory(itemID, patronID, purchasePrice, sessionID) {
    this.db.doc(`sessions/${sessionID}`).collection('history').add(
      {
        itemID: itemID,
        patronID: patronID,
        purchasePrice: purchasePrice,
        timestamp: Date.now()
      }
    ).catch(() => console.log(`updateAuctionHistory failed on sessionID: ${sessionID}`));
  }

  updateLiveAuctionHistory(description, itemID, patronID, purchasePrice, sessionID) {
    this.db.doc(`sessions/${sessionID}`).collection('history').add(
      {
        itemID: itemID,
        patronID: patronID,
        purchasePrice: purchasePrice,
        timestamp: Date.now(),
        description: description
      }
    ).catch(() => console.log(`updateLiveAuctionHistory failed on sessionID: ${sessionID}`));
  }

  getAuctionHistory(sessionID) {
    return this.db.doc(`sessions/${sessionID}`).collection('history').valueChanges();
  }

  getSessionHistory() {
    return this.db.collection('sessions').valueChanges();
  }
}
