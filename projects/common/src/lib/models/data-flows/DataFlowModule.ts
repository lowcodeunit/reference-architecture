import { Status } from '@lcu-ide/common';
import { DataFlowAction } from './DataFlowAction';

export class DataFlowModule {
  public Actions?: DataFlowAction[];

  public ControlType: string;

  public Height: number;

  public ID: string;

  public Left: number;

  public ModuleType: string;

  public Shape: string;

  public Status: Status;

  public Text: string;

  public Top: number;

  public Width: number;
}
