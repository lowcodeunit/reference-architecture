import { Base64Model } from '../../models/base64.model';

// @dynamic

/**
 * @dynamic is used because this class contains static properties
 */
export class ConvertToBase64Util{

    /**
     * 
     * @param event either type File or Blob 
     * 
     * Converts to Base64 and returns Object{base64 string, original file/blob passed in}
     */
public static GetBase64(event): Base64Model {
    let file = event;
    let me = this;
    let reader = new FileReader();
    let base64Object: Base64Model;

    reader.readAsDataURL(file);
    reader.onload = (val) => {
      console.log('val', val);
      return () => new Base64Model(reader.result.toString(), file);
    };

    reader.onerror = (error) => {
      console.log('Error: ', error);
      return;
    };

    return base64Object;
 }
}
