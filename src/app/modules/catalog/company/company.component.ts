import { Component, OnInit, ViewChild  } from '@angular/core';
import { Company } from 'src/app/core/models/catalog/company.model';
import { CompanyService } from 'src/app/core/services/catalog/company.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { ModalService } from 'src/app/shared/modal-popup/modal.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  isready: boolean;
  submitted: boolean;
  nVista: number;
  Columns: string[] = ['name', 'idCompany'];
  source = new MatTableDataSource<Company>();
  companyForm: FormGroup;
  companyRecord: Company;
  action = 'Add';
  listaCompany: Company[] = [];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private service: CompanyService, private formBuilder: FormBuilder, private modalService: ModalService) { }

  ngOnInit() {
    this.isready = false;
    this.nVista = 0;
    this.companyRecord = new Company();
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      logo: ['', Validators.required]
    });

    this.loadSource();
  }

  private loadSource() {
    this.service.getCompanies().subscribe((data: Company[]) => {
      this.listaCompany = data as Company[];
      this.source.data = this.listaCompany;
      this.source.sort = this.sort;
      setTimeout(() =>  this.source.paginator = this.paginator);
      this.isready = true;
    });
  }

  public doFilter = (value: string) => {
    this.source.filter = value.trim().toLocaleLowerCase();
  }

  public onSubmit() {
    this.submitted = true;
    this.companyRecord.name = this.companyForm.controls.name.value;
    this.companyRecord.logo = this.companyForm.controls.logo.value;

    if ( this.companyRecord.idCompany === 0) {

      this.service.create(this.companyRecord).subscribe((data: Company) => {
        this.listaCompany.push(data);
        this.source.data = this.listaCompany;
        this.onReset('companyForm');
      });
    } else {
      this.service.update(this.companyRecord).subscribe((data: Company) => {
        this.listaCompany.map((item, i) => {
          if (item.idCompany === data.idCompany) {
            this.listaCompany[i] = data;
          }
        });
        this.source.data = this.listaCompany;
        this.onReset('companyForm');
      });
    }
  }

  public add(id: string) {
    this.action = 'Add Company';
    this.modalService.open(id);
    this.companyRecord.idCompany = 0;
  }

  public delete(id: number,  i: number) {
    this.service.delete(id).subscribe(
      (data: boolean) => {
        if (data) {
          this.listaCompany.splice(i, 1);
          this.source.data = this.listaCompany;
        }
        }
    );
  }

  public edit(form: string, id: number) {
    this.service.getCompaniesById(id).subscribe((data: Company) => {
      this.companyRecord.idCompany = data.idCompany;
      this.companyForm.setValue({
        name: data.name,
        logo: data.logo
      });
      this.action = 'Update Company';
      this.modalService.open(form);
    });
   }

  public  onReset(id: string) {
    this.action = '';
    this.modalService.close(id);
    this.companyForm.reset();
    this.companyRecord = new Company();
  }

}
