import {Component, OnInit, Input} from '@angular/core';
@Component({
    selector: 'ai-demand-view-template',
    templateUrl: './demand.view.template.component.html',
    styleUrls: ['../edit/demand.edit.template.scss']
})
export class DemandViewTemplateComponent implements OnInit {

    @Input() template;

    nav = 1;

    constructor() {
    }

    ngOnInit(): void {
    }

}