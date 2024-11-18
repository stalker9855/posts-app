import { Component, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Note } from '../models/note.model';
import { NoteDialog } from '../dialogs/note-dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  notes: Note[] = []
  filteredNotes = new MatTableDataSource(this.notes)
  deleteNotes: Note[] = []
  displayedColumns: string[] = ['id', 'title', 'content', 'date', 'actions']
  readonly dialog = inject(MatDialog)
  readonly snackBar = inject(MatSnackBar)
  selectedDate: Date | null = null
  title = 'material-angular';

  @ViewChild(MatTable) table!: MatTable<Note>


  openDialog(): void {
    const dialogRef = this.dialog.open(NoteDialog)

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notes.push(result)
        this.snackBar.open('Note added successfully', 'Close', { duration: 2000, verticalPosition: 'top' })
      }
      this.table.renderRows()
    })
  }
  selectDate(event: any): void {
    this.selectedDate = event.value
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredNotes.filter = filterValue.trim().toLowerCase()
    this.table.renderRows()
  }

  deleteNote(note: Note): void {
    const index = this.notes.indexOf(note)
    if (index >= 0) {
      this.notes.splice(index, 1);
      this.snackBar.open('Note deleted successfully', 'Close', { duration: 2000, verticalPosition: 'top' })
      this.table.renderRows()
    }
  }
}
