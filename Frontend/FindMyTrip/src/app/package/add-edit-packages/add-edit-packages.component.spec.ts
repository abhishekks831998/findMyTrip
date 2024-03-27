import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPackagesComponent } from './add-edit-packages.component';

describe('AddEditPackagesComponent', () => {
  let component: AddEditPackagesComponent;
  let fixture: ComponentFixture<AddEditPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditPackagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
