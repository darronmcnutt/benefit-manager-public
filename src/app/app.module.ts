import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReceiptComponent } from './receipt/receipt.component';
import { AuctionResultsComponent } from './auction-results/auction-results.component';
import { UploadComponent } from './upload/upload.component';
import { MergeComponent } from './merge/merge.component';
import { ItemsComponent } from './items/items.component';
import { PatronsComponent } from './patrons/patrons.component';
import { LiveauctionComponent } from './liveauction/liveauction.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { ReceiptViewComponent } from './receipt-view/receipt-view.component';
import { GraphComponent } from './graph/graph.component';
import { LoginService } from './login/login.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'auction-results', component: AuctionResultsComponent, canActivate: [AuthGuard] },
  { path: 'merge', component: MergeComponent, canActivate: [AuthGuard] },
  { path: 'receipt', component: ReceiptComponent, canActivate: [AuthGuard] },
  { path: 'patrons', component: PatronsComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: UploadComponent, canActivate: [AdminGuard] },
  { path: 'items', component: ItemsComponent, canActivate: [AuthGuard] },
  { path: 'live-auction', component: LiveauctionComponent, canActivate: [AuthGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [AdminGuard] },
  { path: '**', redirectTo: 'home'}
];


@NgModule({
  declarations: [
    AppComponent,
    ReceiptComponent,
    AuctionResultsComponent,
    UploadComponent,
    MergeComponent,
    ItemsComponent,
    PatronsComponent,
    LiveauctionComponent,
    LoginComponent,
    HomeComponent,
    HistoryComponent,
    ReceiptViewComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [AuthGuard, AdminGuard, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
