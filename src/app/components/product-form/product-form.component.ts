import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../../interfaces/iproduct';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  @Output() addProduct = new EventEmitter<IProduct>(); // Emite el nuevo producto al padre
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      image: ['', Validators.required],
      active: [true]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const newProduct: IProduct = {
        _id: Date.now().toString(), // Genera un ID único basado en la marca de tiempo
        ...this.productForm.value
      };
      this.addProduct.emit(newProduct); // Envía el nuevo producto al componente padre
      this.productForm.reset({ active: true }); // Limpia el formulario y establece el valor predeterminado de "active"
    }
  }
}
