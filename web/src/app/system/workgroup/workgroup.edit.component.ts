import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {WorkgroupService} from './workgroup.service';
import {GlobalService} from 'app/global.service';
import {Workgroup} from './workgroup';
import {LoginUser} from 'src/app/login/login.user';
@Component({
    selector: 'ai-system-workgroup-edit',
    templateUrl: './workgroup.edit.component.html'
})
export class WorkgroupEditComponent implements OnInit {

    @Input() workgroup: Workgroup = new Workgroup();
    @Output() onCancel = new EventEmitter();
    @Output() onSubmitSuccess = new EventEmitter();
    user: LoginUser = new LoginUser();

    constructor(private globelService: GlobalService, private workgroupService: WorkgroupService) {
    }

    ngOnInit(): void {
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
        if (this.user) {
            this.workgroup.op_id = this.user.staff_id;
        }
        this.workgroupService.addWorkgroup(this.workgroup).subscribe(ret => {
            this.workgroup.work_group_id = ret.work_group_id;
            toastr.success('新增成功！');
            this.onSubmitSuccess.emit(1);
        });
    }

    edit(form) {
        if (!this.validateForm(form)) {
            return;
        }
        this.workgroupService.editWorkgroup(this.workgroup).subscribe(ret => {
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