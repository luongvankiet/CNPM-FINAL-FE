import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyContactComponent } from './body-contact.component';

describe('BodyContactComponent', () => {
  let component: BodyContactComponent;
  let fixture: ComponentFixture<BodyContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
