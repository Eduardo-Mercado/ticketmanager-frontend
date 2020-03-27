import { Component, OnInit } from '@angular/core';
import { TicketAgent, TicketFile } from 'src/app/core/models/ticket-manager/ticket.model';
import { TicketService } from 'src/app/core/services/task-manager/ticket.service';
import { IconFile } from 'src/app/core/helpers/IconFile';

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
  constructor(private service: TicketService) { }

  ngOnInit() {
    this.service.getTicketsByAgent(0).subscribe((data: TicketAgent[]) => {
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
}
