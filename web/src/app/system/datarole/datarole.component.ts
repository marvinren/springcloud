import {Component} from '@angular/core';
import {DataRole} from './datarole';
import {DataroleService} from './datarole.service';
import {Organize} from 'app/system/org';
@Component({
    selector: 'ai-system-datarole',
    templateUrl: './datarole.component.html',
    styleUrls: ['./datarole.scss']
})
export class DataRoleComponent {

    currentOrg: Organize = new Organize();


    constructor(private dataroleService: DataroleService) {
    }

    onSelectOrg(org) {
        this.currentOrg = org;
    }

}