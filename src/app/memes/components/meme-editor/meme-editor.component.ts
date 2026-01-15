import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { Canvas, FabricImage, Text } from 'fabric';
import { Meme } from '../../interfaces/memes.interfaces';

const CANVAS_SIZE = 400;

@Component({
  selector: 'app-meme-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
  ],
  templateUrl: './meme-editor.component.html',
  styleUrl: './meme-editor.component.scss',
})
export class MemeEditorComponent implements OnInit, OnDestroy {
  private readonly dialogRef = inject(MatDialogRef<MemeEditorComponent>);
  readonly meme: Meme = inject(MAT_DIALOG_DATA);

  private readonly canvasRef =
    viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  private canvas: Canvas | null = null;

  textInput = signal<string>('');
  fontSize = signal<number>(40);
  textColor = signal<string>('#FFFFFF');
  fontFamily = signal<string>('Arial');

  ngOnInit(): void {
    this.initializeCanvas();
  }

  ngOnDestroy(): void {
    this.canvas?.dispose();
  }

  onFontSizeChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.fontSize.set(Number(value));
    }
  }

  private initializeCanvas(): void {
    const canvasElement = this.canvasRef()?.nativeElement;
    if (!canvasElement || this.canvas) return;

    this.canvas = new Canvas(canvasElement, {
      width: CANVAS_SIZE,
      height: CANVAS_SIZE,
      backgroundColor: '#ffffff',
    });

    this.loadImage();
  }

  private loadImage(): void {
    if (!this.canvas || !this.meme) return;

    this.canvas.clear();
    this.canvas.backgroundColor = '#ffffff';

    FabricImage.fromURL(this.meme.url, { crossOrigin: 'anonymous' })
      .then((img: FabricImage) => {
        if (!this.canvas) return;

        const imgWidth = img.width || CANVAS_SIZE;
        const imgHeight = img.height || CANVAS_SIZE;
        const scaleX = CANVAS_SIZE / imgWidth;
        const scaleY = CANVAS_SIZE / imgHeight;

        img.set({
          scaleX,
          scaleY,
          left: 0,
          top: 0,
          selectable: false,
          evented: false,
          excludeFromExport: false,
          originX: 'left',
          originY: 'top',
        });

        this.canvas.add(img);
        this.canvas.sendObjectToBack(img);
        this.canvas.renderAll();
      })
      .catch((error) => console.error('Error al cargar la imagen:', error));
  }

  addText(): void {
    if (!this.canvas || !this.textInput().trim()) return;

    const text = new Text(this.textInput(), {
      left: CANVAS_SIZE / 2,
      top: CANVAS_SIZE / 2,
      fontSize: this.fontSize(),
      fill: this.textColor(),
      fontFamily: this.fontFamily(),
      textAlign: 'center',
      originX: 'center',
      originY: 'center',
    });

    this.canvas.add(text);
    this.canvas.setActiveObject(text);
    this.canvas.renderAll();
    this.textInput.set('');
  }

  deleteSelectedText(): void {
    if (!this.canvas) return;

    const activeObject = this.canvas.getActiveObject();
    if (activeObject?.type === 'text') {
      this.canvas.remove(activeObject);
      this.canvas.renderAll();
    }
  }

  downloadImage(): void {
    if (!this.canvas) return;

    const dataURL = this.canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 1,
    });

    const link = document.createElement('a');
    link.download = `meme-${this.meme.id || 'edited'}.png`;
    link.href = dataURL;
    link.click();
  }

  closeEditor(): void {
    this.canvas?.clear();
    this.canvas?.renderAll();
    this.dialogRef.close();
  }
}
