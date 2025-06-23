import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';
import { NoteListComponent } from '../../components/note-list/note-list.component';
import { NoteDetailComponent } from '../../components/note-detail/note-detail.component';
import { FabComponent } from '../../components/fab/fab.component';

@Component({
  selector: 'app-notes-page',
  standalone: true,
  imports: [CommonModule, NoteListComponent, NoteDetailComponent, FabComponent],
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.css'],
})
export class NotesPageComponent {
  notes: Note[] = [];
  selectedNote: Note | null = null;
  editMode = false;
  createMode = false;

  constructor(private noteService: NoteService) {
    noteService.getNotes().subscribe((notes) => (this.notes = notes));
  }

  onNoteSelect(note: Note) {
    this.selectedNote = note;
    this.editMode = false;
    this.createMode = false;
  }

  onFabClick() {
    this.selectedNote = null;
    this.createMode = true;
    this.editMode = false;
  }

  saveNote(noteData: Partial<Note>) {
    if (this.createMode) {
      this.noteService.createNote(noteData);
    } else if (this.selectedNote) {
      this.noteService.updateNote(this.selectedNote.id, noteData);
    }
    this.selectedNote = null;
    this.createMode = false;
    this.editMode = false;
  }

  editNote() {
    this.editMode = true;
  }

  cancelDetail() {
    this.selectedNote = null;
    this.createMode = false;
    this.editMode = false;
  }

  deleteNote() {
    if (this.selectedNote) {
      this.noteService.deleteNote(this.selectedNote.id);
      this.selectedNote = null;
      this.createMode = false;
      this.editMode = false;
    }
  }
}
