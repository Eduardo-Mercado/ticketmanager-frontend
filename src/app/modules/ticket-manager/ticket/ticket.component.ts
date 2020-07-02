import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Ticket, TicketIndex, TicketFile, TicketAgent } from 'src/app/core/models/ticket-manager/ticket.model';
import { TicketService  } from 'src/app/core/services/task-manager/ticket.service';
import { Dropdown } from 'src/app/core/models/dropdown.model';
import { DropdownService } from 'src/app/core/services/dropdown.service';

import { AngularEditorConfig } from '@kolkov/angular-editor';
import { HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IconFile } from 'src/app/core/helpers/IconFile';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  isready: boolean;
  submitted: boolean;
  nVista: number;
  Columns: string[] = ['company', 'customer', 'businessAgent', 'subject', 'statusTask', 'priority', 'idTicket'];
  source = new MatTableDataSource<TicketIndex>();
  ticketForm: FormGroup;
  ticketRecord: Ticket;
  ticketSelected: TicketAgent;
  action = '';
  listTickets: TicketIndex[] = [];
  listAgent: Dropdown[] = [];
  listCustomer: Dropdown[] = [];
  listCompany: Dropdown[] = [];
  listPriority: Dropdown[] = [];
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '16em',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};
   files: TicketFile[] = [];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;

  constructor(private service: TicketService, private dropdownServ: DropdownService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.isready = false;
    this.nVista = 0;
    this.ticketRecord = new Ticket();
    this.ticketForm = this.formBuilder.group({
      subject: ['', Validators.required],
      body: ['', Validators.required],
      idCustomer: ['', Validators.required],
      idAgent: ['', Validators.required],
      idPriority: ['', Validators.required]
    });
    this.loadSource();
  }

  private loadSource() {
    this.service.getTickets().subscribe((data: TicketIndex[]) => {
      this.listTickets = data as TicketIndex[];
      this.source.data = this.listTickets;
      this.source.sort = this.sort;
      setTimeout(() =>  this.source.paginator = this.paginator);
      this.dropdownServ.getDropdownByTable('businessAgent').subscribe(( agents: Dropdown[]) => {
        this.listAgent = agents as Dropdown[];
        this.dropdownServ.getDropdownByTable('company').subscribe((companys: Dropdown[]) => {
          this.listCompany = companys as Dropdown[];
          this.dropdownServ.getDropdownByTable('priorityStatus').subscribe((prioritys: Dropdown[]) => {
            this.listPriority = prioritys as Dropdown[];
          });
        });
      });

    });

  }

  public doFilter = (value: string) => {
    this.source.filter = value.trim().toLocaleLowerCase();
  }

  public filterCustomer(id: number) {
   this.dropdownServ.getDropDownByTable_Filter('Customer', id).subscribe((data: Dropdown[]) => {
      this.listCustomer = data as Dropdown[];
   });

  }

  public onSubmit() {
    this.submitted = true;
    this.ticketRecord.subject = this.ticketForm.controls.subject.value;
    this.ticketRecord.body = this.ticketForm.controls.body.value;
    this.ticketRecord.idBusinessAgent = this.ticketForm.controls.idAgent.value;
    this.ticketRecord.idCustomer = this.ticketForm.controls.idCustomer.value;
    this.ticketRecord.idPriority = this.ticketForm.controls.idPriority.value;

    if ( this.ticketRecord.idTicket === 0) {

      this.service.create(this.ticketRecord).subscribe((data: TicketIndex) => {
        this.listTickets.push(data);
        this.ticketRecord.idTicket = data[0].idTicket;
        this.uploadFiles();
        this.source.data = this.listTickets;
        this.onReset();
      });
    } else {
      this.service.update(this.ticketRecord).subscribe((data: TicketIndex) => {
        this.listTickets.map((item, i) => {
          if (item.idTicket === data.idTicket) {
            this.listTickets[i] = data;
          }
        });
        this.uploadFiles();
        this.source.data = this.listTickets;
        this.onReset();
      });
    }
  }

  private uploadFiles() {
    if (this.files.length > 0 ) {
      this.files.forEach(element => {
        const formData = new FormData();
        formData.append('name', element.name);
        formData.append('type', element.type);
        formData.append('idTicket', this.ticketRecord.idTicket.toString());
        formData.append('fileUpload',  element.UploadFile);
        formData.append('isResolved', '0');
        this.service.uploadFiles(formData).subscribe(
          event => {
            if ( event.type === HttpEventType.UploadProgress) {
            } else if ( event.type === HttpEventType.Response) {
              let response: any;
              response = event.body;
            }
          }
        );
      });
    }
  }

  public add(id: string) {
    this.action = 'Create Ticket';
    this.ticketRecord.idTicket = 0;
    this.nVista = 1;
  }

  public delete(id: number,  i: number) {
    this.service.delete(id).subscribe(
      (data: boolean) => {
        if (data) {
          this.listTickets.splice(i, 1);
          this.source.data = this.listTickets;
        }
        }
    );
  }

  public edit(id: number) {
    this.isready = false;
    this.files = [];
    this.service.getTicketWithFile(id).subscribe( res => {
       this.ticketRecord.idTicket = id;
       const data = res[1];

       this.ticketForm.setValue({
                                  subject: data[0].subject,
                                  body: data[0].body,
                                  idAgent: data[0].idBusinessAgent,
                                  idCustomer: data[0].idCustomer,
                                  idPriority: data[0].idPriority
                                });

       this.filterCustomer(data[0].idCompany);
       this.isready = true;
       const fils = res[0];
       if (fils.length > 0 ) {

         fils.forEach( element => {
           const temp = new TicketFile();
           temp.type = element.type;
           temp.name = element.name;
           temp.id = element.id;
           temp.img =  new IconFile().getIconForTypeFile(element.type);
           if (temp.img === '-1') {
             temp.img = element.img;
            }
           this.files.push(temp);
          });
        } else {
          this.files = [];
        }

       this.action = 'Update Ticket';
       this.nVista = 1;
    });

  }

  public  onReset() {
    this.action = '';
    this.ticketForm.reset();
    this.ticketRecord = new Ticket();
    this.nVista = 0;
  }

  public onSelectFile(event) {
    const filesAmount = event.target.files.length;

    for (let i = 0; i < filesAmount; i++) {
                const reader = new FileReader();
                const temp = new TicketFile();
                temp.type = event.target.files[i].type;
                temp.name = event.target.files[i].name;
                temp.UploadFile = event.target.files[i];

                temp.img = new IconFile().getIconForTypeFile(temp.type);
                if (temp.img === '-1') {

                  reader.readAsDataURL(event.target.files[i]);
                  reader.onload = ( event : any) => {
                    temp.img =  event.target.result;
                  };

                }

                this.files.push( temp );
        }
  }

  public composeMail(id: number) {
    this.action = 'Close Ticket';
    this.service.getTicketAgentByIdTicket(id).subscribe((data: TicketAgent) => {
      this.nVista = 2;
      this.ticketSelected = data;
    });
  }
}
