import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginService } from './login.service';
declare let gtag: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private ls: LoginService,
              public afAuth: AngularFireAuth) {

    this.loginForm = fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });

  }

  login(value) {
    gtag('event', 'login', { method : 'Email' });
    this.ls.logInWithEmailAndPassword(value.email, value.password);
  }

  logout() {
    this.ls.logOut();
    this.router.navigate(['']);
  }

  ngOnInit() {
  }

}
