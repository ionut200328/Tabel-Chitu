import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      age: 25,
      address: 'New York',
      email: 'johndoe@ceva.com'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      age: 22,
      address: 'New York',
      email: 'janedoe@ceva.com'
    },
    {
      id: 3,
      firstName: 'Alice',
      lastName: 'Smith',
      age: 30,
      address: 'London',
      email: 'alice.smith@example.com'
    },
    {
      id: 4,
      firstName: 'Bob',
      lastName: 'Johnson',
      age: 35,
      address: 'Paris',
      email: 'bob.johnson@example.com'
    },
    {
      id: 5,
      firstName: 'Emma',
      lastName: 'Brown',
      age: 28,
      address: 'Berlin',
      email: 'emma.brown@example.com'
    },
    {
      id: 6,
      firstName: 'Michael',
      lastName: 'Davis',
      age: 40,
      address: 'Tokyo',
      email: 'michael.davis@example.com'
    },
    {
      id: 7,
      firstName: 'Olivia',
      lastName: 'Wilson',
      age: 32,
      address: 'Sydney',
      email: 'olivia.wilson@example.com'
    },
    {
      id: 8,
      firstName: 'William',
      lastName: 'Taylor',
      age: 27,
      address: 'Toronto',
      email: 'william.taylor@example.com'
    },
    {
      id: 9,
      firstName: 'Sophia',
      lastName: 'Anderson',
      age: 33,
      address: 'Moscow',
      email: 'sophia.anderson@example.com'
    },
    {
      id: 10,
      firstName: 'James',
      lastName: 'Thomas',
      age: 29,
      address: 'Rome',
      email: 'james.thomas@example.com'
    }
  ]
  constructor() { }

  getUsers(): Observable<User[]> {
    return new Observable((observer) => {
      observer.next(this.users);
      observer.complete();
    });
  }

  addUser(user: User): Observable<User> {
    return new Observable((observer) => {
      this.users.push(user);
      observer.next(user);
      observer.complete();
    });
  }

  editUser(user: User): Observable<User> {
    return new Observable((observer) => {
      const index = this.users.findIndex(u => u.id === user.id);
      this.users[index] = user;
      observer.next(user);
      observer.complete();
    });
  }

  deleteUser(id: number): Observable<number> {
    return new Observable((observer) => {
      const index = this.users.findIndex(u => u.id === id);
      this.users.splice(index, 1);
      observer.next(id);
      observer.complete();
    });
  }
}
