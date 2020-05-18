export class Application {
  public AccessRights?: string[];

  public Container?: string;

  public Description?: string;

  public Hosts?: string[];

  public ID?: string;

  public IsPrivate?: boolean;

  public IsReadOnly?: boolean;

  public Licenses?: string[];

  public Name: string;

  public PathRegex: string;

  public Priority?: number;

  public QueryRegex?: string;

  public UserAgentRegex?: string;
}

export class DAFApplicationConfig {
  public ApplicationID?: string;

  public ID?: string;

  public Lookup?: string;

  public Priority?: number;
}

export class DAFAPIApplicationConfig extends DAFApplicationConfig {
  public APIRoot?: string;

  public InboundPath?: string;

  public Methods?: string;

  public Security?: string;
}

export class DAFViewApplicationConfig extends DAFApplicationConfig {
  public BaseHref?: string;

  public NPMPackage?: string;

  public PackageVersion?: string;

  public StateConfig?: any;
}
