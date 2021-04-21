import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {NETWORK} from '../constant/constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { network } from '../components/model/network';

@Injectable({
  providedIn: 'root'
})





export class NetworkserviceService {

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
}
  user:any=[]
  constructor(
    private httpClient: HttpClient
  ) { }

  getAllDevice() {
    const getAllDeviceAPI = `${NETWORK.API.Detail}`;
    return this.httpClient.get<any>(getAllDeviceAPI);    
  }




  getAllUser() {
        
  }

  

  postAllUser(data): Observable<any>  {
    const postAllUserAPI = `${NETWORK.API.WiFi}`;
    return this.httpClient.post<any>(postAllUserAPI, data,this.httpOptions)  
  }

  

  deleteUser(data): Observable<any>  {
    const deleteUserAPI = `${NETWORK.API.WiFi}/${data}`;
    return this.httpClient.delete(deleteUserAPI)  
  }

  deleteCongtacvien(data): Observable<any>  {
    const deleteCongtacvienAPI = `${NETWORK.API.Congtacvien}/${data}`;
    return this.httpClient.delete(deleteCongtacvienAPI)  
  }

  updateAllUser(data): Observable<any>  {
    const updateAllUserAPI = `${NETWORK.API.WiFi}`;
    return this.httpClient.put<any>(updateAllUserAPI, data,this.httpOptions)  
  }

  

}
