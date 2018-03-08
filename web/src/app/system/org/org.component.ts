import {Component, OnInit} from '@angular/core';
import {LoginUser} from 'app/login/login.user';
import {OrgService} from './org.service';
import {Organize} from './org';
import {SessionStorageService} from 'ng2-webstorage';
@Component({
    selector: 'ai-system-org',
    templateUrl: './org.component.html',
    styleUrls: ['org.scss']
})
export class OrgComponent implements OnInit {

    user: LoginUser;
    rootTree: Organize[] = [];
    rightModel = 'hide';
    currentItem;
    keyword;
    opened = true;
    readonly = false;

    constructor(private orgService: OrgService, private sesstionStorage: SessionStorageService) {

    }

    ngOnInit() {
         // this.getAllOrgs();
        this.getOrgsByParent();
    }

    getOrgsByParent() {
        let pagination = {
            parent_organize_id: null
        };
        this.orgService.getOrgsByParent(pagination).subscribe(ret => {
            if (ret && ret.length) {
                ret.forEach(e => {
                    e.show = true;
                    e.opened = false;
                    e.has_keyword = false;
                    e.last_show = false;
                    e.children = [];
                    this.rootTree.push(e);
                });
            }
            if (this.rootTree.length) {
                this.rootTree[this.rootTree.length - 1].last_show = true;
            }
        });
    }

    getAllOrgs() {
        this.orgService.getAllOrgs(null).subscribe(ret => {
            if (ret && ret.length) {
                this.rootTree = this.orgService.buildOrgTree(ret);
            }
            this.sesstionStorage.clear('ai-organize-valid'); // 因为可能涉及到了组织机构的修改更新，所以清理掉本地的缓存
        });
    }

    searchOrgs() {
        this.orgService.searchOrgs(this.rootTree, this.keyword);
    }

    onSelectMenu(event) {
        let operate_type = event.operate_type;
        if (operate_type === 'C') {
            this.currentItem = new Organize();
            this.currentItem.parent_organize_id = event.item && event.item.organize_id ? event.item.organize_id : null;
            this.currentItem.parent_code = event.item && event.item.parent_code ? event.item.parent_code : '000';
            this.currentItem.readonly = false;
            this.rightModel = 'show';
        }
        if (operate_type === 'U') {
            this.currentItem = JSON.parse(JSON.stringify(event.item));
            this.currentItem.readonly = false;
            this.rightModel = 'show';
        }
        if (operate_type === 'D') {
            this.orgService.deleteOrg(event.item.organize_id).subscribe(ret => {
                if (ret.row_count) {
                    toastr.success('删除成功！');
                    this.getAllOrgs();
                }
            });
        }
    }

    onSelect(org) {
        this.currentItem = JSON.parse(JSON.stringify(org));
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
        this.getAllOrgs();
        this.closeRight(1);
    }

}