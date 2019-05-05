import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyCreatePostComponent } from './body-create-post.component';

describe('BodyCreatePostComponent', () => {
  let component: BodyCreatePostComponent;
  let fixture: ComponentFixture<BodyCreatePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyCreatePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyCreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
