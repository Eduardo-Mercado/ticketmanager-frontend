import { Component, OnInit } from '@angular/core';
import { Calendar } from 'src/app/core/models/dashboard/calendar.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  calendar: Calendar[] = [];
  labelCalendar = '';
  currentDay = new Date();
  private monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

  constructor() { }

  ngOnInit() {
    this.LoadCurrentMonth();
  }

  private LoadCurrentMonth() {
   // const currentDay = new Date();
    this.currentDay.setHours(0, 0, 0, 0);
    this.BuildCalendar(this.currentDay);
  }

  private BuildCalendar(workDate: Date) {
    this.calendar = [];
    const firstDay = new Date(workDate.getFullYear(), workDate.getMonth(), 1);
    const lastDay = new Date(workDate.getFullYear(), workDate.getMonth() + 1, 0);

    this.labelCalendar = this.monthNames[firstDay.getMonth()] + ' ' + firstDay.getFullYear();

    const daysLastMonth = firstDay.getDay();

    firstDay.setHours(0, 0, 0, 0);

    for (let index = daysLastMonth; index > 0; index--) {
      this.calendar.push({
        id: index + 1,
        date: new Date(firstDay.getFullYear(), firstDay.getMonth(), (firstDay.getDate() - index )),
        nameCssClass: 'outMonth', nWeek: 1
      });

    }

    this.calendar.push({
      id: firstDay.getDay() + 1, date: firstDay,
      nameCssClass: (firstDay.toLocaleDateString() === this.currentDay.toLocaleDateString()) ? 'current' : '', nWeek: 1
    });

    for (let index = 1; index < lastDay.getDate(); index++) {
      const temp = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + index);

      this.calendar.push({
        id: (index + 1) + daysLastMonth,
        date: temp,
        nameCssClass: (temp.toLocaleDateString() === this.currentDay.toLocaleDateString()) ? 'current' : '', nWeek: 1
      });
    }

    if (this.calendar.length < 42) {
      let index = 1;
      do {
        this.calendar.push({
          id: (index + 1) + daysLastMonth,
          date: new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate() + index),
          nameCssClass: 'outMonth', nWeek: 1
        });
        index++;
      } while (this.calendar.length < 42);
    }
  }

  public NextMonth_Event() {
    const nextMonth = this.calendar[this.calendar.length - 1 ].date;
    this.BuildCalendar( new Date(nextMonth.getFullYear(), nextMonth.getMonth() , 1));
  }

  public PreviewMonth_Event() {
    let previewMonth = this.calendar[0].date;
    if (this.calendar[0].nameCssClass !== 'outMonth') {
      previewMonth = new Date(previewMonth.getFullYear(), previewMonth.getMonth()  - 1, 1);
    }

    this.BuildCalendar(previewMonth);
  }

  public Today_Event() {
    this.BuildCalendar( this.currentDay);
  }

 public CurrentMonth_Event() {
    this.BuildCalendar( this.currentDay);
  }

  public LastMonth_Event() {
    const lastMonth =  new Date(this.currentDay.getFullYear(), this.currentDay.getMonth()  - 1, 1);
    this.BuildCalendar( lastMonth);
  }
}

