import { FormControl } from '@angular/forms';

export class UserNameValidator {

/**
 * Username regular expression pattern
 *
 * letters and numbers only
 */
 public static readonly UsernamePattern: RegExp = /'^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'/gmi;

 /**
  * Username regular expression pattern
  *
  * letters and numbers
  *
  * Doesn't allow underscore or . at the beginning or end of value
  */
 public static readonly UsernameNoUnderscoreDotPattern: RegExp = /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/gmi;

  public static ValidUsername(control: FormControl): { [key: string]: any } {
    if (control.value.toUpperCase() === 'ABC123' || control.value.toUpperCase() === '123ABC') {
      return ({ ValidUsername: true });
    } else {
      return (null);
    }
  }
}
