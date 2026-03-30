import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../services/document';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  documents: any[] = [];
  allDocuments: any[] = [];
  searchText: string = '';

  selectedFile: File | null = null;
  tags: string = '';

  // ✅ TEMP USER + PERMISSION
  username: string = 'admin';
  permission: string = 'edit';
 


  constructor(private docService: DocumentService) {}

  // ✅ Load documents
  ngOnInit() {
    this.docService.getAll().subscribe({
      next: (data: any) => {
        this.documents = data;
        this.allDocuments = data;
        console.log("Documents:", this.documents);
      },
      error: (err) => {
        console.error("GET ERROR:", err);
      }
    });
  }

  // ✅ File select
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log("Selected file:", this.selectedFile);
  }

  // ✅ Upload
  upload() {
    console.log("UPLOAD CLICKED");

    if (!this.selectedFile) {
      alert("Please select file");
      return;
    }

    if (!this.tags || this.tags.trim() === '') {
      alert("Please enter tags");
      return;
    }

    this.docService.upload(
      this.selectedFile,
      this.tags,
      this.username,
      this.permission
    ).subscribe({
      next: () => {
        alert("Uploaded successfully");
        
        this.ngOnInit();
      },
      error: (err) => {
        console.error("UPLOAD ERROR:", err);
        alert("Upload failed");
      }
    });
  }

  // ✅ Search
  search() {
    if (!this.searchText || this.searchText.trim() === '') {
      this.documents = this.allDocuments;
      return;
    }

    this.docService.search(this.searchText).subscribe({
      next: (data: any) => {
        this.documents = data;
      },
      error: () => {
        // fallback
        this.documents = this.allDocuments.filter(doc =>
          doc.tags?.toLowerCase().includes(this.searchText.toLowerCase())
        );
      }
    });
  }

  // ✅ Delete
  deleteDoc(id: any) {
    this.docService.delete(id).subscribe({
      next: () => {
        alert("Deleted successfully");
        this.ngOnInit();
      },
      error: (err) => {
        console.error("DELETE ERROR:", err);
        alert("Delete failed");
      }
    });
  }

  // ✅ Share
 shareDoc(filename: string) {
  const email = prompt("Enter email to share:");

  if (!email) return;

  this.docService.share(email, filename).subscribe({
    next: () => {
      alert("Email sent successfully!");
    },
    error: () => {
      alert("Failed to send email");
    }
  });
}

logout() {
  // clear stored user
  localStorage.removeItem('user');

  // redirect to login page
  window.location.href = '/login';
}
}