import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodySidebarComponent } from './body-sidebar.component';

describe('BodySidebarComponent', () => {
  let component: BodySidebarComponent;
  let fixture: ComponentFixture<BodySidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodySidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
