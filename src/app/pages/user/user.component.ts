import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-user",
  templateUrl: "user.component.html",
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  dsCongtacvien=[]
  userform: FormGroup | any;
congtacvien:any
  hoten = ""
  ghichu = ""
  facebook = ""
  data: any
  thanhtoan_array = []
  luudata: any
  updatedata: any
  trangthai_kh: any
  editData: any

  ngaythue: Date
  ngaytra: Date
  olduser: any
  trangthaikh: any
  trangthaicongtacvien:any
  trangthaikhluudata: any
  isDisable: boolean
  thanhtoan: any
  constructor(
    private formBuilder: FormBuilder,
    private networkserviceService: NetworkserviceService,
    private router: Router
  ) {
    this.isDisable = false
    this.initForm();
    this.onFormChanges();
    this.trangthaikh = [
      { label: 'Sử Dụng', value: 'sudung' },
      { label: 'Tạm Ngưng', value: 'tamngung' },
      { label: 'Hủy', value: 'huy' },
      { label: 'Trả Lại', value: 'tralai' },
      { label: 'Trả Lại - Chưa Trả Cọc', value: 'chuatracoc' },
    ];

   
    
  }

  ngOnInit() {
    
    this.dsCongtacvien=[{label:'Any',value:'any'},{label:'Khách Lẻ',value:'khachle'}]

  }

  initForm() {
    this.userform = this.formBuilder.group({
      mawifi: new FormControl(null),
      sdtsim: new FormControl(null),
      masim: new FormControl(null),
      hoten: new FormControl(null),
      facebook: new FormControl(null),
      ngaythue: new FormControl(null),
      ngaytra: new FormControl(null),
      diachi: new FormControl(null),
      giacuoc: new FormControl(null),
      trangthaikhdd: new FormControl('sudung'),
      ghichu: new FormControl(null),
      thanhtoanctrl: new FormControl(null),
      congtacviencontrol:new FormControl(null)
    })


  }

  onFormChanges() {

    this.userform.valueChanges.subscribe(res => {
      this.data = res,
        this.hoten = res.hoten,
        this.ghichu = res.ghichu,
        this.facebook = res.facebook,
        this.trangthai_kh = res.trangthaikhdd
      this.thanhtoan = res.thanhtoanctrl
      this.congtacvien = res.congtacviencontrol
    });

  }

  submit() {


    this.userform.controls.mawifi.enable();
    this.userform.controls.sdtsim.enable();
    this.userform.controls.masim.enable();
    // this.thanhtoan.setDate(this.thanhtoan.getDate() + 1)
    new Date(this.thanhtoan.setDate(this.thanhtoan.getDate() + 1))
    if (this.trangthai_kh == null || this.trangthai_kh == 'huy' || this.trangthai_kh == 'tralai' || this.trangthai_kh == 'chuatracoc') {
      this.trangthaikhluudata = 'sudung'

    }
    else {
      this.trangthaikhluudata = this.trangthai_kh
    }
    this.luudata = [
      
      this.data.mawifi,
      this.data.sdtsim,
      this.data.masim,
      this.data.ngaythue,
      this.data.ngaytra,
      null,
      this.data.giacuoc,
      this.data.facebook,
      true,
      this.data.diachi,
      this.hoten,
      this.ghichu,
      this.trangthaikhluudata,
      null,
      this.thanhtoan,
      this.congtacvien,
      null
    ]

    this.updatedata = [
     
      this.data.ngaythue,
      this.data.ngaytra,
      null,
      this.data.giacuoc,
      this.data.facebook,
      true,
      this.data.diachi,
      this.hoten,
      this.ghichu,
      this.data.sdtsim,
      this.data.masim,
      //'sudung',
      this.trangthaikhluudata,
      null,
      this.thanhtoan,
      this.congtacvien,
      null,
      this.data.mawifi,
      
    ]

    this.olduser = [
     
      this.data.mawifi,
      this.data.sdtsim,
      this.data.masim,
      this.editData.ngaythue,
      this.data.ngaytra,
      null,
      this.data.giacuoc,
      this.editData.facebook,
      null,
      this.editData.diachi,
      this.editData.hoten,
      this.editData.ghichu,
      this.trangthai_kh,
      null,
      this.thanhtoan,
      this.congtacvien,
      null
    ]

    if (this.editData.mawifi) {
      this.networkserviceService.updateAllUser(this.updatedata).subscribe(
        data => {
          alert("Lưu Thành Công");
          this.router.navigateByUrl('dashboard')
          console.log("POST Request is successful ", data);
        },
        error => {

          console.log("Error", error);

        })
      if (this.trangthai_kh == 'huy' || this.trangthai_kh == 'tralai' || this.trangthai_kh == 'chuatracoc') {
       
      }
    }
    else {
      if (this.data.mawifi && this.data.masim && this.data.sdtsim && this.data.hoten) {
        this.networkserviceService.postAllUser(this.luudata).subscribe(
          data => {
            alert("Lưu Thành Công");
            this.router.navigateByUrl('dashboard')
            console.log("POST Request is successful ", data);
          },
          error => {

            console.log("Error", error);

          })
      }
      else {
        alert("Điền thông tin vào ô * trống");
      }
    }

  }

  onchange() {
    if (this.trangthai_kh == 'huy' || this.trangthai_kh == 'tralai' || this.trangthai_kh == 'chuatracoc') {
      this.userform.controls.ngaytra.setValue(new Date())
      this.userform.controls.ngaythue.setValue(null)
      this.userform.controls.hoten.setValue(null)
      this.userform.controls.facebook.setValue(null)
      this.userform.controls.diachi.setValue(null)
      this.userform.controls.giacuoc.setValue(null)
      this.userform.controls.ghichu.setValue(null)
    }
    else
      this.userform.controls.ngaytra.setValue(null)
  }

  cancel() {
    this.router.navigateByUrl('dashboard')
  }

  onchangecongtacvien(){}

}
