import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Book} from "../models/book.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "./token-service";


@Injectable({ providedIn: 'root' })
export class BookService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getBooks(): Observable<Book[]> {

    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({
      'authorization': `${token}`
    });

    return this.http
      .get<Book[]>('http://localhost:4000/books', { headers });
  }

  getBook(ISBN: string): Observable<Book> {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({
      'authorization': `${token}`
    });

    return this.http
      .get<Book>('http://localhost:4000/book?ISBN='+ ISBN, { headers });
  }

  createBook(book: Book) {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({
      'authorization': `${token}`
    });

    return this.http
      .post('http://localhost:4000/book', book, { headers });
  }

  updateBook(book: Book) {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({
      'authorization': `${token}`
    });

    return this.http
      .put('http://localhost:4000/book?ISBN='+ book.ISBN, book, { headers });
  }

  deleteBook(ISBN: string) {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({
      'authorization': `${token}`
    });

    return this.http
      .delete('http://localhost:4000/book?ISBN='+ ISBN, { headers });
  }

}
