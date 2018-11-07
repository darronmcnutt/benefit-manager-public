import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.css']
})
export class MergeComponent {

  mergeForm: FormGroup;
  fromPatronID: string;
  toPatronID: string;

  constructor(fb: FormBuilder, private dbs: DatabaseService) {
    this.mergeForm = fb.group({
      'fromPatronID': ['', Validators.required],
      'toPatronID': ['', Validators.required]
    });
  }

  onSubmit(value) {
    this.dbs.mergeItemOwners(value.fromPatronID, value.toPatronID);
    this.fromPatronID = value.fromPatronID;
    this.toPatronID = value.toPatronID;
  }

}
