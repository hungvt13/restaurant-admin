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
  uniqueMenuList: any;

  totalPrice: number;
  stringPrice: string
  totalItem: number;

  constructor(private route: ActivatedRoute, tableService: TableService) {
    this.tableService = tableService;

    this.totalPrice = 0;
    this.totalItem = 0;
    this.stringPrice = '';
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
       this.tableService.addMenuList(this.id);
       this.uniqueMenuList = this.tableService.getMenuList(this.id);
       
    });
       
  }
  /*
  ngDoCheck(){
    for(var item in this.tableService.tableList){
       if(this.tableService.tableList[item].tableNo == this.id){
         if(this.tableService.tableList[item].isActive == false) this.isActive = "trống";
         else this.isActive = "có khách";
         console.log(this.isActive);
       }
    }
  }*/

  ngDoCheck(){
    //console.log(this.uniqueMenuList);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private increaseClick(item){

    this.uniqueMenuList.filter(x => x == item)[0].itemQuantity += 1;

    //calculate total price
    this.totalPrice += parseInt(this.uniqueMenuList.filter(x => x == item)[0].itemPrice);
    this.totalItem += 1;

    //get the string version 
    this.stringPrice = this.numberWithCommas(this.totalPrice);
  }

  //format number to currency 
   private numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  private decreaseClick(item){

    //limit not below 0
    if(this.uniqueMenuList.filter(x => x == item)[0].itemQuantity > 0){
       this.uniqueMenuList.filter(x => x == item)[0].itemQuantity -= 1;
       this.totalPrice -= parseInt(this.uniqueMenuList.filter(x => x == item)[0].itemPrice);
       this.totalItem -= 1;
       this.stringPrice = this.numberWithCommas(this.totalPrice);
    }
  }

}
