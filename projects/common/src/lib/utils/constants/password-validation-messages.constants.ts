// @dynamic
/**
 * @dynamic need this because there are static memebers
 *
 * Password / Confirm password constants
 */

export class PasswordValidationMessagesConstants {


  /**
   * Constant for confirm password equal
   */
  public static readonly PASSWORDS_MATCH: string = 'Password mismatch';

  /**
   * Constant for confirm password required
   */
  public static readonly CONFIRM_REQUIRED: string = 'Confirm password is required';

  /**
   * Constant for password pattern
   */
  public static readonly PATTERN: string = 'At least one uppercase, one lowercase, one special character, and one number';

  /**
   * Constant for password required
   */
  public static readonly REQUIRED: string = 'Password is required';

  /**
   * Constant for password min length
   *
   * @param length charcter length
   */
  public static MIN_LENGTH(length: number): string {
    return 'Password must be at least ' + length.toString() + ' characters long.';
  }
}
