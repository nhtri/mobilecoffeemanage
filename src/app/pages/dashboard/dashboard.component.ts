import { Component, OnInit } from "@angular/core";

import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { network } from 'src/app/components/model/network';
import { from } from 'rxjs';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Router } from "@angular/router";

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
    { label: 'Apple watch New', value: 'apple_watch_new' },
    { label: 'Dien thoai cu', value: 'dienthoaicu' }
  ]

  category = [
    { label: 'Air Pods', value: 'air_pods_new' },
    { label: 'Ipad New', value: 'ipad_new' },
    { label: 'Iphone New', value: 'iphone_new' },
    { label: 'Macbook New', value: 'macbook_new' },
    { label: 'Sim Data Wifi New', value: 'sim_data_wifi_new' },
    { label: 'Apple watch New', value: 'apple_watch_new' },
    { label: 'Dien thoai cu', value: 'dienthoaicu' }
  ]

  displayDialog = false

  categoryRow: any = ''
  detailsRow: any = ''
  guaranteeRow: any = ''
  imageRow1: any = ''
  nameRow: any = ''
  priceRow: any = ''
  remarksRow: any = ''
  summaryRow: any = ''
  videoRow: any = ''
  idRow: any = ''
  deviceUpdate = []

  arrayImage = [];
  image1 = '';
  image2 = '';
  image3 = '';
  image4 = '';
  image5 = '';
  image6 = '';
deviceStatus =[];


  constructor(
    private networkserviceService: NetworkserviceService, private router: Router
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
      { field: 'active', header: 'Active' },

    ];
    this.networkserviceService.getAllDevice().subscribe(val =>

      this.data = val

    )







  }

  initForm() {

  }


  onChangeCategory(category) {
    if (category == 'all') {
      this.networkserviceService.getAllDevice().subscribe(val =>

        this.data = val

      )
    }
    else {
      this.networkserviceService.getAllDevice().subscribe(val =>

        this.data = val.filter(val => val.category == category)

      )
    }

  }



  onRowEditInit(rowData) {
    this.router.navigate(['/user'], { state: rowData });
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


  save() {

    this.arrayImage = this.imageRow1.split(',')
    if (this.arrayImage[0]) {
      this.image1 = this.arrayImage[0]
    }
    else this.image1 = null

    if (this.arrayImage[1]) {
      this.image2 = this.arrayImage[1]
    }
    else this.image2 = null

    if (this.arrayImage[2]) {
      this.image3 = this.arrayImage[2]
    }
    else this.image3 = null

    if (this.arrayImage[3]) {
      this.image4 = this.arrayImage[3]
    }
    else this.image4 = null

    if (this.arrayImage[4]) {
      this.image5 = this.arrayImage[4]
    }
    else this.image5 = null

    if (this.arrayImage[5]) {
      this.image6 = this.arrayImage[5]
    }
    else this.image6 = null

    console.log(this.arrayImage)


    this.deviceUpdate = [this.categoryRow,
    this.summaryRow,
    this.detailsRow,
    this.priceRow, this.image1, this.image2, this.videoRow, this.image3, this.image4, this.image5, this.image6, this.nameRow, this.remarksRow, this.guaranteeRow, null, this.idRow
    ]
    this.networkserviceService.updateAllDevices(this.deviceUpdate).subscribe(
      data => {
        alert("Lưu Thành Công");

        console.log("POST Request is successful ", data);
        location.reload();
      },
      error => {

        console.log("Error", error);

      })
  }
  cancel() {
    this.displayDialog = false;
  }

  onRowDelete(val, index) {
    let isDel = confirm("Bạn có muốn xóa " + val.name + " không?");
    if (isDel == true) {
      this.networkserviceService.deleteDevice(val.id).subscribe(
        data => {
          alert("Xóa Thành Công");
          location.reload();
          console.log("POST Request is successful ", data);
        },
        error => {

          console.log("Error", error);

        })
    }
  }

  handleChangeStatus(rowData) {
    console.log("rowData", rowData)
    this.deviceStatus = [rowData.active,rowData.id]
    console.log(this.deviceStatus)
    this.networkserviceService.updateDeviceStatus(this.deviceStatus).subscribe(
      data => {
        alert("Lưu Thành Công");

        console.log("POST Request is successful ", data);
      },
      error => {

        console.log("Error", error);

      })
  }
}
