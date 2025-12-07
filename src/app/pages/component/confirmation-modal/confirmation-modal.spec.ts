import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationModal } from './confirmation-modal';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ConfirmationModal', () => {
  let component: ConfirmationModal;
  let fixture: ComponentFixture<ConfirmationModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ConfirmationModal],
       providers: [
      { provide: MAT_DIALOG_DATA, useValue: { task: undefined } },
      { provide: MatDialogRef, useValue: { close: () => {} } }
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
