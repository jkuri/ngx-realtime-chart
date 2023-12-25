import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixGithubLogo } from '@ng-icons/radix-icons';
import { NgxRealtimeChartModule, RealtimeChartData, RealtimeChartOptions } from 'ngx-realtime-chart';
import { Subscription, concatMap, delay, of, timer } from 'rxjs';
import { ConfigEditorComponent } from './components/config-editor/config-editor.component';
import { DataService } from './shared/providers/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgxRealtimeChartModule, ConfigEditorComponent, NgIconComponent],
  templateUrl: './app.component.html',
  providers: [provideIcons({ radixGithubLogo })]
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly dataService = inject(DataService);

  color = '#09090B';
  timeSlots = 60;
  options: RealtimeChartOptions = {
    height: 200,
    margin: { left: 40, top: 20, bottom: 30, right: 10 },
    fps: 30,
    timeSlots: this.timeSlots,
    xGrid: {
      tickPadding: 15,
      tickNumber: 10,
      tickFontSize: 10,
      tickFontWeight: 'normal',
      tickFontColor: this.color,
      color: this.color,
      opacity: 0.05
    },
    yGrid: {
      min: 0,
      max: 100,
      color: this.color,
      opacity: 0.05,
      tickNumber: 4,
      tickFormat: (v: string | number) => `${v}%`,
      tickPadding: 20,
      tickFontWeight: 'normal',
      tickFontColor: this.color,
      tickFontSize: 10
    },
    lines: [
      {
        color: this.color,
        lineWidth: 2,
        opacity: 1,
        area: true,
        areaColor: this.color,
        areaOpacity: 0.02,
        curve: 'basis'
      }
    ]
  };
  data: RealtimeChartData[][] = [[]];
  sub = new Subscription();

  ngOnInit(): void {
    this.data = [[...this.dataService.generateRandomRealtimeData(120, 1, 10, 90)]];
    this.sub = timer(0, 1000)
      .pipe(concatMap(i => of(i).pipe(delay(this.dataService.randomInt(1000, 5000)))))
      .subscribe(() => {
        this.data[0].push({ date: new Date(), value: this.dataService.randomInt(10, 90) });
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onOptionsUpdated(options: RealtimeChartOptions): void {
    this.options = { ...options };
  }
}
