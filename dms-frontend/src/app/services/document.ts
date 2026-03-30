import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  API = 'http://localhost:5000/api/documents';

  constructor(private http: HttpClient) {}

  // Upload
  upload(file: File, tags: string, username: string, permission: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('tags', tags);
    formData.append('username', username);
    formData.append('permission', permission);

    return this.http.post(`${this.API}/upload`, formData);
  }

  // Get all
  getAll() {
    return this.http.get(this.API);
  }

  // Search
  search(text: string) {
    return this.http.get(`${this.API}/search?tag=${text}`);
  }

  // Delete
  delete(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }
  share(email: string, filename: string) {
  return this.http.post('http://localhost:5000/api/share/send', {
    email,
    filename
  });
}
}