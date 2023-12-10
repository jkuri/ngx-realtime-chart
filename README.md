# Angular Realtime Chart

_ngx-realtime-chart_ is a small library designed for live streaming data in Angular applications.

---

See StackBlitz [demo](https://stackblitz.com/edit/ngx-realtime-chart?file=src%2Fmain.ts)

## Installation

```sh
npm install ngx-realtime-chart
```

## Usage

Import the NgxRealtimeChartModule into your AppModule:

```ts
import { NgxRealtimeChartModule } from 'ngx-realtime-chart';

@NgModule({
  imports: [NgxRealtimeChartModule]
})
export class AppModule {}
```

Example with standalone component and simple configuration:

```ts
import { NgxRealtimeChartComponent, RealtimeChartData, RealtimeChartOptions } from 'ngx-realtime-chart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgxRealtimeChartComponent],
  template: `<ngx-realtime-chart [options]="options" [data]="data" />`
})
export class AppComponent implements {
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
}
```

## License

```text
MIT License

Copyright (c) 2023 Jan Kuri <jkuri88@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
