import { Component, OnInit } from '@angular/core';
import {Book} from "../model/book";
import {FormControl, FormGroup} from "@angular/forms";
import {ServiceService} from "../service/service.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  id!: number;
  books: Book[] = [];
  formBook!: FormGroup;
  formEdit!: FormGroup;


  constructor(private userServiceService: ServiceService, private activerouter: ActivatedRoute) {
    // // this.userList = userServiceService.userList
    // this.activerouter.paramMap.subscribe((pramMap: ParamMap) => {
    //   this.id = Number(<string>pramMap.get('id'))
    //   this.showOnlyOne()
    // })
  }

  book = new Book(0, "", "","");
  ngOnInit(): void {
    this.formBook = new FormGroup({
      id: new FormControl(0),
      title: new FormControl(""),
      author: new FormControl(""),
      description: new FormControl(),

    })
    this.formEdit = new FormGroup({
      id: new FormControl(this.book.id),
      title: new FormControl(this.book.title),
      author: new FormControl(this.book.author),
      description: new FormControl(this.book.description),

    })
    this.showAll()

  }
  showAll(){
    this.userServiceService.findAll().subscribe(data =>
      this.books = data)
  }

  showOnlyOne(book: Book){
    // this.userServiceService.detail(this.id).subscribe(data => {
    //   this.user = data,
    this.formEdit.controls['id']?.setValue(book.id),
      this.formEdit.controls['name']?.setValue(book.title),
      this.formEdit.controls['description']?.setValue(book.description),
      this.formEdit.controls['img']?.setValue(book.author)
    // })
  }
  editUser(){
    this.userServiceService.edit(this.formEdit.value).subscribe(() =>
      this.showAll(),
    )
  }
  delete(id: number){
    this.userServiceService.delete(id).subscribe(()=> this.showAll())

  }
  createBook(){
    this.userServiceService.create(this.formBook.value).subscribe(() => this.showAll());
  }

  // showEdit(dai:User) {
  //   this.userServiceService.detail(dai.id).subscribe(data =>{
  //     this.user =data
  //   })
  // }
}
