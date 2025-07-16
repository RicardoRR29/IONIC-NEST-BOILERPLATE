import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [CommonModule, IonText],
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
})
export class FormErrorComponent {
  @Input() control: AbstractControl | null | undefined;

  get errorMessage(): string | null {
    const c = this.control;
    if (!c || !c.touched || !c.errors) {
      return null;
    }
    const errors: ValidationErrors = c.errors;
    if (errors['required']) {
      return 'Campo obrigatório.';
    }
    if (errors['email']) {
      return 'Email inválido.';
    }
    if (errors['minlength']) {
      return `Deve ter ao menos ${errors['minlength'].requiredLength} caracteres.`;
    }
    if (errors['pattern']) {
      return 'Formato inválido.';
    }
    return null;
  }
}
