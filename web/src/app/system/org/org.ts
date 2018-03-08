/*
 * 组织机构
 * */
export class Organize {
    organize_id: number;
    op_id: number;
    parent_organize_id: number;
    organize_name: string;  //  名称
    code: string;
    parent_code: string;
    org_type: number;
    notes: string;
    state: number;
    create_date: Date;

    operate_type: string;
    children: Organize[];    children_count: number;

    readonly: boolean; // 编辑页面是否只读
    opened: boolean; // 树结构里是否打开子节点
    show: boolean; // 树结构里是否显示
    has_keyword: boolean; // 树结构里是否含有搜索关键字
    last_show: boolean; // 树结构里是否是兄弟节点里的最后显示项

    constructor() {
        this.state = 1;
    }
}