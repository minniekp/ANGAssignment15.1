import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-todos-detail',
  templateUrl: './todos-detail.component.html',
  styleUrls: ['./todos-detail.component.css']
})
export class TodosDetailComponent implements OnInit {

  id: number;
  private sub: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
