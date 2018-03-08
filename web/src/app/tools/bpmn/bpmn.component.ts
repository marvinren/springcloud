import {Component, OnInit, Input, AfterViewInit, ViewChild} from '@angular/core';
import {Http, ResponseContentType} from '@angular/http';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
let BpmnViewer = require('bpmn-js/lib/Viewer');
@Component({
    selector: 'ai-bpmn',
    templateUrl: './bpmn.component.html',
    styleUrls: ['./bpmn.scss']
})
export class BpmnComponent implements OnInit, AfterViewInit {
    @Input() xml; // my BPMN 2.0 xml
    @Input() link_no;

    @ViewChild('container') container; // 容器dom
    xmlContent; // 读取的xml内容
    viewer; // 阅读器对象实例
    canvas; // 阅读器对象实例下的画布对象实例
    overlays; // 阅读器对象实例下的overlays
    scale = 0.7; // 放大倍数

    isIE = false;
    downloadUrl: SafeResourceUrl; // 下载路径
    downloadName = ''; // 下载名称
    mouseDownFlag = false;
    mouseEvent = {
        downPoint: {
            x: 0,
            y: 0
        },
        movePoint: {
            x: 0,
            y: 0
        },
        upPoint: {
            x: 0,
            y: 0
        },
        lastMoveX: 0,
        lastMoveY: 0,
        moveX: 0,
        moveY: 0
    };

    constructor(private http: Http, private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        let u = navigator.userAgent;
        if (u.indexOf('Trident') >= 0) {
            console.log('ie');
            this.isIE = true;
        }
    }

    ngAfterViewInit() {
        this.viewer = new BpmnViewer({
            container: '#canvas',
            width: '100%',
            height: '100%'
        });
        this.canvas = this.viewer.get('canvas');
        this.overlays = this.viewer.get('overlays');
        if (this.xml) {
            this.http.get(this.xml, {responseType: ResponseContentType.Text}).subscribe(ret => {
                this.xmlContent = ret;
                this.loadBpmn();
            });
        }
    }

    loadBpmn() {
        if (!this.xmlContent) {
            toastr.warning('xmlContent为null');
            return;
        }
        if (!this.viewer) {
            toastr.warning('viewer为null');
            return;
        }
        this.viewer.importXML(this.xmlContent, err => {
            if (err) {
                console.log('加载流程图错误：', err);
            } else {
                console.log('成功加载流程图！');
            }
            let elementRegistry = this.viewer.get('elementRegistry');
            if (this.link_no) {
                console.log(this.link_no);
                let shape = elementRegistry.get(this.link_no);
                let $overlayHtml = $('<div class="highlight-overlay border-radius-2">')
                    .css({
                        width: shape.width + 4,
                        height: shape.height + 4,
                        border: '8px solid #99d56f'
                    });
                this.overlays.add(this.link_no, {
                    position: {
                        top: -4,
                        left: -4
                    },
                    html: $overlayHtml
                });
            }
            this.canvas.zoom('fit-viewport');
            this.initSVGDonwloadUrl();
        });
    }

    _mousedown(event) {
        this.mouseDownFlag = true;
        this.mouseEvent.downPoint = {
            x: event.clientX,
            y: event.clientY
        };
        // console.log('开始坐标 ' + this.mouseEvent.downPoint.x + ':' + this.mouseEvent.downPoint.y);
    }

    _mousemove(event) {
        if (!this.mouseDownFlag) {
            return;
        }
        this.mouseEvent.movePoint = {
            x: event.clientX,
            y: event.clientY
        };
        //  在原来坐标上计算移动距离
        this.mouseEvent.moveX = this.mouseEvent.lastMoveX + this.mouseEvent.movePoint.x - this.mouseEvent.downPoint.x;
        this.mouseEvent.moveY = this.mouseEvent.lastMoveY + this.mouseEvent.movePoint.y - this.mouseEvent.downPoint.y;
        // console.log('移动坐标 ' + this.mouseEvent.moveX + ':' + this.mouseEvent.moveY);
    }

    _mouseup(event) {
        this.mouseDownFlag = false;
        this.mouseEvent.upPoint = {
            x: event.clientX,
            y: event.clientY
        };
        this.mouseEvent.lastMoveX = this.mouseEvent.moveX;
        this.mouseEvent.lastMoveY = this.mouseEvent.moveY;
        // console.log('最后坐标 ' + this.mouseEvent.upPoint.x + ':' + this.mouseEvent.upPoint.y);
    }

    _mousewheel(event) {
        let detail = 0;
        if (event.wheelDelta) {
            // IE、Chrome
            detail = event.wheelDelta;
        } else if (event.detail) {
            // Firefox
            detail = event.detail;
        }
        // console.log('滚轮：' + detail);
        if (detail > 0) {
            this.zoomOut();
        }

        if (detail < 0) {
            this.zoomIn();
        }
    }

    zoomOut() {
        this.scale = this.scale + 0.1;
        if (this.scale >= 1) {
            this.scale = 1;
        }
    }

    zoomIn() {
        this.scale = this.scale - 0.1;
        if (this.scale <= 0.1) {
            this.scale = 0.1;
        }
    }

    // 生成svg下载地址
    initSVGDonwloadUrl() {
        this.viewer.saveSVG((err, svg) => {
            this.setEncoded('diagram.svg', err ? null : svg);
        });
    }

    setEncoded(name, data) {
        let encodedData = encodeURIComponent(data);
        if (data) {
            this.downloadName = name;
            this.downloadUrl = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/bpmn20-xml;charset=UTF-8,' + encodedData);
        }
    }
}