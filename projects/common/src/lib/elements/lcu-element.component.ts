import { OnInit, Input, Injector, Directive } from '@angular/core';

@Directive()
export abstract class LcuElementComponent<T> implements OnInit {
  //  Fields

  //  Properties
  //  TODO: WOuld be ideal if this was caps with renamed input to lower...  But Angular Elements doesn't honor the Input/Output rename
  @Input()
  public context: T;

  //  Constructors
  constructor(protected injector: Injector) {
  }

  //  Life Cycle
  public ngOnInit() {}

  //  API Methods
  @Input()
  public SetContext(ctxt: T) {
    this.context = ctxt;
  }
}
