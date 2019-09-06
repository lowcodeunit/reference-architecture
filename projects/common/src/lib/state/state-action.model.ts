export class StateAction {
  public Arguments: any = {};

  public Images?: ImageMessage[];

  public Type: string;
}

export class ImageMessage {
  public Data: any;

  public Headers: string;
}

