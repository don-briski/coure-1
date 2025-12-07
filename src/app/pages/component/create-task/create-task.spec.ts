import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTask } from './create-task';
import { SharedModule } from '../../../shared/shared-module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('CreateTask', () => {
  let component: CreateTask;
  let fixture: ComponentFixture<CreateTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CreateTask, SharedModule],
       providers: [
      { provide: MAT_DIALOG_DATA, useValue: { task: undefined } },
      { provide: MatDialogRef, useValue: { close: () => {} } }
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
