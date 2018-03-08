import {Component, Input, AfterViewInit, OnDestroy, OnInit, ViewChild, DoCheck} from '@angular/core';
import {GlobalService} from 'app/global.service';
import {LoginUser} from 'app/login/login.user';
import {TinymceService} from './tinymce.service';
let tinymce = require('tinymce');
@Component({
    selector: 'ai-tinymce',
    templateUrl: './tinymce.component.html'
})
export class TinymceComponent implements OnInit, AfterViewInit, OnDestroy, DoCheck {
    @Input() obj;
    @Input() fieldName;
    @Input() height; // 高度
    @ViewChild('tinymcxBox') tinymcxBox;
    @ViewChild('fileInput') fileInput;
    @ViewChild('imgInput') imgInput;
    @ViewChild('fileForm') fileForm;
    docFile;
    imgFile;
    test;

    user: LoginUser;
    elementId;
    tinymceEditor;
    loaded = false;
    file_picker_callback;
    root = 'attach/'; // 开发环境用http://10.1.195.103/attach/ 提交用 attach/

    constructor(private globelService: GlobalService, private  tinymceService: TinymceService) {
    }

    ngOnInit() {
        this.elementId = new Date().getTime();
        if (this.tinymceEditor) {
            tinymce.remove(this.tinymceEditor);
            this.tinymceEditor = null;
        }
        this.globelService.user.subscribe(user => {
            this.user = user;
        });
    }

    ngDoCheck() {
        if (!this.obj || !this.fieldName) {
            return;
        }
        this.initContent();
    }

    ngAfterViewInit() {
        this.initEditor();
    }

    ngOnDestroy() {
        if (this.tinymceEditor) {
            tinymce.remove(this.tinymceEditor);
            this.tinymceEditor = null;
        }
    }

    initEditor() {
        tinymce.init({
            selector: '#' + this.elementId,
            language: 'zh_CN',
            theme: 'modern',
            entities: '160,nbsp,162,cent,8364,euro,163,pound',
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons template paste textcolor'
            ],
            toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent',
            toolbar2: 'preview bullist numlist | forecolor backcolor emoticons | table code | link image', // print  media
            menubar: false,
            statusbar: false,
            image_advtab: true,
            toolbar_items_size: 'small',
            height: this.height ? this.height : '180',
            setup: (editor) => {
                this.tinymceEditor = editor;
                if (this.tinymceEditor && this.tinymceEditor.getBody()) {
                    this.tinymceEditor.getBody().innerHTML = this.obj && this.fieldName && this.obj[this.fieldName] || '';
                    this.loaded = true;
                }
                this.tinymceEditor.on('change', () => {
                    this.obj[this.fieldName] = this.tinymceEditor.getBody().innerHTML;
                });
            },
            // 图片上传
            automatic_uploads: true,
            // file_picker_types: 'image',
            image_title: true,
            file_picker_callback: (cb, value, meta) => {
                let filetype = meta.filetype;
                this.file_picker_callback = cb;
                if (meta.filetype === 'image') {
                    this.imgInput.nativeElement.click();
                } else {
                    this.fileInput.nativeElement.click();
                }
            }
        });
    }

    initContent() {
        if (this.loaded) {
            return;
        }
        if (!this.tinymceEditor || !this.tinymceEditor.getBody()) {
            return;
        }
        if (this.tinymceEditor.getBody().innerHTML === this.obj[this.fieldName]) {
            return;
        }
        if (this.obj[this.fieldName] === null || this.obj[this.fieldName] === undefined) {
            this.tinymceEditor.getBody().innerHTML = '';
        } else {
            this.tinymceEditor.getBody().innerHTML = this.obj[this.fieldName] || '';
        }
        this.loaded = true;
    }

    imgChange() {
        let files = this.imgInput.nativeElement.files;
        if (!files || !files.length) {
            return;
        }
        let file = files[0];
        if (!file) {
            return;
        }
        let attach = {
            file: file,
            file_type: file.type,
            file_name: file.name,
            file_resource: 'tinymce',
            submit_staff_id: this.user && this.user.staff_id
        };
        toastr.info('上传中...', '', {timeOut: 1000 * 30});
        this.tinymceService.upload(attach).subscribe(ret => {
            toastr.clear();
            let file_path = this.root + ret.file_path;
            file_path = file_path.replace(/attach\/attach/g, 'attach');
            file_path = file_path.replace(/attach\/\/attach/g, 'attach');
            this.file_picker_callback(file_path, {title: file.name});
            this.resetForm(this.fileForm);
        });
    }

    fileChange() {
        let files = this.fileInput.nativeElement.files;
        if (!files || !files.length) {
            return;
        }
        let file = files[0];
        if (!file) {
            return;
        }
        let attach = {
            file: file,
            file_type: file.fileType,
            file_resource: 'tinymce',
            submit_staff_id: this.user && this.user.staff_id
        };
        toastr.info('上传中...', '', {timeOut: 1000 * 30});
        this.tinymceService.upload(attach).subscribe(ret => {
            toastr.clear();
            let file_path = this.root + ret.file_path;
            file_path = file_path.replace(/attach\/attach/g, 'attach');
            file_path = file_path.replace(/attach\/\/attach/g, 'attach');
            this.file_picker_callback(file_path, {title: file.name});
            this.resetForm(this.fileForm);
        });
    }

    resetForm(form) {
        if (form) {
            form.resetForm();
            // form.nativeElement.reset();
        }
    }
}