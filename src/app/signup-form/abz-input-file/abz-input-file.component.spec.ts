import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbzInputFileComponent } from './abz-input-file.component';

describe('AbzInputFileComponent', () => {
  let component: AbzInputFileComponent;
  let fixture: ComponentFixture<AbzInputFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbzInputFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbzInputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
