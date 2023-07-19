import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFaceComponent } from './register-face.component';

describe('RegisterFaceComponent', () => {
  let component: RegisterFaceComponent;
  let fixture: ComponentFixture<RegisterFaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterFaceComponent]
    });
    fixture = TestBed.createComponent(RegisterFaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
