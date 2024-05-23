import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../helper/models/user';
import { UserService } from '../helper/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ModalOptions, NzModalService } from 'ng-zorro-antd/modal';
import { UserFormComponent } from '../user-form/user-form.component';
import { BehaviorSubject } from 'rxjs';
import { ModalConfig } from 'ng-zorro-antd/core/config';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Output() userAdded = new EventEmitter<void>();

  users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  pageIndex = 1;

  isAddUserVisible = false;

  constructor(private userService: UserService, private message: NzMessageService, private modalService: NzModalService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = new BehaviorSubject<User[]>(users);
        this.message.success('Users loaded successfully');
      },
      error: () => {
        this.message.error('An error occurred');
      }
    });
  }

  toggleAddUser() {
    this.isAddUserVisible = !this.isAddUserVisible;
  }

  loadUsers() {
    console.log('load users');
    this.getUsers();
  }

  addUser() {
    this.modalService.create({
      nzTitle: 'Add User',
      nzContent: UserFormComponent
    });
  }

  editUser(user: User) {
    console.log('edit user', user);
    this.modalService.create({
      nzTitle: 'Edit User',
      nzContent: UserFormComponent
    }
    );
  }

  onPageChange(pageIndex: number) {
    this.pageIndex = pageIndex;
  }
}
