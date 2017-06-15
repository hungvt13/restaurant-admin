import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableService } from '../table.service';



@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.css']
})
export class TableDetailsComponent implements OnInit {

  id: number;
  isActive: string;
  private sub: any;
  tableService:any;

  constructor(private route: ActivatedRoute, tableService: TableService) {
    this.tableService = tableService;
    
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
    });
  }

  ngDoCheck(){
    for(var item in this.tableService.tableList){
       if(this.tableService.tableList[item].tableNo == this.id){
         if(this.tableService.tableList[item].isActive == false) this.isActive = "trống";
         else this.isActive = "có khách";
         console.log(this.isActive);
       }
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
