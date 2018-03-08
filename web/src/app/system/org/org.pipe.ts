import {Pipe, PipeTransform} from '@angular/core';
import {SessionStorageService} from 'ng2-webstorage';

@Pipe({name: 'orgPipe'})
export class OrgPipe implements PipeTransform {

    list = [];
    map = new Map();

    constructor(private sessionStorage: SessionStorageService) {
        this.list = this.sessionStorage.retrieve('ai-system-org-type');
        if (this.list && this.list.length) {
            this.list.forEach(f => {
                this.map.set(f.organize_type_id, f.organize_type_name);
            });
        }
    }

    transform(organize_type_id: number): any {
       return this.map.get(organize_type_id) || '';
    }
}