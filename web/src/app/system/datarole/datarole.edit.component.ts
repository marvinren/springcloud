import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {DataRole} from './datarole';
import {DataroleService} from './datarole.service';

@Component({
    selector: 'ai-system-datarole-edit',
    templateUrl: './datarole.edit.component.html'
})
export class DataroleEditComponent implements OnInit {
    @ViewChild('dropDrop') dropDrop;
    @Input() datarole: DataRole = new DataRole();
    @Output() onCancel = new EventEmitter();
    @Output() onSubmitSuccess = new EventEmitter();

    constructor(private dataroleService: DataroleService) {

    }

    ngOnInit() {
    }

    _onCancel() {
        this.onCancel.emit(0);
    }

    add(form) {
        if (!this.validateForm(form)) {
            return;
        }
        this.dataroleService.add(this.datarole).subscribe(ret => {
            this.datarole.data_role_id = ret.data_role_id;
            toastr.success('新增成功！');
            this.onSubmitSuccess.emit(1);
        });
    }

    edit(form) {
        if (!this.validateForm(form)) {
            return;
        }
        this.dataroleService.edit(this.datarole).subscribe(ret => {
            toastr.success('修改成功！');
            this.onSubmitSuccess.emit(1);
        });
    }

    openDrop() {
        this.dropDrop.open();
    }

    closeDrop() {
        this.dropDrop.close();
    }

    onSelectedOrg(org) {
        this.datarole.organize_id = org.organize_id;
        this.closeDrop();
    }

    validateForm(form) {
        if (form.invalid) {
            return false;
        }
        return true;
    }
}