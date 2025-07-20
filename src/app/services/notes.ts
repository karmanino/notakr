import { Injectable, signal } from '@angular/core';
import { NOTES_PREFIX } from '../shared/constants';
import { Note } from '../shared/interfaces/note';

@Injectable({
  providedIn: 'root',
})
export class Notes {
  noteTitles = signal<{ id: string; title: string }[]>([]);

  getNotesTitles(): void {
    const notes: { id: string; title: string }[] = [];
    Object.keys(localStorage)
      .filter((key) => key.startsWith(NOTES_PREFIX))
      .forEach((item) => {
        try {
          const note: Note | null = JSON.parse(
            localStorage.getItem(item) ?? ''
          );
          console.log(note);
          if (!note?.title) return;
          notes.push({
            id: item.substring(NOTES_PREFIX.length),
            title: note.title,
          });
        } catch {
          return;
        }
      });
    if (!notes.length) {
      this.insertNewNote();
      return;
    }

    this.noteTitles.set(notes);
  }

  insertNewNote(): void {
    const randomUuid = crypto.randomUUID();
    const blankNote: Note = {
      title: 'New note',
      content: '',
    };
    localStorage.setItem(
      `${NOTES_PREFIX}${randomUuid}`,
      JSON.stringify(blankNote)
    );
    this.getNotesTitles();
  }
}
