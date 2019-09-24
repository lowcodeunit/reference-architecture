import { IdeActivity } from './activity';
import { IdeSideBar } from './side-bar';
import { IdeEditor } from './editor';
import { IdePanel } from './panel';

export class IdeState {
  public Activities: IdeActivity[];

  public CurrentActivity: IdeActivity;

  public CurrentEditor: IdeEditor;

  public CurrentPanel: IdePanel;

  public Editors: IdeEditor[];

  public InfrastructureConfigured: boolean;

  public Loading: boolean;

  public Panels: IdePanel[];

  public RootActivities: IdeActivity[];

  public ShowPanels: boolean;

  public SideBar: IdeSideBar;

  public StatusChanges: string[];
}
