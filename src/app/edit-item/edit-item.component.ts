import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableService } from '../table.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  id: number;
  private sub: any;
  tableService: any;

  private form: FormGroup;
  private itemName;
  private itemPrice;
  private itemUID;
  public mess;
  

  constructor(public fb: FormBuilder, private route: ActivatedRoute, private router: Router, tableService: TableService) {
    this.tableService = tableService;

    this.form = this.fb.group({
      itemName: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
      itemPrice: ['', Validators.compose([Validators.required, Validators.pattern('[0-9,]*')])],
    });

      try{
        this.itemName = this.tableService.singleItem.itemName;
        this.itemPrice = this.tableService.singleItem.itemPrice;
        this.itemUID = this.tableService.singleItem.itemUID;
      }catch(e){};


   }

   private onSubmit(item: any): void {
    console.log('Reactive Form Data: ');
    item['itemUID'] = this.itemUID;
    console.log(item);
    //Adds item information to the databse

    this.tableService.updateProduct(item).subscribe(
      suc => {
        //console.log(JSON.stringify(suc.message));
        this.mess = JSON.stringify(suc.message);
        this.tableService.refreshMenuListService();
      },
      err => {console.log(err);}
    );
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
    }); 
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
