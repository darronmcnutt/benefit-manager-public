import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent {
  idForm: FormGroup;
  patronID: string;
  itemResults: Observable<any>;
  patronResults: Observable<any>;
  purchaseTotal: Observable<any>;
  marketTotal: Observable<any>;

  constructor(fb: FormBuilder, private dbs: DatabaseService) {
    this.idForm = fb.group({
      'patronID': ['', Validators.required]
    });
  }

  onSubmit(value) {
    this.patronID = value.patronID;
 }

}
