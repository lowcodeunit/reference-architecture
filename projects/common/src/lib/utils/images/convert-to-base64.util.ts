import { Base64Model } from '../../models/base64.model';
import { Observable, Subscriber } from 'rxjs';

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
public static GetBase64(event): Observable<Base64Model> {
    const reader = new FileReader();
    let base64Object: Base64Model;

    return Observable.create((observer: Subscriber<any>): void => {
      reader.onload = ((ev: Event): void => {
        console.log('reader', reader);
        console.log('ev', ev);
        base64Object = new Base64Model(reader.result.toString(), event);
      });

      observer.next(this);
      observer.complete();
    });

    reader.readAsDataURL(event);
    // reader.onload = (val) => {
    //   console.log('val', val);
    //   // return () => new Base64Model(reader.result.toString(), file);
    // };

    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
 }
}
