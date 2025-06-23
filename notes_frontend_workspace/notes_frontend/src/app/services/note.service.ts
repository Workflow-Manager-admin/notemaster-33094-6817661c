import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notes: Note[] = [];
  private notes$ = new BehaviorSubject<Note[]>([]);
  private nextId = 1;

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData() {
    // Optionally load initial or demo data. Here we start empty.
    this.notes$.next([...this.notes]);
  }

  // PUBLIC_INTERFACE
  getNotes(): Observable<Note[]> {
    return this.notes$.asObservable();
  }

  // PUBLIC_INTERFACE
  getNoteById(id: number): Note | undefined {
    return this.notes.find((n) => n.id === id);
  }

  // PUBLIC_INTERFACE
  createNote(note: Partial<Note>): void {
    const now = new Date();
    const newNote: Note = {
      id: this.nextId++,
      title: note.title ?? '',
      content: note.content ?? '',
      createdAt: now,
      updatedAt: now,
    };
    this.notes = [newNote, ...this.notes];
    this.notes$.next([...this.notes]);
  }

  // PUBLIC_INTERFACE
  updateNote(id: number, note: Partial<Note>): void {
    this.notes = this.notes.map((n) =>
      n.id === id ? { ...n, ...note, updatedAt: new Date() } : n
    );
    this.notes$.next([...this.notes]);
  }

  // PUBLIC_INTERFACE
  deleteNote(id: number): void {
    this.notes = this.notes.filter((n) => n.id !== id);
    this.notes$.next([...this.notes]);
  }
}
