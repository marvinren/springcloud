import {Component, Input, OnInit, DoCheck, Output, EventEmitter} from '@angular/core';
@Component({
    selector: 'ai-demand-step',
    templateUrl: './demand.step.component.html',
    styleUrls: ['./demand.step.scss']
})
export class DemandStepComponent implements OnInit, DoCheck {

    @Input() step = 1;
    lastStep = 1;
    progress = Math.floor(this.step / 7 * 100);

    constructor() {
    }

    ngOnInit() {

    }

    ngDoCheck() {
        if (this.step !== this.lastStep) {
            this.progress = Math.floor(this.step / 7 * 100);
        }
    }
}