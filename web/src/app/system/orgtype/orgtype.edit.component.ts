import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {GlobalService} from 'app/global.service';
import {OrgtypeService} from './orgtype.service';
import {Orgtype} from './orgtype';
import {LoginUser} from 'app/login/login.user';
@Component({
    selector: 'ai-system-orgtype-edit',
    templateUrl: './orgtype.edit.component.html'
})
export class OrgtypeEditComponent implements OnInit {
    @Input() orgtype: Orgtype = new Orgtype();
    @Output() onCancel = new EventEmitter();
    @Output() onSubmitSuccess = new EventEmitter();

    user: LoginUser = new LoginUser();

    constructor(private globelService: GlobalService, private orgtypeService: OrgtypeService) {
    }

    ngOnInit() {
        this.globelService.user.subscribe(user => {
            this.user = user;
        });
    }

    _onCancel() {
        this.onCancel.emit(0);
    }

    add(form) {
        if (!this.validateForm(form)) {
            return;
        }
        if (this.user && this.user.staff_id) {
            this.orgtype.op_id = this.user.staff_id;
        }
        this.orgtypeService.addOrgtype(this.orgtype).subscribe(ret => {
            this.orgtype.organize_type_id = ret.organize_type_id;
            toastr.success('新增成功！');
            this.onSubmitSuccess.emit(1);
        });
    }

    edit(form) {
        if (!this.validateForm(form)) {
            return;
        }
        this.orgtypeService.editOrgtype(this.orgtype).subscribe(ret => {
            if (ret.code === 1) {
                toastr.success('修改成功！');
                this.onSubmitSuccess.emit(1);
            }
        });
    }

    validateForm(form) {
        if (form.invalid) {
            return false;
        }
        return true;
    }
}