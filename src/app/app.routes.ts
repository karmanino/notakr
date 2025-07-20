import { Routes } from '@angular/router';
import { Editor } from './pages/editor/editor';

export const routes: Routes = [
  {
    path: '',
    component: Editor,
  },
  {
    path: ':noteId',
    component: Editor,
  },
];
