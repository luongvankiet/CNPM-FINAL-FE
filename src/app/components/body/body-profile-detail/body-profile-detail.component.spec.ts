import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyProfileDetailComponent } from './body-profile-detail.component';

describe('BodyProfileDetailComponent', () => {
  let component: BodyProfileDetailComponent;
  let fixture: ComponentFixture<BodyProfileDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyProfileDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyProfileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
