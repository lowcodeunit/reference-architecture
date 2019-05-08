import { AbstractControl, ValidatorFn } from '@angular/forms';
// import * as libphonenumber from 'google-libphonenumber';

// @dynamic
/**
 * @dynamic need this because there are static memebers
 */
export class PhoneValidator {

  /**
   * Commenting out for now
   */
// https://angular-templates.io/tutorials/about/angular-forms-and-validations

  // public static ValidCountryPhone = (countryControl: AbstractControl): ValidatorFn => {

  //   let subscribe = false;

  //   return (control: AbstractControl): {[key: string]: boolean} => {

  //     if (!subscribe) {
  //       subscribe = true;
  //       countryControl.valueChanges.subscribe(() => {
  //         control.updateValueAndValidity();
  //       });
  //     }

  //     if (control.value !== '') {
  //       try {

  //         const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
  //         const phoneNumber = '' + control.value + '';
  //         const region = countryControl.value;
  //         const pNumber = phoneUtil.parseAndKeepRawInput(phoneNumber, region.iso);
  //         const isValidNumber = phoneUtil.isValidNumber(pNumber);

  //         if (isValidNumber) {
  //           return undefined;
  //         }
  //       } catch (e) {
  //         console.log(e);
  //         return {
  //           ValidCountryPhone: true
  //         };
  //       }

  //       return {
  //         ValidCountryPhone: true
  //       };
  //     } else {
  //       return undefined;
  //     }
  //   };
  // }
}
