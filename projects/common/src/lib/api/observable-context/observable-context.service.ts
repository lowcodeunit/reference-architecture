import { BehaviorSubject, Observable } from 'rxjs';

export abstract class ObservableContextService<T> {
  // 	Fields
  protected loader: BehaviorSubject<boolean>;

  protected subject: BehaviorSubject<T>;

  // 	Properties
  public readonly Context: Observable<T>;

  public readonly Loading: Observable<boolean>;

  //  Constructors
  constructor() {
    this.loader = new BehaviorSubject<boolean>(false);

    this.subject = new BehaviorSubject<T>(this.defaultValue());

    this.Context = this.subject.asObservable();

    this.Loading = this.loader.asObservable();
  }

  //  Helpers
  protected loading(loading: boolean) {
    this.loader.next(loading);
  }

  protected defaultValue(): T {
    return null;
  }
}
