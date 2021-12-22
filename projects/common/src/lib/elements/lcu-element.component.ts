import { OnInit, Input, Injector, Directive, OnChanges, Component } from '@angular/core';

@Directive()
export abstract class LcuElementComponent<T> implements OnInit {
  //  Fields

  //  Properties
  @Input('context')
  public Context: T;

  //  Constructors
  constructor(protected injector: Injector) { }

  //  Life Cycle
  public ngOnInit() { }

  //  API Methods
  public SetContext(ctxt: T) {
    if (this.Context !== undefined) {
      console.log('Setting context');

      this.Context = ctxt;

      console.log(this.Context);
    }
  }
}
