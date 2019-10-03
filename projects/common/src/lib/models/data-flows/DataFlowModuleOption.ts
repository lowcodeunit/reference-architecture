import { DataFlowModuleControlTypes } from './DataFlowModuleControlTypes';

export class DataFlowModuleOption {
  public Active: boolean;

  public ControlType: DataFlowModuleControlTypes;

  public Description: string;

  public IncomingConnectionLimit: number;

  public IncomingConnectionTypes: string[];

  public ModuleType: string;

  public Name: string;

  public OutgoingConnectionLimit: number;

  public OutgoingConnectionTypes: string[];

  public Visible: boolean;
}
