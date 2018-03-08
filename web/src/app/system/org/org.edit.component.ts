import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {GlobalService} from 'app/global.service';
import {Organize} from './org';
import {OrgService} from './org.service';
import {LoginUser} from 'app/login/login.user';
@Component({
    selector: 'ai-system-org-edit',
    templateUrl: './org.edit.component.html'
})
export class OrgEditComponent implements OnInit {
    @Input() org: Organize = new Organize();
    @Output() onCancel = new EventEmitter();
    @Output() onSubmitSuccess = new EventEmitter();
    user: LoginUser = new LoginUser();

    constructor(private globelService: GlobalService, private orgService: OrgService) {

    }

    ngOnInit() {
        this.globelService.user.subscribe(user => {
            this.user = user;
        });
    }

    _onCancel() {
        this.onCancel.emit(0);
    }

    addOrg(form) {
        if (!this.validateForm(form)) {
            return;
        }
        if (this.user && this.user.staff_id) {
            this.org.op_id = this.user.staff_id;
        }
        this.orgService.addOrg(this.org).subscribe(ret => {
            this.org.organize_id = ret.organize_id;
            toastr.success('新增成功！');
            this.onSubmitSuccess.emit(1);
        });
    }

    editOrg(form) {
        if (!this.validateForm(form)) {
            return;
        }
        this.orgService.editOrg(this.org).subscribe(ret => {
            toastr.success('修改成功！');
            this.onSubmitSuccess.emit(1);
        });
    }
    validateForm(form) {
        if (form.invalid) {
            return false;
        }
        return true;
    }
}