import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalService} from 'app/global.service';
import {FunService} from './fun.service';
import {SysFun} from 'app/system/fun/fun';
import {SessionStorageService} from 'ng2-webstorage';
@Component({
    selector: 'ai-system-fun',
    templateUrl: './fun.component.html',
    styleUrls: ['fun.scss']
})
export class FunComponent implements OnInit {
    funTree: SysFun[] = [];
    rightModel = 'hide';
    currentItem;
    readonly = false;
    keyword = '';
    opened = true;

    constructor(private router: Router, private funService: FunService, private sessionStorage: SessionStorageService) {

    }

    ngOnInit() {
        this.getAllFuns();
    }

    getAllFuns() {
        this.funService.getAllFuns(null).subscribe(ret => {
            if (ret && ret.length) {
                this.funTree = this.funService.buildFunTree(ret);
            }
            this.sessionStorage.clear('ai-fun-valid');
        });
    }

    searchFun() {
        if (this.funTree && this.funTree.length) {
            this.funService.searchFuns(this.funTree, this.keyword);
        }
    }

    onSelectMenu(event) {
        let operate_type = event.operate_type;
        if (operate_type === 'C') {
            this.currentItem = new SysFun();
            this.currentItem.parent_id = event.item && event.item.func_id ? event.item.func_id : null;
            this.currentItem.readonly = false;
            this.rightModel = 'show';
        }
        if (operate_type === 'U') {
            this.currentItem = event.item;
            this.currentItem.readonly = false;
            this.rightModel = 'show';
        }
        if (operate_type === 'D') {
            this.funService.deleteFun(event.item.func_id).subscribe(ret => {
                if (ret.row_count) {
                    toastr.success('删除成功！');
                    this.getAllFuns();
                }
            });
        }
    }

    onSelect(fun) {
        this.currentItem = JSON.parse(JSON.stringify(fun));
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
        this.getAllFuns();
        this.closeRight(1);
    }
}