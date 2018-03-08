import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {WFRole} from './wfrole';
import  {WorkflowRoleService} from './wfrole.service';


@Component({
    selector: 'ai-system-wfrole-edit',
    templateUrl: './wfrole.edit.component.html'
})
export class WorkflowRoleEditComponent implements OnInit {
    @ViewChild('dropDrop') dropDrop;
    @Input() wfrole: WFRole = new WFRole();
    @Output() onCancel = new EventEmitter();
    @Output() onSubmitSuccess = new EventEmitter();

    constructor(private workflowRoleService: WorkflowRoleService) {

    }

    ngOnInit() {
    }

    _onCancel() {
        this.onCancel.emit(0);
    }

    openDrop() {
        this.dropDrop.open();
    }

    closeDrop() {
        this.dropDrop.close();
    }

    onSelectedLink(link) {
        this.wfrole.link_id = link.link_id;
        this.wfrole.code = link.role_code;
        this.wfrole.process_key = link.process_key;
        this.closeDrop();
    }

    add(form) {
        if (!this.validateForm(form)) {
            toastr.warning('请完善信息！');
            return;
        }
        this.workflowRoleService.add(this.wfrole).subscribe(ret => {
            if (ret && ret.code === 1) {
                this.wfrole.wf_role_id = ret.wf_role_id;
                toastr.success('新增成功！');
                this.onSubmitSuccess.emit(1);
            } else {
                toastr.warning(ret.msg || '新增失败！');
            }
        });
    }

    edit(form) {
        if (!this.validateForm(form)) {
            toastr.warning('请完善信息！');
            return;
        }
        this.workflowRoleService.edit(this.wfrole).subscribe(ret => {
            if (ret && ret.code === 1) {
                toastr.success('修改成功！');
                this.onSubmitSuccess.emit(1);
            } else {
                toastr.warning(ret.msg || '修改失败！');
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