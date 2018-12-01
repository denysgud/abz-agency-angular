import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbzSelectComponent } from './abz-select.component';

describe('AbzSelectComponent', () => {
  let component: AbzSelectComponent;
  let fixture: ComponentFixture<AbzSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbzSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbzSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
