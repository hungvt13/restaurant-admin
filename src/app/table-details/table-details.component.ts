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
  private sub: any;
  tableService:any;
  uniqueMenuList: any;

  stringPrice: string

  isHighlight: any = [];

  constructor(private route: ActivatedRoute, tableService: TableService) {
    this.tableService = tableService;

   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
       this.tableService.addMenuList(this.id);
       this.uniqueMenuList = this.tableService.getMenuList(this.id);

    }); 
    //initiate array for storing highlights
    for(var item in this.tableService.menuList){
         //console.log(item);
         this.isHighlight.push("");
    } 
  }

  ngDoCheck(){
    //console.log(this.uniqueMenuList);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private increaseClick(item,index){
    //get the specific object and increase the quantity
    this.uniqueMenuList.filter(x => x == item)[0].itemQuantity += 1;
    
    //calculate total price
    let totalPrice = 0;
    totalPrice = parseInt(this.uniqueMenuList.filter(x => x == item)[0].itemPrice);
    this.tableService.addMenuListTotalPrice(this.id,totalPrice);

    this.stringPrice = this.tableService.getMenuListTotalPrice(this.id);

    //put the highlight index 
    this.isHighlight[index] = "success";
  }


  private decreaseClick(item,index){

    //limit not below 0
    if(this.uniqueMenuList.filter(x => x == item)[0].itemQuantity > 0){
       this.uniqueMenuList.filter(x => x == item)[0].itemQuantity -= 1;

       let totalPrice = 0;
       totalPrice = parseInt(this.uniqueMenuList.filter(x => x == item)[0].itemPrice);
       this.tableService.subMenuListTotalPrice(this.id,totalPrice);

       this.stringPrice = this.tableService.getMenuListTotalPrice(this.id);

       //put the highlight index 
    }
    if(this.uniqueMenuList.filter(x => x == item)[0].itemQuantity == 0) this.isHighlight[index] = "";
  }

  public cancelTable(){
    var table = new Object;
    table['tableNo']= String(this.id);
    table['isActive'] = 0;

    this.tableService.tableStatus(table).subscribe(
      suc => {
        //console.log(JSON.stringify(suc.message));
        console.log(JSON.stringify(suc.message));
      },
      err => {console.log(err);}
    );
    this.tableService.refreshTableListService();
  }
}
