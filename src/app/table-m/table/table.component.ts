import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../helper/models/user';
import { UserService } from '../helper/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserFormComponent } from '../user-form/user-form.component';
import { BehaviorSubject } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';

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


  loadUsers() {
    console.log('load users');
    this.getUsers();
  }

  addUser() {
    this.modalService.create({
      nzTitle: 'Add User',
      nzContent: UserFormComponent,
      nzData: { isEdit: false },
    });
  }

  editUser(user: User) {
    console.log('edit user', user);
    this.modalService.create({
      nzTitle: 'Edit User',
      nzContent: UserFormComponent,
      nzData: { user, isEdit: true },
    });
  }

  deleteUser(user: User) {
    console.log('delete user', user);
    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        this.message.success('User deleted successfully');
        this.getUsers();
      },
      error: () => {
        this.message.error('An error occurred');
      }
    });
  }

  onPageChange(pageIndex: number) {
    this.pageIndex = pageIndex;
  }
}
