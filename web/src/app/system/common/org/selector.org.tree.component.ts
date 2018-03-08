import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SelectorOrg} from 'app/system/common/org/selector.org.module';
import {OrgService} from 'app/system/org';
@Component({
    selector: 'ai-selector-org-tree',
    templateUrl: './selector.org.tree.component.html'
})
export class SelectorOrgTreeComponent implements OnInit {
    @Input() orgTree: SelectorOrg[] = [];
    @Input() checkbox = false;
    @Input() selectedItem: SelectorOrg;
    @Output() onSelect = new EventEmitter();
    @Output() onCheck = new EventEmitter();

    constructor(private orgService: OrgService) {
    }

    ngOnInit() {
    }

    toggleChildren(item) {
        item.opened = !item.opened;
        if (item.opened && item.children_count && !item.children.length) {
            let pagination = {
                parent_organize_id: item.organize_id,
                state: 1
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

    _onCheck(event): void {
        console.dir(event);
        this.onCheck.emit(event);
    }
}