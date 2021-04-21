import { Component, OnInit } from "@angular/core";

import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { network } from 'src/app/components/model/network';
import { from } from 'rxjs';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectedData: any[] = [];
  cols = []
  data: any = []
  trangthaitt = [
    { label: 'All', value: 'all' },
    { label: 'Air Pods', value: 'air_pods_new' },
    { label: 'Ipad New', value: 'ipad_new' },
    { label: 'Iphone New', value: 'iphone_new' },
    { label: 'Macbook New', value: 'macbook_new' },
    { label: 'Sim Data Wifi New', value: 'sim_data_wifi_new' },
    { label: 'Apple watch New', value: 'apple_watch_new' }
  ]

  category = [
    { label: 'Air Pods', value: 'air_pods_new' },
    { label: 'Ipad New', value: 'ipad_new' },
    { label: 'Iphone New', value: 'iphone_new' },
    { label: 'Macbook New', value: 'macbook_new' },
    { label: 'Sim Data Wifi New', value: 'sim_data_wifi_new' },
    { label: 'Apple watch New', value: 'apple_watch_new' }
  ]

  displayDialog = false

  categoryRow: any = ''
  detailsRow: any = ''
  guaranteeRow: any = ''
  imageRow: any = ''
  nameRow: any = ''
  priceRow: any = ''
  remarksRow: any = ''
  summaryRow: any = ''
  videoRow: any = ''

  constructor(
    private networkserviceService: NetworkserviceService,
  ) {

  }

  ngOnInit() {
    this.cols = [
      { field: 'category', header: 'Category' },
      { field: 'name', header: 'Name' },
      { field: 'summary', header: 'Summary' },
      { field: 'details', header: 'Details' },
      { field: 'price', header: 'Price' },
      { field: 'remarks', header: 'Remarks' },
      { field: 'guarantee', header: 'Guarantee' },

    ];
    this.networkserviceService.getAllDevice().subscribe(val =>

      this.data = val

    )







  }

  initForm() {

  }


  onChangeCategory(category) {
    this.networkserviceService.getAllDevice().subscribe(val =>

      this.data = val.filter(val => val.category == category)

    )
  }

  onRowEditInit(val) {
    this.displayDialog = true;
    this.categoryRow = val.category;
    this.detailsRow = val.details;
    this.guaranteeRow = val.guarantee;
    this.imageRow = val.image;
    this.nameRow = val.name;
    this.priceRow = val.price;
    this.remarksRow = val.remarks;
    this.summaryRow = val.summary;
    this.videoRow = val.video;
  }

  exportExcel() {

    const worksheet = XLSX.utils.json_to_sheet(this.data);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "DanhSachSanPham");

  }

  saveAsExcelFile(buffer: any, fileName: string): void {

    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);

  }


  save(){
    console.log(this.categoryRow)
  }
  cancel() {
    this.displayDialog = false;
  }
}
