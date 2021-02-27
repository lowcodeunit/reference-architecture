export class LCUServiceSettings {
  [key: string]: any;

  public Actions?: { [key: string]: (event: any) => void };

  public APIRoot?: string;

  public Application?: LCUApplicationConfig;

  public Settings?: LCUSettingsConfig;

  public State?: LCUStateConfig;
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

export class LCUSettingsConfig {
  [key: string]: any;
}
