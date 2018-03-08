export class Dictionary {
    param_type: string;
    param_no: number;
    param_id: number;
    parent_param_type: string;
    param_name: string;
    param_disc: string;
    param_rela_id: number;
    param_value: string;
    sort_id: number;

    operate_type: string;
    children: Dictionary[];
    readonly: boolean; // 编辑页面是否只读
    opened: boolean; // 树结构里是否打开子节点
    show: boolean; // 树结构里是否显示
    has_keyword: boolean; // 树结构里是否含有搜索关键字
    last_show: boolean; // 树结构里是否是兄弟节点里的最后显示项

}