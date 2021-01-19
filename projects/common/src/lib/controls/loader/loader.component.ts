import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lcu-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  //  Fields

  //  Properties
  @Input('diameter')
  public Diameter: number;

  @Input('hide-inner')
  public HideInner: boolean;

  @Input('loading')
  public Loading: boolean;

  public get LogoDiameter(): string {
    return (this.Diameter - (this.Diameter / 3)) + 'px';
  }

  //  Constructors
  constructor() {
    this.Diameter = 75;
  }

  //  Life Cycle
  public ngOnInit(): void {}

  //  API Methods

  //  Helpers
}
