import { Component, OnInit } from '@angular/core';  // تم إضافة OnInit
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // إضافة HttpClientModule هنا
import { TraderDashboardService } from '../../Services/trader-dashboard.service';  // استيراد TraderDashboardService

@Component({
  selector: 'app-trader-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './trader-dashboard.component.html',
  styleUrls: ['./trader-dashboard.component.css'],
})
export class TraderDashboardComponent implements OnInit {

  // البيانات الأساسية للكروت
  cards = [
    { title: 'جديد', count: 0, route: '/new-orders' },
    { title: 'قيد الانتظار', count: 0, route: '/pending-orders' },
    { title: 'تم التسليم للمندوب', count: 0, route: '/delivered-agent' },
    { title: 'تم التسليم', count: 0, route: '/delivered' },
    { title: 'لا يمكن الوصول', count: 0, route: '/unreachable-orders' },
    { title: 'تم التأجيل', count: 0, route: '/delayed-orders' },
    { title: 'تم التسليم جزئيًا', count: 0, route: '/partial-delivery' },
    { title: 'تم الإلغاء من قبل المستلم', count: 0, route: '/cancelled-orders' },
    { title: 'تم الرفض مع الدفع', count: 0, route: '/rejected-paid' },
    { title: 'رفض مع سداد جزء', count: 0, route: '/rejected-partial' },
    { title: 'رفض ولم يتم الدفع', count: 0, route: '/rejected-unpaid' },
  ];

  constructor(private router: Router, private traderDashboardService: TraderDashboardService) {}

  ngOnInit() {
    this.loadOrderCounts();  // استدعاء دالة تحميل البيانات عند تهيئة الـ component
  }

  // جلب الأرقام الديناميكية من الخدمة وتحديث الكروت
  loadOrderCounts() {
    this.traderDashboardService.getOrderCounts().subscribe(data => {
      this.cards = this.cards.map(card => ({
        ...card,
        count: data[card.route] || card.count  // تحديث كل بطاقة بالعدد الصحيح أو القيمة الأصلية إذا لم يوجد
      }));
    });
  }

  // وظيفة عند النقر على البطاقة
  onCardClick(route: string) {
    this.router.navigate([route]);  // التنقل إلى الصفحة المحددة
  }
}
