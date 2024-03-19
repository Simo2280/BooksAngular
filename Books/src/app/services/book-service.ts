import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {Book} from "../models/book.model";
import {HttpClient} from "@angular/common/http";


@Injectable({ providedIn: 'root' })
export class BookService {
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http
      .get<Book[]>('http://localhost:4000/book');
  }

  createBook(book: Book) {
    return this.http
      .post('http://localhost:4000/book', book);
  }

}
