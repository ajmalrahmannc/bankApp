import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    acno: ["",[Validators.required, Validators.pattern('[0-9]*')]],
    pwd: ["",[Validators.required, Validators.pattern('[a-zA-z0-9]*')]],
    uname: ["", [Validators.required, Validators.pattern('[a-zA-z ]*')]]
  })

  constructor(private ds: DataService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  register() {


    // console.log(this.registerForm.get('uname')?.errors);
    
    var uname = this.registerForm.value.uname
    var acno = this.registerForm.value.acno
    var pwd = this.registerForm.value.pwd

    if (this.registerForm.valid) {
      const result = this.ds.register(acno, uname, pwd)
      if (result) {
        alert("successfully registered!!!")
        this.router.navigateByUrl("")
      }
      else {
        alert("user already exist!!! please login")
      }

    }
    else {
      alert("invalid form")
    }

  }

}
