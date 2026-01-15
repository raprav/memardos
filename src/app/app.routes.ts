import { Routes } from '@angular/router';
import { MemesComponent } from './memes/containers/memes/memes.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'memes',
    pathMatch: 'full',
  },
  {
    path: 'memes',
    component: MemesComponent,
  },
  {
    path: '**',
    redirectTo: 'memes',
  },
];
