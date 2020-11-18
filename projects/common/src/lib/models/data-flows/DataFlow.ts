import { DataFlowOutput } from './DataFlowOutput';

export class DataFlow {
  public Description?: string;

  public ID?: string;

  public IsEditable?: boolean;

  public Lookup?: string;

  public ModulePacks?: string[];

  public ModuleSettings?: { [moduleId: string]: any };

  public Name?: string;

  public Output?: DataFlowOutput;
}
