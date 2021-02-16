import { OnInit, Input, Injector, Directive } from '@angular/core';

// @Directive()
export abstract class LcuElementComponent<T> implements OnInit {
  //  Fields

  //  Properties
  @Input('context')
  public Context: T;

  //  Constructors
  constructor(protected injector: Injector) {
  }

  //  Life Cycle
  public ngOnInit() {}

  //  API Methods
  @Input()
  public SetContext(ctxt: T) {
    this.Context = ctxt;
  }
}
