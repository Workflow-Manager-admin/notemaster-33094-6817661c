import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent {
  @Input() note: Note | null = null;
  @Input() editMode = false;
  @Output() save = new EventEmitter<Partial<Note>>();
  @Output() delete = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  editableNote: Partial<Note> = {};

  ngOnChanges() {
    if (this.editMode && this.note) {
      this.editableNote = { ...this.note }; // shallow clone for editing
    } else if (!this.editMode) {
      this.editableNote = {};
    }
  }

  saveEdit() {
    if ((this.editableNote.title?.trim() ?? '').length === 0) {
      this.editableNote.title = 'Untitled';
    }
    this.save.emit(this.editableNote);
  }
}
