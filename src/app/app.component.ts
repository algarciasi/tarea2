import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { ProductFilterComponent } from "./components/product-filter/product-filter.component";
import { ProductFormComponent } from "./components/product-form/product-form.component";
import { ProductListComponent } from "./components/product-list/product-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductFilterComponent, ProductFormComponent, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tarea2';
  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
