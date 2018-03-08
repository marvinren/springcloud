export class DataRole {
    data_role_id: number;
    name: string;
    code: string;
    organize_id: number;
    notes: string;
    op_id: number;
    create_date: Date;

    operate_type: string;
    readonly: boolean; // 编辑页面是否只读
}