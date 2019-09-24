import { DataFlowOutput } from './DataFlowOutput';
import { DataFlowModulesValidation } from './DataFlowModulesValidation';

export class DataFlow {
  public Description?: string;

  public ID?: string;

  public Lookup?: string;

  public Name?: string;

  public Output?: DataFlowOutput;

  public Validations?: DataFlowModulesValidation;
}
