import { Injectable } from '@angular/core';

export class LCUServiceSettings {
  [key: string]: any;

  public APIRoot?: string;

  public AppConfig?: LCUApplicationConfig;

  public Settings?: any;

  public StateConfig?: LCUStateConfig;
}

export class LCUApplicationConfig {
  [key: string]: any;

  public ID: string;

  public EnterpriseLookup: string;
}

export class LCUStateConfig {
  [key: string]: any;

  public ActionRoot?: string;

  public Environment?: string;

  public Root?: string;

  public UsernameMock?: string;
}
