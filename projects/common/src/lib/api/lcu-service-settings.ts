import { Injectable } from '@angular/core';

export class LCUServiceSettings {
  public APIRoot?: string;

  public AppConfig: LCUApplicationConfig;

  public StateConfig: LCUStateConfig;
}

export class LCUApplicationConfig {
  public ID: string;

  public EnterpriseAPIKey: string;
}

export class LCUStateConfig {
  public Environment: string;

  public Root: string;

  public UsernameMock: string;
}
