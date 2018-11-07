import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-patrons',
  templateUrl: './patrons.component.html',
  styleUrls: ['./patrons.component.css']
})
export class PatronsComponent implements OnInit {
  patrons: Observable<any>;

  constructor(private dbs: DatabaseService) {
    this.patrons = dbs.getPatrons();
  }

  ngOnInit() {
  }

}
