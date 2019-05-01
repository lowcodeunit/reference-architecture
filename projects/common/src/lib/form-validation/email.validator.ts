export class EmailValidation {

  /**
   * Email regular expression pattern
   */
  public static readonly EmailPattern: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/gmi;
  public static readonly EmailPattern2: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/gmi;

  public static readonly Validate(control: AbstractControl): { [key: string]: any } {

  }
}
