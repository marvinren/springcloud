import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Organize} from './org';
import {OrgService} from 'app/system/org';
@Component({
    selector: 'ai-system-org-tree',
    templateUrl: './org.tree.component.html'
})
export class OrgTreeComponent implements OnInit {
    @Input() orgTree: Organize[] = [];
    @Input() readonly = true;
    @Output() onSelect = new EventEmitter();
    @Output() onSelectMenu = new EventEmitter();

    constructor(private orgService: OrgService) {
    }

    ngOnInit() {

    }

    toggleChildren(item) {
        item.opened = !item.opened;
        if (item.opened && item.children_count && !item.children.length) {
            let pagination = {
                parent_organize_id: item.organize_id
            };
            this.orgService.getOrgsByParent(pagination).subscribe(ret => {
                if (ret && ret.length) {
                    ret.forEach(e => {
                        e.show = true;
                        e.opened = false;
                        e.has_keyword = false;
                        e.last_show = false;
                        e.children = [];
                        item.children.push(e);
                    });
                }
                if (item.children.length) {
                    item.children[item.children.length - 1].last_show = true;
                }
            });
        }
    }

    _onSelect(event): void {
        this.onSelect.emit(event);
    }

    _onSelectMenu(event): void {
        this.onSelectMenu.emit(event);
    }
}