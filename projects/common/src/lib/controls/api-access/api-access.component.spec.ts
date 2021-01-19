import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiAccessComponent } from './api-access.component';

describe('ApiAccessComponent', () => {
  let component: ApiAccessComponent;
  let fixture: ComponentFixture<ApiAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
