/* 流程角色*/
export class WFRole {
    wf_role_id: number;
    code: string; // 存储流程角色code
    name: string;
    notes: string;
    state: number;
    process_key: string;
    link_id: number;
    create_time: Date;

    operate_type: string;
    readonly: boolean; // 编辑页面是否只读

    constructor() {
        this.state = 1;
    }

}
