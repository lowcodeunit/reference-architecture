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

export class DAFApplication {
  public ApplicationID?: string;

  public Details?: any;

  public ID?: string;

  public Lookup?: string;

  public Priority?: number;
}

export class DAFAPIApplicationDetails {
  public APIRoot?: string;

  public InboundPath?: string;

  public Lookup?: string;

  public Methods?: string;

  public Security?: string;
}

export class DAFViewApplicationDetails {
  public BaseHref?: string;

  public Package?: any;

  public PackageType?: DAFApplicationPackageTypes;

  public RegScripts?: string;

  public StateConfig?: any;
}

export class DAFLCUApplicationDetails extends DAFViewApplicationDetails {
  public Lookup?: string;
}

export class DAFRedirectApplicationDetails {
  public Redirect?: string;
}

export class DAFAppPointerApplicationDetails {
  public DAFApplicationID?: string;

  public DAFApplicationRoot?: string;
}

export enum DAFApplicationPackageTypes {
  Git = "Git",
  NPM = "NPM",
  Zip = "Zip",
}

export class DAFApplicationGitPackage {
  public Branch?: string;

  public Repository?: string;
}

export class DAFApplicationNPMPackage {
  public Name?: string;

  public Version?: string;
}

export class DAFApplicationZipPackage {
  public ZipFile?: string;
}
