import { FormGroup, FormControl, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';


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
  // public static readonly StrongPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,}$)/gm;
  public static readonly StrongPassword: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,}$)';

  public static readonly MediumPassword: RegExp = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})$/gm;

  /**
   * Check if password and confirm password match
   *
   * @param password password control
   * @param confirm confirm password control
   */
  public static PasswordsMatch(password: AbstractControl, confirm: AbstractControl): ValidatorFn {

    if (!password || !confirm) { return; }

    return (formGroup): ValidationErrors => {
      if (password.value !== confirm.value) {
        confirm.setErrors({ PasswordsMatch: true });
      } else {
        confirm.setErrors(null);
      }
      return;
    };
  }

  /**
   * Check if password and confirm password are equal
   *
   * @param formGroup formGroup containing the password and confirm password fields
   */
  // public static PasswordsMatch(formGroup: FormGroup): { [key: string]: any } {
  //   let value: string;

  //   for (const key in formGroup.controls) {
  //     if (formGroup.controls.hasOwnProperty(key)) {
  //       const control: FormControl = <FormControl>formGroup.controls[key];

  //       if (value === undefined) {
  //         value = control.value;
  //       } else {
  //         if (value !== control.value) {
  //           return ({ PasswordsMatch: true });
  //           break;
  //         }
  //       }
  //     }
  //   }

  //   return null;
  // }
}
