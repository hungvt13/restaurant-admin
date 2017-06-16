import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableService } from '../table.service';

@Component({
  selector: 'app-receipt-view',
  templateUrl: './receipt-view.component.html',
  styleUrls: ['./receipt-view.component.css']
})
export class ReceiptViewComponent implements OnInit {

  id: number;
  private sub: any;
  tableService: any;

  receiptItemList: any;
  finalList: any = [];
  finalPrice: number = 0;
  finalItems: number = 0;

  constructor(private route: ActivatedRoute, tableService: TableService) { 
    this.tableService = tableService;
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
    });  
    this.getList();
  }

  ngOnInit() {
    
  }

  getList(){
    try{
          this.receiptItemList = this.tableService.getMenuList(this.id);
          this.finalPrice = this.tableService.getMenuListTotalPrice(this.id);
          this.finalItems = this.tableService.getMenuListTotalItem(this.id);
          //trying to get the list of items with quantity > 0
          for(var item in this.receiptItemList){
            if(this.receiptItemList[item].itemQuantity != 0) this.finalList.push(this.receiptItemList[item]);
          }
       }catch(e) {}
  }

  onClick(){
    console.log(this.finalList);
  }

}
