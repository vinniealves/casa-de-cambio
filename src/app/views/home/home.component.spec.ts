import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { Router, RouterModule } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a title  “Casa de câmbio”', () => {
    const title =
      fixture.nativeElement.querySelector('#home_title').textContent;
    expect(title).toContain('Casa de câmbio');
  });
  it('should contain a logo image', () => {
    const logo = fixture.nativeElement.querySelector('#home_logo');
    expect(logo).toBeTruthy();
  });
  it('should contain a button that redirects to the order page', async () => {});
});
