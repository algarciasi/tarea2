import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  @Output() filterProducts = new EventEmitter<any>(); // Envía los filtros al componente padre

  filters = {
    name: '',
    category: '',
    price: null,
    active: ''
  };

  onFilter(): void {
    this.filterProducts.emit(this.filters); // Envía los filtros al padre
  }

  onClear(): void {
    this.filters = {
      name: '',
      category: '',
      price: null,
      active: ''
    };
    this.onFilter(); // Limpia y aplica los filtros vacíos
  }
}
