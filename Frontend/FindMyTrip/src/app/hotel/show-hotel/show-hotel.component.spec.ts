import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHotelComponent } from './show-hotel.component';

describe('ShowHotelComponent', () => {
  let component: ShowHotelComponent;
  let fixture: ComponentFixture<ShowHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowHotelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
