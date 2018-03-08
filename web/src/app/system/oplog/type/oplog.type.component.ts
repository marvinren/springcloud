import {Component, OnInit, Input} from '@angular/core';
import {SessionStorageService} from 'ng2-webstorage';
import {Oplog, OplogServices} from 'app/system/oplog';
import {Optype, OptypeService} from 'app/system/optype';
@Component({
    selector: 'ai-system-oplog-type',
    templateUrl: './oplog.type.component.html'
})
export class OpLogTypeComponent implements OnInit {
    @Input() oplog: Oplog = new Oplog();

    list = [];
    pagination = {
        page_no: 1,
        page_size: 100
    };

    constructor(private otypeService: OptypeService, private session: SessionStorageService) {
    }

    ngOnInit() {
        this.getOplogTypes();
    }

    getOplogTypes() {
        this.list = []; // 首先声明一个list集合用于后期的引用遍历
        let sessionList = this.session.retrieve('ai-system-oplog-type'); // 首先从缓存中获取数据
        if (sessionList && sessionList.length) { // 如果缓存中存在数据
            this.list = sessionList; // 把缓存的数据赋值给list集合
            return; // 返回，跳出条件
        }
        this.otypeService.getOptypePage(this.pagination).subscribe(ret => { // 如果不存在缓存数据，从服务后台获取数据，调用接口，使用subscribe
            if (ret && ret.page_data) { // 如果存在数据
                this.list = ret.page_data; // 把数据赋值给list集合，方便oplogtypecomponent的调用
                this.session.store('ai-system-oplog-type', this.list); // 然后把获取到的数据存储到缓存当中，方便下次的使用
            }
        });
    }
}