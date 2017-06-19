import { Component, OnInit } from '@angular/core';
import { TableService } from '../table.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {

  private tableService;

  constructor(tableService: TableService, private router: Router, private route: ActivatedRoute) { 
    this.tableService = tableService;
  }

  ngOnInit() {

  }

  private deleteItem(item){
    this.tableService.deleteProduct(item).subscribe(x =>{
      console.log(JSON.stringify(x));
      this.tableService.refreshMenuListService();
      //alert(JSON.stringify(x));
      //this.route.navigate(['/menu-manage']);
    });
  }

  private editClick(item){
    this.tableService.setSingleItem(item);
  }

}
