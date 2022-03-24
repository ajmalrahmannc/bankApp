import { JsonPipe } from '@angular/common';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentUname : any

  currentacno : any

  database: any = {
    1000: { acno: 1000, uname: "john", password: "1000", balance: 6000 ,transation:[]},
    1002: { acno: 1002, uname: "tom", password: "1002", balance: 5000 ,transaction:[]},
    1003: { acno: 1003, uname: "mars", password: "1003", balance: 9000 ,transaction:[]}

  }


  constructor() { 
    this.getDetails()
  }


  // save details in local storage

  saveDetails(){
    if(this.database){
      localStorage.setItem("database",JSON.stringify(this.database))
    }

    if(this.currentUname){
      localStorage.setItem("currentUname",JSON.stringify(this.currentUname))
    }

    if(this.currentacno){
      localStorage.setItem("currentacno",JSON.stringify(this.currentacno))
    }
  }


  // get details in local storage

  getDetails(){
    if(localStorage.getItem("database")){
      this.database=JSON.parse(localStorage.getItem("database") || "")
    }

    if(localStorage.getItem("currentUname")){
      this.currentUname=JSON.parse(localStorage.getItem("currentUname") || "")
    }
  }


//get transaction array

  getTransaction(acno : any){
    return this.database[acno].transaction
  }


  //register

  register(acno: any, uname: any, password: any) {

    let db = this.database

    if (acno in db) {
      return false
    }
    else {
      db[acno] = {
        acno,
        uname,
        password,
        balance: 0,
        transaction:[]
      }
      console.log(db);

      this.saveDetails()
      return true
    }
  }

  //login

  login(acno: any, password: any) {

    let db = this.database

    if (acno in db) {

      if (password == db[acno]["password"]) {
        this.currentUname = db[acno]["uname"]

        this.currentacno = acno

        this.saveDetails()
        return true
      }
      else {
        alert("inavlid password")
        return false
      }

    }
    else {
      alert("invalid account number")
      return false
    }
  }


  //deposit

  deposit(acno:any,password:any,amt:any){

    var amount=parseInt(amt)

    let db=this.database

    if(acno in db){

      if(password == db[acno]["password"]){
        db[acno]["balance"]+=amount

        db[acno].transaction.push({
          amount:amount,
          type:"CREDIT"
        })
        this.saveDetails()
        return db[acno]["balance"]
      }
      else{
        alert("invaild password")
        return false
      }

    }
    else{
      alert("invalid account number")
      return false
    }
  }


  //withdrawel

  withdraw(acno:any,password:any,amt:any){

    var amount=parseInt(amt)

    let db=this.database

    if(acno in db){

      if(password == db[acno]["password"]){

        if(db[acno]["balance"]>amount){
          db[acno]["balance"]-=amount

          db[acno].transaction.push({
            amount:amount,
            type:"DEBIT"
          })
  
          this.saveDetails()
          return db[acno]["balance"]  
        }
        else{
          alert("insufficient balance")
          return false
        }
      }
      else{
        alert("invaild password")
        return false
      }

    }
    else{
      alert("invalid account number")
      return false
    }
  }


}
