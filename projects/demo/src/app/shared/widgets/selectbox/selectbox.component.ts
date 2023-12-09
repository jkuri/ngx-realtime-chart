import { NgForOf, NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-selectbox',
  templateUrl: './selectbox.component.html',
  styleUrl: './selectbox.component.sass',
  standalone: true,
  imports: [NgForOf, NgIf, FormsModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectboxComponent), multi: true }]
})
export class SelectboxComponent implements ControlValueAccessor, OnInit {
  @Input() values!: { value: number | string | boolean; placeholder: string }[];
  @Input() customIcon!: string;
  @Input() placeholder!: string;

  innerValue!: number | string | boolean;
  placeholderText!: string;
  isOpened!: boolean;

  constructor(private elementRef: ElementRef) {}

  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

  get value(): number | string | boolean {
    return this.innerValue;
  }

  set value(val: number | string | boolean) {
    if (!this.values || !this.values.length) {
      throw Error('no values initialized');
    }

    const index = this.values.findIndex(v => v.value === val);
    if (index === -1) {
      return;
    }

    this.innerValue = val;
    this.placeholderText = this.values[index].placeholder;
    this.onChangeCallback(this.innerValue);
  }

  ngOnInit(): void {
    this.isOpened = false;
    this.placeholderText = this.placeholder;
  }

  toggle(): void {
    this.isOpened = !this.isOpened;
    this.onTouchedCallback();
  }

  close(): void {
    this.isOpened = false;
  }

  writeValue(val: number | string | boolean): void {
    if (!val && typeof val !== 'boolean') {
      return;
    }

    const index = this.values.findIndex(v => v.value === val);
    if (index === -1) {
      return;
    }

    this.placeholderText = this.values[index].placeholder;
    this.innerValue = val;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  @HostListener('document:click', ['$event']) onBlur(e: MouseEvent): void {
    if (!this.isOpened) {
      return;
    }

    const input = this.elementRef.nativeElement.querySelector('.selectbox-value');
    if (!input || e.target === input || input.contains(e.target)) {
      return;
    }

    const container = this.elementRef.nativeElement.querySelector('.selectbox-container');
    if (container && container !== e.target && !container.contains(e.target)) {
      this.close();
    }
  }
}
