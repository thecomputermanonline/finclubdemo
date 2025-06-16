import { Component, inject } from '@angular/core';
import { DataService } from '../services/data.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './admin.component.html'
})

export class AdminComponent {
  description = '';
  logoFile: File | null = null;
  bannerFiles: File[] = [];
  csvFile: File | null = null;


  constructor(private dataService: DataService, private router: Router) { }

  onLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.logoFile = input.files?.[0] || null;
  }

  onBannersSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.bannerFiles = input.files ? Array.from(input.files) : [];
  }

  onCsvSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.csvFile = input.files?.[0] || null;
  }

  onSubmit(): void {
    if (!this.logoFile || !this.csvFile || this.bannerFiles.length === 0 || !this.description) {
      alert('Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('description', this.description);
    formData.append('logo', this.logoFile);
    this.bannerFiles.forEach(file => {
      formData.append('banners', file);
    });
    formData.append('csv', this.csvFile);

    this.dataService.uploadPage(formData).subscribe({
      next: (res) => {
        alert(res.slug + ' Page uploaded successfully!');
        this.router.navigate(['/page', res.slug]); // Navigate to view mode

      },
      error: (err) => {
        alert('Upload failed.');
        console.error(err);
      }
    });
  }
}
