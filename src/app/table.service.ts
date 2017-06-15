import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class TableService {

  //public tableList = []; // for JSON DATA
  public tableList: Array<Table> = []; //list to store table objects
  

  constructor(public http: Http) { 
    this.getList();
    console.log(this.tableList);
  }

  addTable(num: number){
    //this.table.push(new Table (num));
  }


  getTable(){
    //return this.table;
  }

  getList(){
    var eventData: any = this.http.get('http://kiemsi-khatmau.000webhostapp.com/api/product/test.php');
    eventData.subscribe(info => {
                  let response = JSON.parse(info._body);
                  for(var item in response){
                    //console.log(response[item].id);
                    var id = response[item].id;
                    var active2 = response[item].active;
                    //not yet pass in the menu object
                    this.tableList.push(new Table(id,active2));
                  }
                  console.log(response);
            });
  }

}

//class for a Table
class Table {
  tableNo: number;
  isActive: boolean;
  menuList: Menu;
  
  constructor(num, active){
    this.tableNo = num;
    if(active == 0) this.isActive = false;
    else this.isActive = true;
  }
}

//class for a Menu, storing list of Items
class Menu{
  list: Array<Item> = [];
}


//class for single Item
class Item{
  itemName: string;
  itemPrice: number;
  itemId: number;
}