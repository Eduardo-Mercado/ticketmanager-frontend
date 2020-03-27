import { Time } from '@angular/common';

export class Ticket {
  idTicket: number;
  idPriority: number;
  idCustomer: number;
  idBusinessAgent: number;
  subject: string;
  body: string;
  idCompany: number;
  idTaskBranch: number;
}

export class TicketIndex {
  idTicket: number;
  priority: string;
  customer: string;
  company: string;
  businessAgent: string;
  subject: string;
  statusTask: string;
}

export class TicketFile {
  type: string;
  img: string;
  name: string;
  UploadFile: File;
  id: number;
}

export class TicketAgent {
  customer: string;
  profile: string;
  company: string;
  position: string;
  subject: string;
  priority: number;
  dateT: Date;
  timeT: Time;
  body: string;
  cssClass: string;
  idTicket: number;
}
