import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { ContactService } from '../services/contact.service';
import { ContactService } from '../../core/services/contact.service';
import { CommonModule } from '@angular/common';
import { IcontactMessage } from '../../core/interfaces/contact-message.interface';
@Component({
  selector: 'app-contact',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class Contact {
contactForm: FormGroup;
  selectedFile: File | null = null;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      file: [null]
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = new FormData();
    formData.append('Name', this.contactForm.value.name);
    formData.append('Email', this.contactForm.value.email);
    formData.append('Message', this.contactForm.value.message);
    
    if (this.selectedFile) {
      formData.append('File', this.selectedFile);
    }

    this.contactService.sendMessage(formData as unknown as IcontactMessage).subscribe({
      next: () => {
        this.successMessage = 'Message sent successfully!';
        this.contactForm.reset();
        this.selectedFile = null;
        this.isSubmitting = false;
      },
      error: (err:any) => {
        this.errorMessage = 'Error sending message. Please try again.';
        console.error('Contact error:', err);
        this.isSubmitting = false;
      }
    });
  }
}
