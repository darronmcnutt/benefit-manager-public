import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { DatabaseService } from '../database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  auctionHistory: Observable<any>;
  userID: string;

  constructor(public ls: LoginService, private dbs: DatabaseService) {
      this.auctionHistory = dbs.getAuctionHistory(ls.sessionID);
      this.userID = ls.userID;
  }

  ngOnInit() {
  }

}
