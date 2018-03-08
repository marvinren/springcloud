import {Component, OnInit, Input} from '@angular/core';
@Component({
    selector: 'ai-demand-edit-template',
    templateUrl: './demand.edit.template.component.html',
    styleUrls: ['./demand.edit.template.scss']
})
export class DemandEditTemplateComponent implements OnInit {

    @Input() template;

    nav = 1;

    constructor() {
    }

    ngOnInit(): void {
    }

}