import { Component, OnInit } from '@angular/core';
import { TicketAgent, TicketFile, TicketResolved } from 'src/app/core/models/ticket-manager/ticket.model';
import { TicketService } from 'src/app/core/services/task-manager/ticket.service';
import { IconFile } from 'src/app/core/helpers/IconFile';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { HttpEventType } from '@angular/common/http';
import { UserService } from 'src/app/core/services/security/user.service';

import { HostListener } from '@angular/core';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.scss']
})
export class TicketViewComponent implements OnInit {

  listTickets: TicketAgent[] = [];
  listFiles: TicketFile[] = [];
  ticketSelected: TicketAgent;
  isready = false;
  showDetail: boolean;
  nvista: number;
  files: TicketFile[] = [];
  ticketResolve: TicketResolved;
  resolve = '';

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

nanosliderCss = {
  height: '147px',
  transform: 'translate(0px,0px)',
  transition: 'transform 1s'
};

  constructor(private service: TicketService, private userService: UserService) { }
  userInfo;
  ngOnInit() {
    this.userInfo =  this.userService.getCurrentUser();
    this.nvista = 0;
    this.service.getTicketsByAgent(this.userInfo.id).subscribe((data: TicketAgent[]) => {
      this.listTickets = data;
      this.listTickets.forEach(element => {
        switch (element.priority){
          case 1:
             element.cssClass = 'block-red';
             break;
            case 2:
              element.cssClass = 'block-orange';
              break;
            default:
              element.cssClass = 'block-green';
              break;
        }
      });
      this.showDetail = false;
      this.isready = true;
    });
  }

  getInformationTicket(index: number) {
    this.showDetail = false;
    this.listTickets.forEach(element => {
      switch (element.priority){
        case 1:
           element.cssClass = 'block-red';
           break;
          case 2:
            element.cssClass = 'block-orange';
            break;
          default:
            element.cssClass = 'block-green';
            break;
      }
    });

    this.listTickets[index].cssClass = this.listTickets[index].cssClass + ' block-selected';
    this.ticketSelected = this.listTickets[index];
    this.service.getFile(this.ticketSelected.idTicket).subscribe((data: TicketFile[]) => {
      this.listFiles = data;

      this.listFiles.forEach( element => {
        element.img = new IconFile().getIconForTypeFile(element.type);
      });
    });
    this.showDetail = true;
  }

  resolution() {
    this.nvista = 1;

  }
  onBack() {
    this.nvista = 0;
  }

  public onSelectFile(event) {
    const filesAmount = event.target.files.length;

    for (let i = 0; i < filesAmount; i++) {
                const reader = new FileReader();
              //
              // event.target.result
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

  downloadFile(id: number) {
    this.service.downloadFile(id);
  }

  ResolveTicket() {
    if (this.resolve.length === 0) {
      alert('Should describe resolution');
    }
    this.ticketResolve = new TicketResolved();
    this.ticketResolve.description = this.resolve;
    this.ticketResolve.idAgent =  this.userInfo.id;
    this.ticketResolve.idTicket = this.ticketSelected.idTicket;
    this.service.resolveTicket(this.ticketResolve).subscribe((data: boolean) => {
        if ( data) {
          this.ngOnInit();
        } else {
          alert('there is something wrong :(');
        }
    });
  }

  private uploadFiles() {
    if (this.files.length > 0 ) {
      this.files.forEach(element => {
        const formData = new FormData();
        formData.append('name', element.name);
        formData.append('type', element.type);
        formData.append('idTicket', this.ticketSelected.idTicket.toString());
        formData.append('fileUpload',  element.UploadFile);
        formData.append('isResolved', '1');
        this.service.uploadFiles(formData).subscribe(
          event => {
            if ( event.type === HttpEventType.UploadProgress) {
            // this.fileUpload = Math.round((event.loaded / event.total) * 100);
            } else if ( event.type === HttpEventType.Response) {
              let response: any;
              response = event.body;
            }
          }
        );
      });
    }
  }

  @HostListener('scroll', ['$event'])
      scrollHandler($event: any) {
        // const scrollOffset = $event.srcElement.scrollTop;
        console.log('scroll: ', $event.target.scrollTop);
        this.nanosliderCss.transform = 'translate(0px,' + $event.target.scrollTop + 'px )';
    }
}
