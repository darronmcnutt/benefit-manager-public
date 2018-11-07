import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { LoginService } from '../login/login.service';
declare let gtag: any;

@Component({
  selector: 'app-liveauction',
  templateUrl: './liveauction.component.html',
  styleUrls: ['./liveauction.component.css']
})
export class LiveauctionComponent implements OnInit {

  resultsForm: FormGroup;
  auctionHistory: any;

  constructor(fb: FormBuilder, private dbs: DatabaseService, private ls: LoginService) {
    this.resultsForm = fb.group({
      'itemID': ['', Validators.required],
      'patronID': ['', Validators.required],
      'description': ['', Validators.required],
      'purchasePrice': ['', [Validators.required, Validators.pattern(/^[1-9]\d*(\.\d+)?$/)]]
    });
    this.auctionHistory = this.dbs.getAuctionHistory(this.ls.sessionID);
  }

  onSubmit(value) {
    gtag('event', 'enter_auction_result', {
      'event_category': 'data_entry'
    });
    this.dbs.addLiveItem(value.itemID, value.patronID, value.description, value.purchasePrice);
    this.dbs.updateLiveAuctionHistory(value.description, value.itemID, value.patronID, value.purchasePrice, this.ls.sessionID);
  }

  ngOnInit() {
  }

}
