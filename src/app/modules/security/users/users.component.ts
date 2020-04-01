import { Component, OnInit, ViewChild  } from '@angular/core';
import { User, UserItem } from 'src/app/core/models/security/user.model';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { ModalService } from 'src/app/shared/modal-popup/modal.service';
import { UserService } from 'src/app/core/services/security/user.service';
import { Dropdown } from 'src/app/core/models/dropdown.model';
import { DropdownService } from 'src/app/core/services/dropdown.service';
import { MustMatch } from 'src/app/core/helpers/must-match';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  isready: boolean;
  submitted: boolean;
  nVista: number;
  Columns: string[] = ['userName', 'Rol', 'Agent', 'id'];
  source = new MatTableDataSource<UserItem>();
  userForm: FormGroup;
  userRecord: User;
  action = 'Add';
  listaUser: UserItem[] = [];
  listAgents: Dropdown[] = [];
  listRols: Dropdown[] = [];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private service: UserService, private dropdownServ: DropdownService,
              private formBuilder: FormBuilder , private modalService: ModalService) { }

  ngOnInit() {
    this.isready = false;
    this.nVista = 0;
    this.userRecord = new User();
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      passwd: ['',  [Validators.required, Validators.minLength(6)]],
      confirmPasswd: ['', Validators.required],
      idRol: ['', Validators.required],
      idAgent: ['', Validators.required]
    }, {
      validator: MustMatch('passwd', 'confirmPasswd')
  });

    this.loadSource();
  }

  private loadSource() {
    this.service.getUsers().subscribe((data: UserItem[]) => {
      this.listaUser = data as UserItem[];
      this.source.data = this.listaUser;
      this.source.sort = this.sort;
      setTimeout(() =>  this.source.paginator = this.paginator);
      this.isready = true;
    });

    this.dropdownServ.getDropdownByTable('businessAgent').subscribe((data: Dropdown[]) => {
      this.listAgents = data as Dropdown[];
    });

    this.dropdownServ.getDropdownByTable('rols').subscribe((data: Dropdown[]) => {
      this.listRols = data as Dropdown[];
    });
  }

  public doFilter = (value: string) => {
    this.source.filter = value.trim().toLocaleLowerCase();
  }

  public onSubmit() {
    this.submitted = true;
    this.userRecord.userName = this.userForm.controls.username.value;
    this.userRecord.passwd = this.userForm.controls.passwd.value;
    this.userRecord.idRol = this.userForm.controls.idRol.value;
    if ( this.userRecord.id === 0) {

      this.service.create(this.userRecord).subscribe((data: UserItem) => {
        this.listaUser.push(data);
        this.source.data = this.listaUser;
        this.onReset('userForm');
      });
    } else {
      this.service.update(this.userRecord).subscribe((data: UserItem) => {
        this.listaUser.map((item, i) => {
          if (item.id === data.id) {
            this.listaUser[i] = data;
          }
        });
        this.source.data = this.listaUser;
        this.onReset('userForm');
      });
    }
  }

  public add(id: string) {
    this.action = 'Add User';
    this.modalService.open(id);
    this.userRecord.id = 0;
  }

  public delete(id: number,  i: number) {
    this.service.delete(id).subscribe(
      (data: boolean) => {
        if (data) {
          this.listaUser.splice(i, 1);
          this.source.data = this.listaUser;
        }
        }
    );
  }

  public edit(form: string, id: number) {
    this.service.getUserById(id).subscribe((data: User) => {
      this.userRecord.id = data.id;
      this.userForm.setValue({
        username : data.userName,
        passwd: data.passwd,
        idRol: data.idRol,
        idAgent: data.IdAgent
      });
      this.action = 'Update User';
      this.modalService.open(form);
    });
   }

  public  onReset(id: string) {
    this.action = '';
    this.modalService.close(id);
    this.userForm.reset();
    this.userRecord = new User();
  }

}
