import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Book} from "../models/book.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "./token-service";


@Injectable({ providedIn: 'root' })
export class BookService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string, role: string): Observable<Object> {
    const headers = new HttpHeaders()
      .set('email', email)
      .set('password', password)
      .set('role', role);

    return this.http.get("http://localhost:4000/login", { headers: headers });
  }

  getBooks(): Observable<Book[]> {

    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'authorization': `${token}`
    });

    return this.http
      .get<Book[]>('http://localhost:4000/books', { headers });
  }

  getBook(ISBN: string): Observable<Book> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'authorization': `${token}`
    });

    return this.http
      .get<Book>('http://localhost:4000/book?ISBN='+ ISBN, { headers });
  }

  createBook(book: Book) {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'authorization': `${token}`
    });

    return this.http
      .post('http://localhost:4000/book', book, { headers });
  }

  updateBook(book: Book) {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'authorization': `${token}`
    });

    return this.http
      .put('http://localhost:4000/book?ISBN='+ book.ISBN, book, { headers });
  }

  deleteBook(ISBN: string) {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'authorization': `${token}`
    });

    return this.http
      .delete('http://localhost:4000/book?ISBN='+ ISBN, { headers });
  }

}
