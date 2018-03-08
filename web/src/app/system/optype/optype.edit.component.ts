import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location}  from '@angular/common';
import {OptypeService} from './optype.service';
import {Optype} from './optype';
@Component({
    selector: 'ai-system-optype-edit',
    templateUrl: './optype.edit.component.html'
})
export class OptypeEditComponent implements OnInit {

    @Input() optype: Optype = new Optype();
    @Output() onCancel = new EventEmitter();
    @Output() onSubmitSuccess = new EventEmitter();

    constructor(private route: ActivatedRoute, private optypeService: OptypeService, private location: Location) {
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
        this.optypeService.addOptype(this.optype).subscribe(ret => {
            this.optype.op_type_id = ret.op_type_id;
            toastr.success('新增成功！');
            this.onSubmitSuccess.emit(1);
        });
    }

    edit(form) {
        if (!this.validateForm(form)) {
            return;
        }
        this.optypeService.editOptype(this.optype).subscribe(ret => {
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