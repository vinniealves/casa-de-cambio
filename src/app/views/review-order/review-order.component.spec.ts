import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOrderComponent } from './review-order.component';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ReviewOrderComponent', () => {
  let component: ReviewOrderComponent;
  let fixture: ComponentFixture<ReviewOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewOrderComponent, RouterModule.forRoot([])],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list a single table for all coins, non-editable, sorted by coin and face, with only the faces that had a quantity greater than or equal to 1', () => {});
  it('should display the personal data provided', () => {});
  it('should display a button that returns to the order page with the data provided', () => {});
  it('should display a button "Finalizar pedido" that display a success message and then returns to home page', () => {});
});
