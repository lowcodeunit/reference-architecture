import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Loading {
  // 	Fields
  protected loaders: boolean[];

  // 	Properties
  public get Value(): boolean {
    return this.loaders && this.loaders.length > 0 && this.loaders.every(loader => loader);
  }

  // 	Constructors
  constructor() {
    this.Clear();
  }

  // 	API Methods
  public Clear() {
    this.loaders = [];
  }

  public Set(loading: boolean) {
    if (loading) {
      this.loaders.push(loading);
    } else if (this.loaders && this.loaders.length > 0) {
      this.loaders.splice(0, 1);
    }
  }

  // 	Helpers
}
