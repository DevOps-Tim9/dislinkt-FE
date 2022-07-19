import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { interval } from 'rxjs';
import { EventsService } from '../core/services/events.service';

export interface EventModel {
  Message: string;
  Timestamp: string;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: EventModel[] = [];
  dataSource = new MatTableDataSource<EventModel>(this.events);
  displayedColumns: string[] = ['Message', 'Timestamp'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private eventsService: EventsService,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    interval(3000).subscribe((x =>{
      this.getEvents();
    }));
  }

  ngOnInit(): void {
    this.getEvents();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getEvents() {
    this.eventsService.getEvents().subscribe((res: any) => {
      res.forEach(element => {
        const date = new Date(Date.parse(element.Timestamp) + 1000*60*60*4);
        element.Timestamp = date.toISOString().split('.')[0].replace("T", " ");
      });
      this.events = res;
      this.dataSource = new MatTableDataSource<EventModel>(this.events);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
