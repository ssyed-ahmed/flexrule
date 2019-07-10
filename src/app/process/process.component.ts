import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  dragStart(evt) {
    // alert('drag started')
    console.log(evt.target.id)
    evt.dataTransfer.setData("text/html", evt.target.id);
  }

}
