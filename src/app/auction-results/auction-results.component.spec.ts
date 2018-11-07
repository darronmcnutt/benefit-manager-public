import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionResultsComponent } from './auction-results.component';

describe('AuctionResultsComponent', () => {
  let component: AuctionResultsComponent;
  let fixture: ComponentFixture<AuctionResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
