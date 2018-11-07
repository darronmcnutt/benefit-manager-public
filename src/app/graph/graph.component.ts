import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
declare let Plotly: any;

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  layout: any;
  data: any;
  trace: any;
  items: Observable<any>;

  constructor(private dbs: DatabaseService) {
    this.items = dbs.getItems();

    this.layout = {
      title: 'Funds Raised',
      font: {size: 18}
    };
  }

  ngOnInit() {
    this.items.pipe(
      map(items => items
      .reduce( (acc, curr) => acc + curr.purchasePrice, 0)))
      .subscribe( auctionTotal => {
        this.updateChart(auctionTotal);
         });
  }

  updateChart(auctionTotal) {
    this.trace = {
      type: 'bar',
      x: ['Auction', 'Ticket Sales', 'Donations'],
      y: [auctionTotal, 7630, 1175],
      marker: {
          color: '#007bff',
          line: {
              width: 2.5
          }
      }
    };

    this.data = [ this.trace ];

    Plotly.react('plotlyChart', this.data, this.layout, {responsive: true});
  }

}
