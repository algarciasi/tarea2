import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../interfaces/iproduct';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: IProduct; // Recibe un producto desde el componente padre
  @Output() delete = new EventEmitter<string>(); // Emite el id del producto a eliminar

  onDelete(): void {
    this.delete.emit(this.product._id); // Emitir el id al componente padre
  }
}
