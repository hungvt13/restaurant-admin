import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-manage',
  templateUrl: './menu-manage.component.html',
  styleUrls: ['./menu-manage.component.css']
})
export class MenuManageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
