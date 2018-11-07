import { Component, OnChanges, Input } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-receipt-view',
  templateUrl: './receipt-view.component.html',
  styleUrls: ['./receipt-view.component.css']
})
export class ReceiptViewComponent implements OnChanges {
  @Input() patronID: string;
  itemResults: Observable<any>;
  patronResults: Observable<any>;
  purchaseTotal: Observable<any>;
  marketTotal: Observable<any>;

  constructor(private dbs: DatabaseService) {
  }

  ngOnChanges() {
    this.itemResults = this.dbs.getItemsByPatronID(this.patronID);
    this.patronResults = this.dbs.getPatronInfoByID(this.patronID);

    this.purchaseTotal = this.itemResults.pipe(
                 switchMap(resultArray => of
                 (resultArray.reduce( (acc, curr) => acc + curr.purchasePrice, 0 ))));
    this.marketTotal = this.itemResults.pipe(
                  switchMap(resultArray => of
                  (resultArray.reduce( (acc, curr) => acc + curr.marketValue, 0 ))));
  }
}
