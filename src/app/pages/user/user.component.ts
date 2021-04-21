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
    this.device = [
      this.category,
      this.summary,
      this.details,
      this.price,
      this.image,
      null,
      this.video,
      null,
      null,
      null,
      null,
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
