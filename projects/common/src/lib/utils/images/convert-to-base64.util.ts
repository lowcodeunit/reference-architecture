import { Base64Model } from '../../models/base64.model';
import { Observable, Subscriber, Subject } from 'rxjs';

// @dynamic

/**
 * @dynamic is used because this class contains static properties
 */
export class ConvertToBase64Util {

    /**
     *
     * @param event either type File or Blob
     *
     * Converts to Base64 and returns an observable of Base64Model
     */
    public static GetBase64(event: File): Observable<Base64Model> {
      const reader = new FileReader();
      const base64Observable = new Subject<Base64Model>();

      reader.onload = () => {
        base64Observable.next(new Base64Model(reader.result.toString(), event));
      };

      reader.readAsDataURL(event);
      reader.onerror = (error) => {
        console.error('Error: ', error);
      };

      return base64Observable;
   }
}
