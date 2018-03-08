/*用户*/
export class User {
    staff_id: number;
    employee_name: string;
    code: string;
    email: string;
    bill_id: string; // 手机号码
    religion: string;
    notes: string; // 备注
    state: number;

    login_log_id: string;
    operate_type: string;
    password: string;

    organize_id: number;

    organize_name: string;

    constructor() {
        this.state = 1;
    }
}