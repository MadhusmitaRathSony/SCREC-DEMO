import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFaceComponent } from './delete-face.component';

describe('DeleteFaceComponent', () => {
  let component: DeleteFaceComponent;
  let fixture: ComponentFixture<DeleteFaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteFaceComponent]
    });
    fixture = TestBed.createComponent(DeleteFaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
