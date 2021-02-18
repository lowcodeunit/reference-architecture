import { OnInit, Input, Injector, Directive, OnChanges } from '@angular/core';

// @Directive()
export abstract class LcuElementComponent<T> implements OnChanges, OnInit {
  //  Fields

  //  Properties
  @Input('context')
  public Context: T;

  //  Constructors
  constructor(protected injector: Injector) { }

  //  Life Cycle
  public ngOnChanges() {
  }

  public ngOnInit() {
  }

  //  API Methods
  @Input()
  public SetContext(ctxt: T) {
    console.log('Setting context');

    this.Context = ctxt;

    console.log(this.Context);
  }
}
