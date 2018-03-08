import {Component, OnInit, ViewChild, EventEmitter, Output, Input} from '@angular/core';
import {GlobalService} from 'app/global.service';
import {LoginUser} from 'app/login/login.user';
import {Router} from '@angular/router';
import {EchartCircle, EchartGauge, EchartPie, EchartLine} from '../../share/directives/echarts';
import {EventManager} from 'share';
import {LocalStorageService} from 'ng2-webstorage';
let Swiper = require('swiper/dist/js/swiper');
@Component({
    selector: 'ai-home-content',
    templateUrl: './home.blank.component.html',
    styleUrls: ['./home.blank.scss']
})
export class HomeBlankComponent implements OnInit {
    @Output() onSelectItem = new EventEmitter();
    user: LoginUser = new LoginUser();

    @ViewChild('swiperContainer') swiperContainer;
    @ViewChild('swiperPagination') swiperPagination;
    @ViewChild('swiperBtnPre') swiperBtnPre;
    @ViewChild('swiperBtnNext') swiperBtnNext;
    swiper;
    // 配置
    swipeOptions: any;

    option_line;
    option_pie;
    option_gauge;
    list = [];
    order_id;
    type;
    pagination = {
        keyword: '',
        obj_name: '',
        obj_tag: '',
        obj_type: '',
        process_key: '', // 级联存储用
        link_id: '', // 级联存储用
        link_no: '',
        submit_staff_name: '',
        res_staff_name: '',
        exec_staff_name: '',
        obj_submit_date_start: '',
        obj_submit_date_end: '',
        status: 2,
        exec_staff_id: null,
        page_no: 1,
        row_count: 0,
        page_size: 5
    };

    constructor(private globelService: GlobalService, private router: Router, private eventManager: EventManager, private storage: LocalStorageService) {

    }

    ngOnInit() {
        this.order_id = this.storage.retrieve('order_id');
        this.globelService.user.subscribe(user => {
            this.user = user;
        });

        this.eventManager.subscribe('workflow-order-submit', (event) => {
            console.log('工单提交，刷新');
            this.search();
        });

        this.swipeOptions = {
            slidesPerView: 'auto',
            // centeredSlides: true,
            paginationClickable: true,
            spaceBetween: 0,
            // autoplay: false,
            roundLengths: true,
            // pagination: this.swiperPagination && this.swiperPagination.nativeElement,
            nextButton: this.swiperBtnNext.nativeElement,
            prevButton: this.swiperBtnPre.nativeElement,
        };
        this.swiper = new Swiper(this.swiperContainer.nativeElement, this.swipeOptions);


        let echartline = {
            title: {                          // 代表折线图的名字
                p1: '折线图堆叠',
                p2: '折线图',
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] // 代表横坐标数据
            },
            series: [
                {
                    name: '邮件营销',                          // 代表每条折线的名字
                    data: [120, 132, 101, 134, 90, 230, 210]  // 填充线形图所需数据，填写7个数据，代表邮件营销变化
                },
                {
                    name: '联盟广告',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '视频广告',
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: '直接访问',
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: '搜索引擎',
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };

        let echartDate = {
            title: '访问来源',

            data: [{value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}]
        };
        this.option_pie = new EchartCircle(echartDate.title, echartDate.data).getOps();

        this.option_gauge = new EchartGauge('业务指标', [{value: 50, name: '完成率'}]).getOps();
        this.option_gauge.width = 125;
        this.option_gauge.height = 106;

        this.option_line = new EchartLine(echartline.title, echartline.series, echartline.xAxis.data, false).getOps();
        /*  第一个参数代表标题，第二个参数代表折线及其数据，第三个参数代表横坐标数据，第四个参数代表是折线还是堆叠，true为堆叠，false为折线 */

    }
    right() {
        if (this.user.religion === '16') {
            this.type = 2;
        }
        if (this.user.religion === '9') {
            this.type = 1;
        }
        console.dir(this.type);
    }
    search() {
        this.pagination.page_no = 1;
        this.list = [];
        this.onPageChange(null);
    }

    onPageChange(page_no) {
        if (!this.user || !this.user.staff_id) {
            return;
        }
        this.pagination.exec_staff_id = this.user.staff_id;
        if (page_no) {
            this.pagination.page_no = page_no;
        }
    }

    onSelectOrder(item) {
        this.router.navigate([`pages/home/order/view/${item.order_id}/${new Date().getTime()}`]);
    }

    onOrder() {
        this.router.navigate([`pages/home/order/wait/${new Date().getTime()}`]);
    }
}
