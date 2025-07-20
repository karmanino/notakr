import { Component, inject } from '@angular/core';
import { Notes } from '../../../services/notes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  readonly notes = inject(Notes);
}
