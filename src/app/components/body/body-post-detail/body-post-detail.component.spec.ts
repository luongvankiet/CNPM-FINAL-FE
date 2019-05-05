import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyPostDetailComponent } from './body-post-detail.component';

describe('BodyPostDetailComponent', () => {
  let component: BodyPostDetailComponent;
  let fixture: ComponentFixture<BodyPostDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyPostDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyPostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
