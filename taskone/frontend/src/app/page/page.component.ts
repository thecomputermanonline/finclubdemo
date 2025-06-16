import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DataService, PageData } from '../services/data.services';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CarouselComponent } from '../carousel/carousel.component'; // adjust path


@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, CarouselComponent],
  templateUrl: './page.component.html',
})

export class PageComponent implements OnInit {
  slug = '';
  description = 'test';
  logoUrl: SafeUrl | null = null;
  banners: SafeUrl[] = [];
  csvData: string[][] = [];
  loading = true;
  error: string | null = null;
  title = 'frontend';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.loadPageData();
  }

  loadPageData(): void {
    this.dataService.getPage(this.slug).subscribe({
      next: (res) => {
        this.description = res.description;
        this.logoUrl = this.sanitizer.bypassSecurityTrustUrl(res.logoUrl);
        this.banners = res.bannerUrls.map((url: string) =>
          this.sanitizer.bypassSecurityTrustUrl(url)
        );
        this.csvData = res.csvData; // assume it's parsed server-side as a 2D array
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load page data', err);
        this.error = 'Page not found or failed to load.' + err;
        this.loading = false;
      }
    });
  }
}

