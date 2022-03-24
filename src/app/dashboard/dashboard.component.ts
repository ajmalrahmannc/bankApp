import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // acno=""
  // pwd=""
  // amount=""

  // acno1=""
  // pwd1=""
  // amount1=""

  depositForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pwd: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })


  withdrawForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pwd: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })


  user: any
  acno:any
  lDate:any

  constructor(private ds: DataService, private fb: FormBuilder, private router: Router) {
    this.user = ds.currentUname
    this.lDate = new Date()
  }

  ngOnInit(): void {
    if (!localStorage.getItem("currentacno")) {
      alert("please login")
      this.router.navigateByUrl("")
    }
  }

  deposit() {

    var acno = this.depositForm.value.acno
    var pwd = this.depositForm.value.pwd
    var amount = this.depositForm.value.amount

    if (this.depositForm.valid) {
      var result = this.ds.deposit(acno, pwd, amount)
      if (result) {
        alert(amount + "deposit successfully.... New Balance is" + result)
      }

    }
    else {
      alert("invalid Form")
    }


  }

  withdraw() {

    var acno = this.withdrawForm.value.acno
    var pwd = this.withdrawForm.value.pwd
    var amount = this.withdrawForm.value.amount


    if (this.withdrawForm.valid) {
      var result = this.ds.withdraw(acno, pwd, amount)
      if (result) {
        alert(amount + "withdraw successfully.... New balance is " + result)
      }

    }
    else {
      alert("invalid Form")
    }
  }


  logout() {
    localStorage.removeItem("currentacno")
    this.router.navigateByUrl("")
  }

  deleteAcc(){
    this.acno = JSON.parse(localStorage.getItem("currentUname") || "")
  }

  cancelFromParent(){
    this.acno=""
  }
}
