// @dynamic
/**
 * @dynamic need this because there are static memebers
 *
 * Username constants
 */

export class UserValidationMessagesConstants {

  /**
   * Constant for username pattern
   */
  public static readonly PATTERN: string = 'Username cannot end or begin with _ or .';

  /**
   * Constant for username required
   */
  public static readonly REQUIRED: string = 'Username is required';

  /**
   * Constant for valid username
   */
  public static readonly VALID: string = 'Your username has already been taken';

  /**
   * Constant for username max length
   *
   * @param length charcter length
   */
  public static MAX_LENGTH(length: number): string {
    return 'Username cannon be more than ' + length.toString() + ' characters long.';
  }

  /**
   * Constant for username min length
   *
   * @param length charcter length
   */
  public static MIN_LENGTH(length: number): string {
    return 'Username must be at least ' + length.toString() + ' characters long.';
  }
}
