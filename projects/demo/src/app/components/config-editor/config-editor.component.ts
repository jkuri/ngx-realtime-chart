import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurveType, RealtimeChartOptions } from 'ngx-realtime-chart';
import { SelectboxComponent } from '../../shared/widgets/selectbox/selectbox.component';

@Component({
  selector: 'app-config-editor',
  templateUrl: './config-editor.component.html',
  standalone: true,
  imports: [SelectboxComponent, FormsModule]
})
export class ConfigEditorComponent {
  @Input() options!: RealtimeChartOptions;
  @Output() optionsUpdated = new EventEmitter<RealtimeChartOptions>();

  color: string = '#09090B';
  curve: CurveType = 'basis';
  areaOpacity: number = 0.03;
  lineWidth: number = 2;
  gridColor: string = '#09090B';
  gridOpacity: number = 0.05;

  curveTypeOptions: { value: number | string | boolean; placeholder: string }[] = [
    { value: 'basis', placeholder: 'Basis' },
    { value: 'basisOpen', placeholder: 'Basis Open' },
    { value: 'cardinal', placeholder: 'Cardinal' },
    { value: 'cardinalOpen', placeholder: 'Cardinal Open' },
    { value: 'catmullRom', placeholder: 'Catmull Rom' },
    { value: 'catmullRomOpen', placeholder: 'Catmull Rom Open' },
    { value: 'linear', placeholder: 'Linear' },
    { value: 'monotoneX', placeholder: 'Monotone X' },
    { value: 'monotoneY', placeholder: 'Monotone Y' },
    { value: 'natural', placeholder: 'Natural' },
    { value: 'step', placeholder: 'Step' },
    { value: 'stepAfter', placeholder: 'Step After' },
    { value: 'stepBefore', placeholder: 'Step Before' }
  ];

  fpsOptions: { value: number | string | boolean; placeholder: string }[] = [
    { value: 10, placeholder: '10' },
    { value: 15, placeholder: '15' },
    { value: 20, placeholder: '20' },
    { value: 24, placeholder: '24' },
    { value: 30, placeholder: '30' },
    { value: 60, placeholder: '60' }
  ];

  timeSlotsOptions: { value: number | string | boolean; placeholder: string }[] = [
    { value: 10, placeholder: '10' },
    { value: 20, placeholder: '20' },
    { value: 30, placeholder: '30' },
    { value: 40, placeholder: '40' },
    { value: 60, placeholder: '60' },
    { value: 120, placeholder: '120' }
  ];

  colorOptions: { value: number | string | boolean; placeholder: string }[] = [
    { value: '#09090B', placeholder: 'Primary' },
    { value: '#EF4444', placeholder: 'Red' },
    { value: '#F97316', placeholder: 'Orange' },
    { value: '#F59E0B', placeholder: 'Amber' },
    { value: '#EAB308', placeholder: 'Yellow' },
    { value: '#84CC16', placeholder: 'Lime' },
    { value: '#22C55E', placeholder: 'Green' },
    { value: '#10B981', placeholder: 'Emerald' },
    { value: '#14B8A6', placeholder: 'Teal' },
    { value: '#06B6D4', placeholder: 'Cyan' },
    { value: '#0EA5E9', placeholder: 'Light Blue' },
    { value: '#3B82F6', placeholder: 'Blue' },
    { value: '#6366F1', placeholder: 'Indigo' },
    { value: '#8B5CF6', placeholder: 'Violet' },
    { value: '#A855F7', placeholder: 'Purple' },
    { value: '#EC4899', placeholder: 'Fuchsia' },
    { value: '#D946EF', placeholder: 'Pink' },
    { value: '#F43F5E', placeholder: 'Rose' }
  ];

  opacityOptions: { value: number | string | boolean; placeholder: string }[] = [
    { value: 0, placeholder: '0' },
    { value: 0.03, placeholder: '0.03' },
    { value: 0.05, placeholder: '0.05' },
    { value: 0.1, placeholder: '0.1' },
    { value: 0.2, placeholder: '0.2' },
    { value: 0.3, placeholder: '0.3' },
    { value: 0.4, placeholder: '0.4' },
    { value: 0.5, placeholder: '0.5' },
    { value: 0.6, placeholder: '0.6' },
    { value: 0.7, placeholder: '0.7' },
    { value: 0.8, placeholder: '0.8' },
    { value: 0.9, placeholder: '0.9' },
    { value: 1, placeholder: '1' }
  ];

  lineWidthOptions: { value: number | string | boolean; placeholder: string }[] = [
    { value: 1, placeholder: '1' },
    { value: 2, placeholder: '2' },
    { value: 3, placeholder: '3' },
    { value: 4, placeholder: '4' },
    { value: 5, placeholder: '5' },
    { value: 6, placeholder: '6' }
  ];

  onUpdated(): void {
    this.optionsUpdated.emit(this.options);
  }

  onColorUpdated(): void {
    this.options.lines![0].color = this.color;
    this.options.lines![0].areaColor = this.color;
    this.optionsUpdated.emit(this.options);
  }

  onAreaOpacityUpdated(): void {
    this.options.lines![0].areaOpacity = this.areaOpacity;
    this.optionsUpdated.emit(this.options);
  }

  onLineWidthUpdated(): void {
    this.options.lines![0].lineWidth = this.lineWidth;
    this.optionsUpdated.emit(this.options);
  }

  onGridColorUpdated(): void {
    this.options.xGrid!.color = this.gridColor;
    this.options.yGrid!.color = this.gridColor;
    this.optionsUpdated.emit(this.options);
  }

  onGridOpacityUpdated(): void {
    this.options.xGrid!.opacity = this.gridOpacity;
    this.options.yGrid!.opacity = this.gridOpacity;
    this.optionsUpdated.emit(this.options);
  }

  onCurveTypeUpdated(): void {
    this.options.lines![0].curve = this.curve;
    this.optionsUpdated.emit(this.options);
  }
}
