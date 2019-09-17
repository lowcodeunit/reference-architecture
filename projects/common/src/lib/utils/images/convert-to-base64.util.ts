import { Base64Model } from '../../models/base64.model';

// @dynamic

/**
 * @dynamic is used because this class contains static properties
 */
export class ConvertToBase64Util{

    
public static GetBase64(event): Base64Model {
    let file = event;
    let me = this;
    let reader = new FileReader();
    let base64Object: Base64Model;
    reader.readAsDataURL(file);
    reader.onload = () => {
      //console.log(reader.result);
      base64Object = new Base64Model(reader.result.toString(), file);
    //   me.buildImageMessage(reader.result.toString(), file);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
      return;
    };
    return base64Object;
 }
}