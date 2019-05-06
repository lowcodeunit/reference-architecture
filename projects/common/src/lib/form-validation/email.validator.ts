// @dynamic
/**
 * @dynamic need this because there are static memebers
 */

export class EmailValidator {

  /**
   * Email regular expression pattern, requires domain
   */
  public static readonly EmailPatternDomain: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,4}$/gmi;

}
