
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PageUploadResponse {
  message: string;
  slug: string;
}

export interface PageData {
  slug: string;
  description: string;
  logoUrl: string;
  bannerUrls: string[];
  csvData: any[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8000/api/pages';

  constructor(private http: HttpClient) { }

  // Upload form data (images + CSV + description)
  uploadPage(formData: FormData): Observable<PageUploadResponse> {
    return this.http.post<PageUploadResponse>(this.apiUrl, formData);
  }

  // Fetch page data by slug
  getPage(slug: string): Observable<PageData> {
    return this.http.get<PageData>(`${this.apiUrl}/${slug}`);
  }
}
