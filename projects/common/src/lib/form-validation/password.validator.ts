import { FormGroup, FormControl } from '@angular/forms';

export class PasswordValidator {

  /**
   * Password regular expression pattern:
   *
   * At least one upper case English letter
   *
   * At least one lower case Englis letter
   *
   * At least one digit
   *
   * At least one special character
   *
   * Minimum of eight characters
   */
  public static readonly UpLowDigitSpecial8: RegExp = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/gmi;

  /**
   * Check if password and confirm password are equal
   *
   * @param formGroup formGroup containing the password and confirm password fields
   */
  public static PasswordsEqual(formGroup: FormGroup): { [key: string]: any } {
    let value: string;
    let valid: boolean = true;

    for (const key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        const control: FormControl = <FormControl>formGroup.controls[key];

        if (value === undefined) {
          value = control.value;
        } else {
          if (value !== control.value) {
            valid = false;
            break;
          }
        }
      }
    }

    if (valid) {
      return null;
    }

    return {
      PasswordsEqual: true
    };
  }
