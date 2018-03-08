import {SysFun} from 'app/system/fun';
export class LoginUser {
    staff_id: number;
    code: string;
    employee_name: string;
    bill_id: string;
    email: string;
    religion: string;
    state: number;
    organize_id: number;
    organize_name: string;
    log_id: number;
    function_dto: SysFun[];

    constructor() {
        this.function_dto = [];
    }
}