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
  categories: Category[];
  selectedCategory: string = 'air_pods_new';

  category='air_pods_new';
  summary='';
  details='';
  price='';
  image='';
  video='';
  name='';
  remarks='';
  guarantee='';
  email='';
  device = [];
arrayImage = [];
image1='';
image2='';
image3='';
image4='';
image5='';
image6='';

  constructor(

    private networkserviceService: NetworkserviceService,
    private router: Router
  ) {
   
this.categories =  [
  { label: 'Air Pods', value: 'air_pods_new' },
  { label: 'Ipad New', value: 'ipad_new' },
  { label: 'Iphone New', value: 'iphone_new' },
  { label: 'Macbook New', value: 'macbook_new' },
  { label: 'Sim Data Wifi New', value: 'sim_data_wifi_new' },
  { label: 'Apple watch New', value: 'apple_watch_new' }
]
   
    
  }

  ngOnInit() {
    
   

  }

  initForm() {
    


  }

  onFormChanges() {

   

  }

  submit() {

this.arrayImage = this.image.split(',')
if(this.arrayImage[0]){
  this.image1=this.arrayImage[0]
}
else this.image1 = null

if(this.arrayImage[1]){
  this.image2=this.arrayImage[1]
}
else this.image2 = null

if(this.arrayImage[2]){
  this.image3=this.arrayImage[2]
}
else this.image3 = null

if(this.arrayImage[3]){
  this.image4=this.arrayImage[3]
}
else this.image4 = null

if(this.arrayImage[4]){
  this.image5=this.arrayImage[4]
}
else this.image5 = null

if(this.arrayImage[5]){
  this.image6=this.arrayImage[5]
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

  onchange() {
   
  }

  cancel() {
    this.router.navigateByUrl('dashboard')
  }

  onChangeCategory(val){
this.category = val.value
  }

}
