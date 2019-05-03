import { FormGroup, FormControl } from '@angular/forms';


// @dynamic

/**
 * @dynamic is used because this class contains static properties
 */
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
  public static readonly Strong: RegExp = /^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/gmi;

  public static readonly Medium: RegExp = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})$/gmi;

  /**
   * Check if password and confirm password are equal
   *
   * @param formGroup formGroup containing the password and confirm password fields
   */
  public static PasswordsMatch(formGroup: FormGroup): { [key: string]: any } {
    let value: string;

    for (const key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        const control: FormControl = <FormControl>formGroup.controls[key];

        if (value === undefined) {
          value = control.value;
        } else {
          if (value !== control.value) {
            return ({ PasswordsMatch: true });
            break;
          }
        }
      }
    }

    return null;
  }
}
