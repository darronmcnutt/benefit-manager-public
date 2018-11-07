import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Observable<any>;
  constructor(private dbs: DatabaseService) {
    this.items = this.dbs.getItems();
  }

  ngOnInit() {

  }

}
