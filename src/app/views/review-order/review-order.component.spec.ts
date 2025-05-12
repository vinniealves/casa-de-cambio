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
});
