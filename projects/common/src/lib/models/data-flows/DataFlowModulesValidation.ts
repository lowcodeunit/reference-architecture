export class DataFlowModulesValidation {
  public Connection: {
    Incoming: DataFlowModuleConnectionValidation,
    Outgoing: DataFlowModuleConnectionValidation
  };
}

export class DataFlowModuleConnectionValidation {
  public Limit: { [moduleType: string]: number };

  public Types: { [moduleType: string]: string[] };
}
