import { Injectable } from '@angular/core';

@Injectable()
export class TableService {

  public tableList = []; // for JSON DATA
  public table: Array<Table> = []; //list to store table objects 

  constructor() { 
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

}

class Table {
  tableNo: number;
  
  constructor(tableNo: number){
    this.tableNo = tableNo;
  }
}