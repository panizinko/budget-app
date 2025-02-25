import { KeyValuePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ReactiveFormsModule, type FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-modal-form',
  imports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    KeyValuePipe,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <header class="mb-4 flex items-center justify-between">
      <h2>{{ title() }}</h2>
      <button mat-icon-button (click)="close.emit()">
        <mat-icon>close</mat-icon>
      </button>
    </header>
    <section>
      <form [formGroup]="formGroup()" (ngSubmit)="save.emit(); close.emit()">
        @for (control of formGroup().controls | keyvalue; track control.key) {
          <div class="flex flex-col gap-4">
            <label>{{ control.key }}</label>
            <mat-form-field>
              <mat-label>{{ control.key }}</mat-label>
              <input
                matInput
                [id]="control.key"
                type="text"
                [formControlName]="control.key"
              />
            </mat-form-field>
          </div>
        }
        <button mat-button type="submit">Submit</button>
      </form>
    </section>
  `,
  styles: ``,
})
export class ModalFormComponent {
  title = input.required<string>();
  formGroup = input.required<FormGroup>();

  save = output();
  close = output();
}
