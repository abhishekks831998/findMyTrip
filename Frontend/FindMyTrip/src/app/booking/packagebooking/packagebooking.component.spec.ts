import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagebookingComponent } from './packagebooking.component';

describe('PackagebookingComponent', () => {
  let component: PackagebookingComponent;
  let fixture: ComponentFixture<PackagebookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PackagebookingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackagebookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
