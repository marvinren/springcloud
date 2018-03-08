import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Dictionary} from './dictionary';
import {DictionaryService} from './dictionary.service';

@Component({
    selector: 'ai-system-dictionary-edit',
    templateUrl: './dictionary.edit.component.html'
})
export class DictionaryEditComponent implements OnInit {
    @Input() dictionary: Dictionary = new Dictionary();
    @Output() onCancel = new EventEmitter();
    @Output() onSubmitSuccess = new EventEmitter();
    dictionaryList = [];

    constructor(private dictionaryService: DictionaryService) {

    }

    ngOnInit() {
        this.GetDictionary();
    }
    GetDictionary() {
        this.dictionaryService.getDictionary(this.dictionary.param_type).subscribe(ret => {
            if (ret.page_data && ret.page_data.length) {
                this.dictionaryList = ret.page_data;
            }
        });
    }
    _onCancel() {
        this.onCancel.emit(0);
    }

    addOrg(form) {
        this.dictionaryService.addDictionary(this.dictionary).subscribe(ret => {
            this.dictionary.param_type = ret.param_type;
            toastr.success('新增成功！');
            this.onSubmitSuccess.emit(1);
        });
    }

    editOrg(form) {
        this.dictionaryService.editDictionary(this.dictionary).subscribe(ret => {
            toastr.success('修改成功！');
            this.onSubmitSuccess.emit(1);
        });
    }
}