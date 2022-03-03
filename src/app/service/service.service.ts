import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { Book } from '../model/book';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  books: Book[] = [];
  constructor(private http: HttpClient) {
    this.findAll();
  };

  findAll() :Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:3000/books')
  }
  delete(id: number):Observable<void>{
    return  this.http.delete<void>(`http://localhost:3000/books/${id}`)
  }

  create(book: Book): Observable<any>{
    return this.http.post(`http://localhost:3000/books`, book)
  }

  detail(id: number): Observable<any>{
    return this.http.get(`http://localhost:3000/books/${id}`)
  }

  edit(b: Book) : Observable<any>{
    return this.http.put(`http://localhost:3000/books/${b.id}`, b)
  }
}
