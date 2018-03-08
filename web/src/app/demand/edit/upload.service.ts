import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UploadService {
    constructor(private http: Http) {
    }
}
