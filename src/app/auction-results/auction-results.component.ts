import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { LoginService } from '../login/login.service';
declare let gtag: any;

@Component({
  selector: 'app-auction-results',
  templateUrl: './auction-results.component.html',
  styleUrls: ['./auction-results.component.css']
})
export class AuctionResultsComponent implements OnInit {
  resultsForm: FormGroup;

  constructor(fb: FormBuilder, private dbs: DatabaseService, private ls: LoginService) {
    this.resultsForm = fb.group({
      'patronID': ['', Validators.required],
      'itemID': ['', Validators.required],
      'purchasePrice': ['', [Validators.required, Validators.pattern(/^[1-9]\d*(\.\d+)?$/)]]
    });
  }

  onSubmit(value) {
    gtag('event', 'enter_auction_result', {
      'event_category': 'data_entry'
    });
    this.dbs.updateAuctionHistory(value.itemID, value.patronID, value.purchasePrice, this.ls.sessionID);
    this.dbs.linkItemToPatron(value.itemID, value.patronID, value.purchasePrice);
  }

  ngOnInit() {
  }

}
