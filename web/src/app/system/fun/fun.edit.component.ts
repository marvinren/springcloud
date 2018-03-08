import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SysFun} from './fun';
import {FunService} from './fun.service';

@Component({
    selector: 'ai-system-fun-edit',
    templateUrl: './fun.edit.component.html'
})
export class FunEditComponent implements OnInit {
    @Input() fun: SysFun = new SysFun();
    @Output() onCancel = new EventEmitter();
    @Output() onSubmitSuccess = new EventEmitter();

    constructor(private funService: FunService) {

    }

    ngOnInit() {
    }

    _onCancel() {
        this.onCancel.emit(0);
    }

    addFun(form) {
        if (!this.validateForm(form)) {
            toastr.warning('请完善信息！');
            return;
        }
        this.funService.addFun(this.fun).subscribe(ret => {
            this.fun.func_id = ret.func_id;
            toastr.success('新增成功！');
            this.onSubmitSuccess.emit(1);
        });
    }

    editFun(form) {
        if (!this.validateForm(form)) {
            toastr.warning('请完善信息！');
            return;
        }
        this.funService.editFun(this.fun).subscribe(ret => {
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