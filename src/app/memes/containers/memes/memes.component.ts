import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MemeCardComponent } from '../../components/meme-card/meme-card.component';
import { MemeEditorComponent } from '../../components/meme-editor/meme-editor.component';
import { Meme } from '../../interfaces/memes.interfaces';
import { MemesService } from '../../services/memes.service';

@Component({
  selector: 'app-memes',
  standalone: true,
  imports: [CommonModule, MemeCardComponent],
  templateUrl: './memes.component.html',
  styleUrl: './memes.component.scss',
})
export class MemesComponent implements OnInit {
  private dialog = inject(MatDialog);
  private memesService = inject(MemesService);

  memes = signal<Meme[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadMemes();
  }

  loadMemes(): void {
    this.loading.set(true);
    this.error.set(null);

    this.memesService.getMemes().subscribe({
      next: (data: Meme[]) => {
        this.memes.set(data);
        this.loading.set(false);
      },
      error: (err: any) => {
        this.error.set(
          'Error al cargar los memes. Asegúrate de que el servidor backend esté corriendo.'
        );
        this.loading.set(false);
        console.error('Error:', err);
      },
    });
  }

  onMemeClick(meme: Meme): void {
    this.dialog.open(MemeEditorComponent, {
      width: '900px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      data: meme,
      disableClose: false,
      autoFocus: false,
    });
  }
}
