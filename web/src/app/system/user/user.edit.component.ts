import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location}  from '@angular/common';
import {UserService} from 'app/system/user/user.service';
import {User} from 'app/system/user/user';

@Component({
    selector: 'ai-system-user-edit',
    templateUrl: './user.edit.component.html'
})
export class UserEditComponent implements OnInit {
    @Input() editedUser: User = new User();
    @Input() readonly = false;
    @Output() onCancel = new EventEmitter();
    @Output() onSubmitSuccess = new EventEmitter();
    validate_password;
    nav = 2;

    constructor(private route: ActivatedRoute, private userService: UserService, private location: Location) {

    }

    ngOnInit() {
    }

    onSelectOrg(org) {
        this.editedUser.organize_id = org.organize_id;
        this.editedUser.organize_name = org.organize_name;
    }


    _onCancel() {
        this.onCancel.emit(0);
    }

    editUser(form) {
        if (!this.validateForm(form)) {
            return;
        }
        this.userService.editUser(this.editedUser).subscribe(ret => {
            if (ret.code === 1) {
                toastr.success('修改成功！');
                this.onSubmitSuccess.emit(1);
            } else {
                toastr.error(ret.msg || '修改失败！');
            }
        });
    }

    addUser(form) {
        if (!this.validateForm(form)) {
            return;
        }
        this.userService.addUser(this.editedUser).subscribe(ret => {
            if (ret.code === 1) {
                toastr.success('新增成功！');
                this.editedUser.staff_id = ret.staff_id;
                this.onSubmitSuccess.emit(1);
            } else {
                toastr.error(ret.msg || '新增失败！');
            }
        });
    }

    validateForm(form) {
        if (form.invalid) {
            return false;
        }
        if (this.editedUser.password && this.editedUser.password !== this.validate_password) {
            toastr.warning('用户密码和确认密码不一致');
            return false;
        }
        return true;
    }

}