import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CustomerService } from 'src/app/core/services/catalog/customer.service';
import { DropdownService } from 'src/app/core/services/dropdown.service';
import { Customer } from 'src/app/core/models/catalog/customer.model';
import { Dropdown } from 'src/app/core/models/dropdown.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  isready: boolean;
  submitted: boolean;
  nVista: number;
  Columns: string[] = ['name', 'position', 'email', 'skype', 'phone', 'company', 'idCustomer'];
  source = new MatTableDataSource<Customer>();
  customerForm: FormGroup;
  customerRecord: Customer;
  actionCustomer = '';
  listAgents: Customer[] = [];
  listCompany: Dropdown[] = [];


  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


  constructor(private service: CustomerService, private dropdownServ: DropdownService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.isready = false;
    this.nVista = 0;
    this.customerRecord = new Customer();
    this.customerRecord.photo = '';
    this.customerForm = this.formBuilder.group({
      idCompany: ['', Validators.required],
      name: ['', Validators.required],
      position: ['', Validators.required],
      email: ['', [Validators.required,  Validators.email]],
      skype: ['', Validators.required],
      phone: ['', Validators.required],
      photo: ['', Validators.required]
    });
    this.loadSource();
  }

  private loadSource() {
    this.service.getCustomers().subscribe((data: Customer[]) => {
      this.listAgents = data as Customer[];
      this.source.data = this.listAgents;
      this.source.sort = this.sort;
      setTimeout(() =>  this.source.paginator = this.paginator);
      this.isready = true;
      this.dropdownServ.getDropdownByTable('company').subscribe((data: Dropdown[]) => {
          this.listCompany = data as Dropdown[];
      });
    });

  }

  public doFilter = (value: string) => {
    this.source.filter = value.trim().toLocaleLowerCase();
  }


  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader: FileReader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = ( event : any) => { // called once readAsDataURL is completed
        this.customerRecord.photo = event.target.result;

      };
    }
  }

  public add() {
    this.nVista = 1;
    this.actionCustomer = 'Add Business Agent';
    this.customerRecord.idCustomer = 0;
    this.submitted = false;
  }

  public onSubmit() {
    this.submitted = true;
    this.customerRecord.email = this.customerForm.controls.email.value;
    this.customerRecord.name = this.customerForm.controls.name.value;
    this.customerRecord.phone = this.customerForm.controls.phone.value;
    this.customerRecord.position = this.customerForm.controls.position.value;
    this.customerRecord.skype = this.customerForm.controls.skype.value;
    this.customerRecord.idCompany = this.customerForm.controls.idCompany.value;


    if ( this.customerRecord.idCustomer === 0) {
      this.service.create(this.customerRecord).subscribe((data: Customer) => {
            this.listAgents.push(data);
            this.source.data = this.listAgents;
            this.onReset();
      });
    } else {
      this.service.update(this.customerRecord).subscribe((data: Customer) => {
        this.listAgents.map((item, i) => {
           if (item.idCustomer === data.idCustomer) {
              this.listAgents[i] = data;
              this.listAgents[i].companyName = data.companyName;
           }
        });
        this.source.data = this.listAgents;
        this.onReset();
      });
    }
   }

  public edit(id: number) {
    this.service.getCustomerById(id).subscribe((data: Customer) => {
      this.customerRecord.idCustomer = data.idCustomer;

      if (data.photo === undefined) {
       data.photo = '';
     }

      this.customerForm.setValue({
        name: data.name,
        position: data.position,
        email: data.email,
        skype: data.skype,
        phone: data.phone,
        idCompany: data.idCompany,
        photo: data.photo
      });
      this.customerRecord.photo =  data.photo;
    });
    this.actionCustomer = 'Update Business Agent';
    this.nVista = 1;
  }

  public delete(id: number, index: number) {
    this.service.delete(id).subscribe((data: boolean) => {
        this.listAgents.splice(index, 1);
        this.source.data = this.listAgents;
    });
  }

  public onReset() {
    this.nVista = 0;
    this.actionCustomer = '';
    this.customerForm.reset();
    this.customerRecord = new Customer();
  }
}
