import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  csvForm: FormGroup;
  csvFile: File;

  constructor(fb: FormBuilder, private dbs: DatabaseService, private router: Router) {
    this.csvForm = fb.group({
      'csvFile': ['', Validators.required],
      'dataType': ['', Validators.required]
    });
  }

  onFileChange(event) {
    const fileList = event.target.files;
    if (fileList && fileList.length) {
      this.csvFile = fileList[0];
    }
  }
  onSubmit(value) {
    this.dbs.uploadCSV(this.csvFile, value.dataType);
    this.router.navigate([`/${value.dataType}`]);
  }
}
