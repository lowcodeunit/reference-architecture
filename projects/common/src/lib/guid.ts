export class Guid {
  // 	Constructors
  private constructor(guid: string) {
    if (!guid) {
      throw new TypeError('Invalid argument; `value` has no value.');
    }

    this.value = Guid.Empty;

    if (guid && Guid.IsGuid(guid)) {
      this.value = guid;
    }
  }

  // 	Properties
  public static GuidValidator = new RegExp('^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$', 'i');

  public static Empty = '00000000-0000-0000-0000-000000000000';
  // 	Fields
  protected value: string;

  // 	API Methods
  public static Create(): Guid {
    return Guid.Parse(Guid.CreateRaw());
  }

  public static CreateEmpty(): Guid {
    return Guid.Parse('emptyguid');
  }

  public static CreateRaw(): string {
    return [Guid.gen(2), Guid.gen(1), Guid.gen(1), Guid.gen(1), Guid.gen(3)].join('-');
  }

  public static IsGuid(guid: any) {
    const value: string = guid.toString();

    return guid && (guid instanceof Guid || Guid.GuidValidator.test(value));
  }

  public static Parse(guid: string): Guid {
    return new Guid(guid);
  }

  // 	Helpers
  private static gen(count: number) {
    let out = '';
    for (let i = 0; i < count; i++) {
      // tslint:disable-next-line:no-bitwise
      out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return out;
  }

  public Equals(other: Guid): boolean {
    return Guid.IsGuid(other) && this.value === other.toString();
  }

  public IsEmpty(): boolean {
    return this.value === Guid.Empty;
  }

  public ToJSON(): any {
    return {
      Value: this.value
    };
  }

  public ToString(): string {
    return this.value;
  }
}
