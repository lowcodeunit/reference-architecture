import { Icon } from '../../icon';
import { DataFlowAction } from './DataFlowAction';
import { DataFlowModuleShapeTypes } from './DataFlowModuleShapeTypes';

export class DataFlowModuleDisplay {
  public Actions?: DataFlowAction[];

  public Category: string;

  public Element: string;

  public Height: number;

  public Icon: Icon;

  public Left: number;

  public ModuleType: string;

  public Shape: DataFlowModuleShapeTypes;

  public Top: number;

  public Width: number;
}
