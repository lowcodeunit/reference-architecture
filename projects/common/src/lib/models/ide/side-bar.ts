export class IdeSideBar {
  public CurrentAction?: IdeSideBarAction;

  public Actions: IdeSideBarAction[];

  public Title: string;
}

export class IdeSideBarAction {
  public Action: string;

  public Group: string;

  public Section: string;

  public Title: string;
}
