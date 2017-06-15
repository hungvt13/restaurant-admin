import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class TableService {

  public tableList = []; // for JSON DATA
  public table: Array<Table> = []; //list to store table objects
  

  constructor(public http: Http) { 
    this.table.push(new Table(1));
    this.table.push(new Table(2));
    this.table.push(new Table(3));
    this.table.push(new Table(4));

  }

  addTable(num: number){
    this.table.push(new Table (num));
  }


  getTable(){
    return this.table;
  }

  getList(){
    var eventData: any = this.http.get('http://kiemsi-khatmau.000webhostapp.com/api/product/test.php');
    eventData.subscribe(info => {
                  let response = JSON.parse(info._body);
                  console.log(response);
            });
  }

}

//class for a Table
class Table {
  tableNo: number;
  menuList: Menu;
  
  constructor(tableNo: number){
    this.tableNo = tableNo;
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