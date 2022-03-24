import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  aim = "Your perfect banking partner"
  accno = "account number please!!!"



  acno = ""
  pwd = ""


  loginForm = this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pwd:['',[Validators.required,Validators.pattern('[A-Za-z0-9]*')]]
  })


  constructor(private router: Router, private ds: DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  get_acno(event: any) {
    console.log(event.target.value);
    this.acno = event.target.value
  }

  get_pwd(event: any) {
    console.log(event.target.value);
    this.pwd = event.target.value
  }

  login() {
    var acno = this.loginForm.value.acno
    var pwd = this.loginForm.value.pwd


    if(this.loginForm.valid){
      const result = this.ds.login(acno, pwd)

      if (result) {
  
        alert("login successfull")
        this.router.navigateByUrl("dashboard")
      }
      else {
        alert("inavlid password")
      }
  
    }
    else{
      alert("invalid Form")
    }

  }



  // login(a:any,p:any){
  //   console.log(a.value);



  //   var acno=a.value
  //   var pwd=p.value

  //   let db = this.database

  //   if(acno in db){

  //     if(pwd == db[acno]["password"]){
  //       alert("login successfull")
  //     }
  //     else{
  //       alert("inavlid password")
  //     }

  //   }
  //   else{
  //     alert("invalid account number")
  //   }
  // }



}
