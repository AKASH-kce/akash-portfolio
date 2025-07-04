import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IcontactMessage } from '../interfaces/contact-message.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://your-api-domain.com/api/contact';

  constructor(private http: HttpClient) { }

  sendMessage(message: IcontactMessage, file?: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', message.name);
    formData.append('email', message.email);
    formData.append('message', message.message);
    
    if (file) {
      formData.append('file', file);
    }
    
    return this.http.post(`${this.apiUrl}/send`, formData);
  }
}