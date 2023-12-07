import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NgxRealtimeChartModule, RealtimeChartData, RealtimeChartOptions } from 'ngx-realtime-chart';
import { Subscription, timer } from 'rxjs';
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgxRealtimeChartModule],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly dataService = inject(DataService);

  color = '#3C495A';
  timeSlots = 60;
  options: RealtimeChartOptions = {
    height: 200,
    margin: { left: 40, top: 30, bottom: 30, right: 10 },
    fps: 60,
    timeSlots: this.timeSlots,
    xGrid: {
      tickPadding: 15,
      tickNumber: 10,
      tickFontSize: 10,
      tickFontWeight: 'normal',
      tickFontColor: '#3C495A',
      color: '#E6E6E6',
      opacity: 0.5
    },
    yGrid: {
      min: 0,
      max: 100,
      color: '#E6E6E6',
      opacity: 0.5,
      tickNumber: 4,
      tickFormat: (v: string | number) => `${v}%`,
      tickPadding: 20,
      tickFontWeight: 'normal',
      tickFontColor: '#3C495A',
      tickFontSize: 10
    },
    lines: [{ color: this.color, opacity: 1, area: true, areaColor: this.color, areaOpacity: 0.03, curve: 'basis' }]
  };
  data: RealtimeChartData[][] = [[]];
  sub = new Subscription();

  ngOnInit(): void {
    this.data = [[...this.dataService.generateRandomRealtimeData(120, 1, 10, 90)]];
    this.sub = timer(0, 1000).subscribe(() => {
      this.data[0].push({ date: new Date(), value: this.dataService.randomInt(10, 90) });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
