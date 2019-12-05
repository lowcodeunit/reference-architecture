export class JSONSchema {
  public $ref?: string;

  /////////////////////////////////////////////////
  // Schema Metadata
  /////////////////////////////////////////////////
  /**
   * This is important because it tells refs where
   * the root of the document is located
   */
  public id?: string;

  public $id?: string;

  /**
   * It is recommended that the meta-schema is
   * included in the root of any JSON Schema
   */
  public $schema?: string;

  /**
   * Title of the schema
   */
  public title?: string;

  /**
   * Schema description
   */
  public description?: string;

  /**
   * Default json for the object represented by
   * this schema
   */
  public 'default'?: any;

  /////////////////////////////////////////////////
  // Number Validation
  /////////////////////////////////////////////////
  /**
   * The value must be a multiple of the number
   * (e.g. 10 is a multiple of 5)
   */
  public multipleOf?: number;

  public maximum?: number;

  /**
   * If true maximum must be > value, >= otherwise
   */
  public exclusiveMaximum?: boolean;

  public minimum?: number;

  /**
   * If true minimum must be < value, <= otherwise
   */
  public exclusiveMinimum?: boolean;

  /////////////////////////////////////////////////
  // String Validation
  /////////////////////////////////////////////////
  public maxLength?: number;

  public minLength?: number;

  /**
   * This is a regex string that the value must
   * conform to
   */
  public pattern?: string;

  /////////////////////////////////////////////////
  // Array Validation
  /////////////////////////////////////////////////
  public additionalItems?: boolean | JSONSchema;

  public items?: JSONSchema | JSONSchema[];

  public maxItems?: number;

  public minItems?: number;

  public uniqueItems?: boolean;

  /////////////////////////////////////////////////
  // Object Validation
  /////////////////////////////////////////////////
  public maxProperties?: number;

  public minProperties?: number;

  public required?: string[];

  public additionalProperties?: boolean | JSONSchema;

  /**
   * Holds simple JSON Schema definitions for
   * referencing from elsewhere.
   */
  public definitions?: { [key: string]: JSONSchema };

  /**
   * The keys that can exist on the object with the
   * json schema that should validate their value
   */
  public properties?: { [property: string]: JSONSchema };

  /**
   * The key of this object is a regex for which
   * properties the schema applies to
   */
  public patternProperties?: { [pattern: string]: JSONSchema };

  /**
   * If the key is present as a property then the
   * string of properties must also be present.
   * If the value is a JSON Schema then it must
   * also be valid for the object if the key is
   * present.
   */
  public dependencies?: { [key: string]: JSONSchema | string[] };

  /////////////////////////////////////////////////
  // Generic
  /////////////////////////////////////////////////
  /**
   * Enumerates the values that this schema can be
   * e.g.
   * {"type": "string",
   *  "enum": ["red", "green", "blue"]}
   */
  public 'enum'?: any[];

  /**
   * The basic type of this schema, can be one of
   * [string, number, object, array, boolean, null]
   * or an array of the acceptable types
   */
  public type?: string | string[];

  /////////////////////////////////////////////////
  // Combining Schemas
  /////////////////////////////////////////////////
  public allOf?: JSONSchema[];

  public anyOf?: JSONSchema[];

  public oneOf?: JSONSchema[];

  /**
   * The entity being validated must not match this schema
   */
  public not?: JSONSchema;
}
