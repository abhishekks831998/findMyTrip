import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPackagesComponent } from './show-packages.component';

describe('ShowPackagesComponent', () => {
  let component: ShowPackagesComponent;
  let fixture: ComponentFixture<ShowPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowPackagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
