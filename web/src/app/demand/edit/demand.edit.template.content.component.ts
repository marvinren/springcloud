import {Component, OnInit, Input} from '@angular/core';
@Component({
    selector: 'ai-demand-edit-template-content',
    templateUrl: './demand.edit.template.content.component.html',
    styleUrls: ['./demand.edit.template.content.scss']
})
export class DemandEditTemplateContentComponent implements OnInit {

    @Input() template;

    editor;
    content;

    constructor() {
    }

    ngOnInit(): void {
    }

}