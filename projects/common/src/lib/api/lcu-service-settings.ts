import { Injectable } from '@angular/core';

export class LCUServiceSettings {
  public APIRoot?: string;

  public AppConfig?: LCUApplicationConfig;

  public Settings?: any;

  public StateConfig?: LCUStateConfig;
}

export class LCUApplicationConfig {
  public ID: string;

  public EnterpriseLookup: string;
}

export class LCUStateConfig {
  public ActionRoot?: string;

  public Environment?: string;

  public Root?: string;

  public UsernameMock?: string;
}
