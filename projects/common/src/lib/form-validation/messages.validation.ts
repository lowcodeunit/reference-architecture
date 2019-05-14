import { EmailValidationMessagesConstants } from './../utils/constants/email-validation-messages.constants';
import { ValidationMessageModel } from './../models/validation-message.model';
import { UserValidationMessagesConstants } from '../utils/constants/user-validation-messages.constants';
import { Constants } from '../utils/constants/constants';
import { PasswordValidationMessagesConstants } from '../utils/constants/password-validation-messages.constants';

// @dynamic
/**
 * @dynamic need this because there are static memebers
 */
export class ValidationMessages {
  public static readonly UserName: Array<ValidationMessageModel> = [
    { Type: Constants.REQUIRED, Message: UserValidationMessagesConstants.REQUIRED },
    { Type: Constants.MIN_LENGTH, Message: UserValidationMessagesConstants.MIN_LENGTH(5) },
    { Type: Constants.MAX_LENGTH, Message: UserValidationMessagesConstants.MAX_LENGTH(25) },
    { Type: Constants.PATTERN, Message: UserValidationMessagesConstants.PATTERN },
    { Type: Constants.VALID_USERNAME, Message: UserValidationMessagesConstants.VALID }
  ];

  public static readonly Email: Array<ValidationMessageModel> = [
    { Type: Constants.REQUIRED, Message: EmailValidationMessagesConstants.REQUIRED },
    { Type: Constants.PATTERN, Message: EmailValidationMessagesConstants.PATTERN }
  ];

  public static readonly Password: Array<ValidationMessageModel> = [
    { Type: Constants.REQUIRED, Message: PasswordValidationMessagesConstants.REQUIRED },
    { Type: Constants.MIN_LENGTH, Message: PasswordValidationMessagesConstants.MIN_LENGTH(5) },
    { Type: Constants.PATTERN, Message: PasswordValidationMessagesConstants.PATTERN }
  ];

  public static readonly ConfirmPassword: Array<ValidationMessageModel> = [
    { Type: Constants.REQUIRED, Message: PasswordValidationMessagesConstants.CONFIRM_REQUIRED },
    { Type: Constants.PASSWORDS_MATCH, Message: PasswordValidationMessagesConstants.PASSWORDS_MATCH }
  ]
}
