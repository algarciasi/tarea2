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

  constructor(private productService: ProductServiceService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: IProduct[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  onDeleteProduct(productId: string): void {
    this.products = this.products.filter(
      (product) => product._id !== productId
    );
  }

  addNewProduct(product: IProduct): void {
    this.products.push(product); // Agrega el nuevo producto a la lista
  }

  filterProducts(filters: any): void {
    this.filteredProducts = this.products.filter((product) => {
      const matchesName =
        !filters.name ||
        product.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchesCategory =
        !filters.category ||
        product.category.toLowerCase().includes(filters.category.toLowerCase());
      const matchesPrice = !filters.price || product.price <= filters.price;
      const matchesActive =
        filters.active === '' || product.active.toString() === filters.active;

      return matchesName && matchesCategory && matchesPrice && matchesActive;
    });
  }
}
