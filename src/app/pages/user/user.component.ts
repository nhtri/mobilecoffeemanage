import { Component, OnInit } from "@angular/core";
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { Router } from '@angular/router';

interface Category {
  label: string,
  value: string
}

@Component({
  selector: "app-user",
  templateUrl: "user.component.html",
  styleUrls: ['./user.component.css']
})



export class UserComponent implements OnInit {

  editData: any
  deviceUpdate = []
  categories: Category[];
  selectedCategory: any;
  // selectedCategory: string = 'air_pods_new';
  category = 'air_pods_new';
  summary = '';
  details = '';
  price = '';
  image = '';
  video = '';
  name = '';
  remarks = '';
  guarantee = '';
  email = '';
  device = [];
  arrayImage = [];
  image1 = '';
  image1Path = '';
  image1PathName = '';
  image2 = '';
  image2Path = '';
  image2PathName = '';
  image3 = '';
  image3Path = '';
  image3PathName = '';
  image4 = '';
  image4Path = '';
  image4PathName = '';
  image5 = '';
  image5Path = '';
  image5PathName = '';
  image6 = '';
  image6Path = '';
  image6PathName = '';

  uploadedFiles: any[] = [];
  fileToUpload: File = null;

  uplo: File

  data: any

  constructor(

    private networkserviceService: NetworkserviceService,
    private router: Router
  ) {
    this.editData = window.history.state
    this.categories = [
      { label: 'Air Pods', value: 'air_pods_new' },
      { label: 'Ipad New', value: 'ipad_new' },
      { label: 'Iphone New', value: 'iphone_new' },
      { label: 'Macbook New', value: 'macbook_new' },
      { label: 'Sim Data Wifi New', value: 'sim_data_wifi_new' },
      { label: 'Apple watch New', value: 'apple_watch_new' }
    ]


  }

  ngOnInit() {

    console.log('this.editData', this.editData)
    if (this.editData.id) {
      this.selectedCategory = this.editData.category
      this.category = this.editData.category
      this.name = this.editData.name
      this.summary = this.editData.summary
      this.remarks = this.editData.remarks
      this.summary = this.editData.summary
      this.price = this.editData.price
      this.guarantee = this.editData.guarantee
      this.details = this.editData.details
      this.video = this.editData.video
      this.image1 = this.editData.image1
      this.image1Path = 'http://tonylemobile.com' + this.image1
      this.image1PathName = this.image1Path.replace('http://tonylemobile.com./assets/images/', '')
      console.log(this.image1Path)
      this.image2 = this.editData.image2
      this.image2Path = 'http://tonylemobile.com' + this.image2
      console.log(this.image2, this.image1Path)
      this.image2PathName = this.image2Path.replace('http://tonylemobile.com./assets/images/', '')
      this.image3 = this.editData.image3
      this.image3Path = 'http://tonylemobile.com' + this.image3
      this.image3PathName = this.image3Path.replace('http://tonylemobile.com./assets/images/', '')
      this.image4 = this.editData.image4
      this.image4Path = 'http://tonylemobile.com' + this.image4
      this.image4PathName = this.image4Path.replace('http://tonylemobile.com./assets/images/', '')
      this.image5 = this.editData.image5
      console.log('this.image5', this.image5)
      this.image5Path = 'http://tonylemobile.com' + this.image5
      this.image5PathName = this.image5Path.replace('http://tonylemobile.com./assets/images/', '')
      this.image6 = this.editData.image6
      this.image6Path = 'http://tonylemobile.com' + this.image6
      this.image6PathName = this.image6Path.replace('http://tonylemobile.com./assets/images/', '')
    }
    else {
      this.selectedCategory = 'air_pods_new';
    }
  }

  initForm() {



  }

  onFormChanges() {



  }

  submit() {

    if (this.editData.id) {
      this.deviceUpdate = [this.editData.category,
        this.summary,
        this.details,
        this.price, this.image1, this.image2, this.video, this.image3, this.image4, this.image5, this.image6, this.name, this.remarks, this.guarantee, null,this.editData.id
        ]
        this.networkserviceService.updateAllDevices(this.deviceUpdate).subscribe(
          data => {
            alert("Lưu Thành Công");
    
            console.log("POST Request is successful ", data);
            this.router.navigateByUrl('dashboard')
          },
          error => {
    
            console.log("Error", error);
    
          })
     }
    else {
      // this.arrayImage = this.image.split(',')
      if (this.arrayImage[0]) {
        this.image1 = './assets/images/'+this.arrayImage[0]
      }
      else this.image1 = null

      if (this.arrayImage[1]) {
        this.image2 = './assets/images/'+this.arrayImage[1]
      }
      else this.image2 = null

      if (this.arrayImage[2]) {
        this.image3 = './assets/images/'+this.arrayImage[2]
      }
      else this.image3 = null

      if (this.arrayImage[3]) {
        this.image4 = './assets/images/'+this.arrayImage[3]
      }
      else this.image4 = null

      if (this.arrayImage[4]) {
        this.image5 = './assets/images/'+this.arrayImage[4]
      }
      else this.image5 = null

      if (this.arrayImage[5]) {
        this.image6 = './assets/images/'+this.arrayImage[5]
      }
      else this.image6 = null

      console.log(this.arrayImage)
      this.device = [
        this.category,
        this.summary,
        this.details,
        this.price,
        this.image1,
        this.image2,
        this.video,
        this.image3,
        this.image4,
        this.image5,
        this.image6,
        // DEFAULT,
        this.name,
        this.remarks,
        this.guarantee,
        this.email
      ]
      console.log(this.device)

      this.networkserviceService.postAllDevice(this.device).subscribe(
        data => {
          alert("Lưu Thành Công");

          console.log("POST Request is successful ", data);
          this.router.navigateByUrl('dashboard')

        },
        error => {

          console.log("Error", error);

        })
    }

  }

  onchange() {

  }

  cancel() {
    this.router.navigateByUrl('dashboard')
  }

  onChangeCategory(val) {
    this.category = val.value
  }



  //   onUpload(event) {
  //     let formData = new FormData();
  //     for (let file of event.files) {
  //       this.fileToUpload = file
  //         formData.append(this.fileToUpload.name, this.fileToUpload );
  //         console.log('formData',formData)
  //     }


  //     for (let file of event.files) {
  //       this.uploadedFiles.push(file);
  // this.fileToUpload = file

  // console.log('this.fileToUpload',this.fileToUpload)
  //       this.networkserviceService.postFile(formData).subscribe(
  //         data => {
  //           alert("Lưu Thành Công");

  //           console.log("POST Request is successful ", data);
  //           this.router.navigateByUrl('dashboard')

  //         },
  //         error => {

  //           console.log("Error", error);

  //         })
  //     }


  //     // this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  //   }


  onUpload(event) {
    for (let file of event.files) {
      this.uplo = file;
      this.uploadFileToActivity();
this.arrayImage.push(file.name)

    }
    alert('Upload Thành Công');
    // this.uploadFileToActivity();
  }
  uploadFileToActivity() {
    this.networkserviceService.postFile(this.uplo).subscribe(data => {
      // alert('Success');
      console.log('success');
    }, error => {
      console.log(error);
    });
  }


  deleteImage6(image6Path){
    this.image6 = null
  }
  deleteImage5(image6Path){
    this.image5 = null
  }
  deleteImage4(image6Path){
    this.image4 = null
  }
  deleteImage3(image6Path){
    this.image3 = null
  }
  deleteImage2(image6Path){
    this.image2 = null
  }
  deleteImage1(image6Path){
    this.image1 = null
  }

}
