import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meme } from '../../interfaces/memes.interfaces';

@Component({
  selector: 'app-meme-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meme-card.component.html',
  styleUrl: './meme-card.component.scss',
})
export class MemeCardComponent {
  memes = input<Meme[]>([]);
  memeClick = output<Meme>();

  onMemeClick(meme: Meme): void {
    this.memeClick.emit(meme);
  }
}
