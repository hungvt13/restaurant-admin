import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class TableService {

  //public tableList = []; // for JSON DATA
  public tableList: Array<Table> = []; //list to store table objects
  public menuList: Array<Item> = []; //list to store table objects
  public instanceMenuList: Array<List> = [];
  

  constructor(public http: Http) { 
    this.getTableListService();
    this.getMenuListService();   
  }
  // get the list of tables available 
  private getTableListService(){
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
                  //console.log(response);
            });            
  }
  // get the list of foods for the menu
  private getMenuListService(){
    var eventData: any = this.http.get('https://kiemsi-khatmau.000webhostapp.com/api/product/test2.php');
    eventData.subscribe(info => {
                  let response = JSON.parse(info._body);
                  for(var item in response){
                    //console.log(response[item].id);
                    var uid = response[item].uid;
                    var name = response[item].name;
                    var price = response[item].price;
                    //not yet pass in the menu object
                    this.menuList.push(new Item(name,price,uid));
                  }
                  //console.log(response);
            });
  }

  //add an instance of menu based on table ID
  public addMenuList(num){

    //clone object arary
    if(this.instanceMenuList.filter(x => x.id == num)[0] != null){
      return;
    }
    let tempList = this.menuList.map(x => Object.assign({}, x));
    this.instanceMenuList.push(new List(num,tempList));

    console.log(this.instanceMenuList);
  }

  public getMenuList(num){
    return this.instanceMenuList.filter(x => x.id == num)[0].list;
  }

  public addMenuListTotalPrice(num, price){
    this.instanceMenuList.filter(x => x.id == num)[0].totalPrice = price;
    console.log(this.instanceMenuList);
  }

  public getMenuListTotalPrice(num){
    return this.instanceMenuList.filter(x => x.id == num)[0].totalPrice;
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
  itemUID: number;
  itemQuantity: number;

  constructor(name, price, UID){
    this.itemName = name;
    this.itemPrice = price;
    this.itemUID = UID;
    this.itemQuantity = 0;
  }
}

class List{
  id: string;
  list: any;
  totalPrice: string;

  constructor(id, list){
    this.id = id;
    this.list = list;
    this.totalPrice = '';
  }
}