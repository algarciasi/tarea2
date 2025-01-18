import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { IProduct } from '../../interfaces/iproduct';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductFilterComponent } from '../product-filter/product-filter.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ProductCardComponent,
    ProductFormComponent,
    ProductFilterComponent,
  ],
  providers: [ProductServiceService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  currentFilters: any = {}; // Almacena los filtros actuales

  constructor(private productService: ProductServiceService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.currentFilters = {
      name: '',
      category: '',
      price: null,
      active: '', 
    };
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: IProduct[]) => {
        this.products = data;
        this.filteredProducts = [...data]; // Inicializa la lista filtrada
      },
      (error) => {
        console.error('Error buscando productos:', error);
      }
    );
  }

  onDeleteProduct(productId: string): void {
    this.products = this.products.filter((product) => product._id !== productId);
    this.applyFilters(); // Aplica los filtros actuales
  }

  addNewProduct(product: IProduct): void {
    this.products.push(product);
    this.applyFilters(); // Aplica los filtros actuales
  }

  filterProducts(filters: any): void {
    this.currentFilters = filters; // Guarda los filtros actuales
    this.applyFilters(); // Aplica los filtros a la lista
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter((product) => {
      const matchesName =
        !this.currentFilters.name ||
        product.name.toLowerCase().includes(this.currentFilters.name.toLowerCase());
      const matchesCategory =
        !this.currentFilters.category ||
        product.category.toLowerCase().includes(this.currentFilters.category.toLowerCase());
      const matchesPrice =
        !this.currentFilters.price || product.price <= this.currentFilters.price;
      const matchesActive =
        this.currentFilters.active === '' ||
        product.active === (this.currentFilters.active === 'true'); 

      return matchesName && matchesCategory && matchesPrice && matchesActive;
    });
  }
}
