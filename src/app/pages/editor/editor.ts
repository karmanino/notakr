import { Component, inject, input, Input, linkedSignal } from '@angular/core';
import { Notes } from '../../services/notes';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from '../../shared/interfaces/note';
import { NOTES_PREFIX } from '../../shared/constants';

@Component({
  selector: 'editor',
  imports: [],
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
})
export class Editor {
  readonly #notes = inject(Notes);
  noteId = input<string>();
  title = linkedSignal({
    source: this.noteId,
    computation: (source, previous) => {
      if (source === previous?.source) return;
      try {
        console.log(this.noteId());
        const note: Note | null = JSON.parse(
          localStorage.getItem(NOTES_PREFIX + this.noteId()) ?? ''
        );
        console.log(note);
        if (!note?.title) return '';
        return note.title;
      } catch {
        return '';
      }
    },
  });
  router = inject(Router);

  constructor() {
    console.log('rebuilt');
  }

  ngOnInit() {
    console.log('rebuilt');
    this.#notes.getNotesTitles();

    console.log(this.noteId());

    if (!this.noteId) {
      const first = this.#notes.noteTitles()[0];
      this.router.navigate([`/${first.id}`]);
    }
  }
}
