import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-searched-users',
  templateUrl: './searched-users.component.html',
  styleUrls: ['./searched-users.component.scss']
})
export class SearchedUsersComponent implements OnInit {

  @Input()
  users: any[] = [];

  @Output()
  selectedUser: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
