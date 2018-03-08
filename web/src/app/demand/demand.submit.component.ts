import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Alert} from 'share';

@Component({
    selector: 'ai-demand-submit',
    templateUrl: './demand.submit.component.html',
    styleUrls: ['./demand.submit.scss']
})
export class DemandSubmitComponent implements OnInit {
    @Input() data;
    formDate;
    @Output() onClose = new EventEmitter();
    @Output() onSubmit = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    _onClose() {
        this.onClose.emit();
    }

    _onSubmit() {
        Alert.confirm('确定提交吗？').then(() => {
            this.onSubmit.emit(this.formDate);
        });
    }
}