import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { BusinessAgentService } from 'src/app/core/services/catalog/businessAgent.service';
import { BusinessAgent } from 'src/app/core/models/catalog/businessAgent.model';

@Component({
  selector: 'app-business-agent',
  templateUrl: './business-agent.component.html',
  styleUrls: ['./business-agent.component.scss']
})
export class BusinessAgentComponent implements OnInit {
  isready: boolean;
  submitted: boolean;
  nVista: number;
  Columns: string[] = ['name', 'position', 'email', 'skype', 'phone', 'idBusinessAgent'];
  source = new MatTableDataSource<BusinessAgent>();
  agentForm: FormGroup;
  agentRecord: BusinessAgent;
  actionAgent = '';
  listAgents: BusinessAgent[] = [];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


  constructor(private service: BusinessAgentService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.isready = false;
    this.nVista = 0;
    this.agentRecord = new BusinessAgent();
    this.agentRecord.photo = '';
    this.agentForm = this.formBuilder.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      email: ['', [Validators.required,  Validators.email]],
      skype: ['', Validators.required],
      phone: ['', Validators.required],
      photo: []
    });
    this.loadSource();
  }

  private loadSource() {
    this.service.getBusinessAgents().subscribe((data: BusinessAgent[]) => {
      this.listAgents = data as BusinessAgent[];
      this.source.data = this.listAgents;
      this.source.sort = this.sort;
      setTimeout(() =>  this.source.paginator = this.paginator);
      this.isready = true;
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
        this.agentRecord.photo = event.target.result;

      };
    }
  }

  public add() {
    this.nVista = 1;
    this.actionAgent = 'Add Business Agent';
    this.agentRecord.idBusinessAgent = 0;
    this.submitted = false;
  }

  public onSubmit() {
    this.submitted = true;
    this.agentRecord.email = this.agentForm.controls.email.value;
    this.agentRecord.name = this.agentForm.controls.name.value;
    this.agentRecord.phone = this.agentForm.controls.phone.value;
    this.agentRecord.position = this.agentForm.controls.position.value;
    this.agentRecord.skype = this.agentForm.controls.skype.value;

    if ( this.agentRecord.idBusinessAgent === 0) {
      this.service.create(this.agentRecord).subscribe((data: BusinessAgent) => {
            this.listAgents.push(data);
            this.source.data = this.listAgents;
            this.onReset();
      });
    } else {
      this.service.update(this.agentRecord).subscribe((data: BusinessAgent) => {
        this.listAgents.map((item, i) => {
           if (item.idBusinessAgent === data.idBusinessAgent) {
              this.listAgents[i] = data;
           }
        });
        this.source.data = this.listAgents;
        this.onReset();
      });
    }
   }

  public edit(id: number) {
    this.service.getBusinessAgentById(id).subscribe((data: BusinessAgent) => {
      this.agentRecord.idBusinessAgent = data.idBusinessAgent;
      this.agentForm.setValue({
        name: data.name,
        position: data.position,
        email: data.email,
        skype: data.skype,
        phone: data.phone,
        photo: data.photo
      });
      this.agentRecord.photo = data.photo;
    });
    this.actionAgent = 'Update Business Agent';
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
    this.actionAgent = '';
    this.agentForm.reset();
    this.agentRecord = new BusinessAgent();
  }
}
