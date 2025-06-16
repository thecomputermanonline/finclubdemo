import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-carousel',
  standalone: true,
  templateUrl: './carousel.component.html',
  imports: [CommonModule],
})
export class CarouselComponent implements OnInit {
  @Input() banners: (string | SafeUrl)[] = [];
  currentIndex = 0;

  ngOnInit() {
    if (!this.banners || this.banners.length === 0) {
      console.warn('No banners provided to carousel.');
    }
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.banners.length) % this.banners.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.banners.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }
}
