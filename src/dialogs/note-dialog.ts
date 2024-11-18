import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { Note } from "../models/note.model";
import { Component, inject } from "@angular/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'note-dialog',
  templateUrl: './note-dialog.html',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
  ],
})
export class NoteDialog {
  readonly dialogRef = inject(MatDialogRef<NoteDialog>);
  static id: number = 1;
  note: Note = {
    id: NoteDialog.id,
    title: '',
    content: '',
    date: new Date(),
  }
  constructor() {
    NoteDialog.id += 1
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
}
