import {Component, OnInit} from '@angular/core';
import {DictionaryService} from './dictionary.service';
import {Dictionary} from './dictionary';
import {SessionStorageService} from 'ng2-webstorage';
import {LoginUser} from 'app/login/login.user';
@Component({
    selector: 'ai-system-dictionary',
    templateUrl: './dictionary.component.html',
    styleUrls: ['dictionary.scss']
})
export class DictionaryComponent implements OnInit {
    user: LoginUser = new LoginUser();
    dictionaryTree: Dictionary[] = [];
    rightModel = 'hide';
    currentItem;
    keyword;
    opened = true;
    readonly = false;
    param_name;

    constructor(private dictionaryService: DictionaryService, private sesstionStorage: SessionStorageService) {

    }

    ngOnInit() {
        this.getAllDictionarys();
    }

    getAllDictionarys() {
        /* this.dictionaryService.getAllDictionary(null).subscribe(ret => {
             if (ret && ret.page_data) {
                 this.dictionaryTree = this.dictionaryService.buildDictionaryTree(ret.page_data);
             }
             this.sesstionStorage.clear('ai-dictionary-valid'); // 因为可能涉及到了组织机构的修改更新，所以清理掉本地的缓存
         });*/
        this.dictionaryTree = this.dictionaryService.buildDictionaryTree(this.dictionaryService.getLocalAlldict().page_data);

    }

    searchDictionary() {
        this.dictionaryService.searchDictionary(this.dictionaryTree, this.keyword);
    }

    onSelectMenu(event) {
        let operate_type = event.operate_type;
        if (operate_type === 'C') {
            this.currentItem = new Dictionary();
            this.currentItem.parent_param_type = event.item && event.item.param_type ? event.item.param_type : null;
            this.currentItem.readonly = false;
            this.rightModel = 'show';
        }
        if (operate_type === 'U') {
            this.currentItem = event.item;
            this.currentItem.readonly = false;
            this.rightModel = 'show';
        }
        if (operate_type === 'D') {
            this.currentItem = event.item;
            this.dictionaryService.deleteDictionary(event.item.param_type).subscribe(ret => {
                if (ret.row_count) {
                    toastr.success('删除成功！');
                    this.getAllDictionarys();
                }
            });
        }
    }

    onSelect(dictionary) {
        this.currentItem = dictionary;
        this.currentItem.readonly = true;
        this.rightModel = 'show';
    }

    closeRight(p) {
        this.rightModel = 'hide';
        setTimeout(() => {
            this.currentItem = null;
        }, 500);
    }

    onSubmitSuccess(state) {
        this.getAllDictionarys();
        this.closeRight(1);
    }

}