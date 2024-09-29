import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { statusTranslations } from '../../Models/Order.interface';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-trader-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './trader-dashboard.component.html',
  styleUrls: ['./trader-dashboard.component.css'],
})
export class TraderDashboardComponent implements OnInit {
  cards: any = Object.values(statusTranslations).map((status: any) => {
    return {
      title: status,
      count: 0,
    };
  });

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:5298/Dashboard').subscribe({
      next: (data: any) => {
        console.log(data);
        data = data.map((item: any) => {
          return {
            ...item,
            statusName: statusTranslations[item.statusName] || item.statusName,
          };
        });
        data.forEach((item: any) => {
          this.cards = this.cards.map((card: any) => {
            if (card.title === item.statusName) {
              card.count++;
            }
            return card;
          });
        });
        console.log(data);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
