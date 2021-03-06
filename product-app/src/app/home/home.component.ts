import { Component, OnInit } from '@angular/core';
import { LikeService, Message } from "../shared/like.service";

import "rxjs/add/operator/filter";
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[
   // LikeService
  ]
})
export class HomeComponent implements OnInit {

  homeLikes: number = 1000;
  subscription:Subscription;
  handle:any;

  constructor(private likeService:LikeService) {
     console.log("Home componented created");
  }

  ngOnInit() {

      //getter
      this.homeLikes = this.likeService.homeLikes;


      this.subscription = this.likeService.likeSubject
      .filter ((message: Message) => message.type == 'Home')
      .subscribe( (message: Message) => {
        this.homeLikes = message.likes;
        console.log("home subscribed");
      })

     this.handle =  setInterval( ()=> {
          //setter
          this.likeService.homeLikes += 10;
       
          console.log(this.likeService.homeLikes)
      }, 3000);

  }

  ngOnDestroy(){
    console.log("Home destroyed");
clearInterval(this.handle);// stop timer
this.subscription.unsubscribe();
  }

}
