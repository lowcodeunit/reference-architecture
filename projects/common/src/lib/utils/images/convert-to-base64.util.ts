// @dynamic

/**
 * @dynamic is used because this class contains static properties
 */

import { Base64Model } from '../../models/base64.model';
import { Observable, Subscriber, Subject } from 'rxjs';

export class ConvertToBase64Util {

    /**
     *
     * @param event either type File or Blob
     *
     * Converts to Base64 and returns an observable of Base64Model
     */
    public static GetBase64(file: Array<File>): Observable<Array<Base64Model>> {
      const base64Observable = new Subject<Array<Base64Model>>();
      const baseArray: Array<Base64Model> = [];

      for (const itm of file) {
        const reader = new FileReader();

        reader.onload = () => {
          baseArray.push(new Base64Model(reader.result.toString(), itm));

          if (baseArray.length === file.length) {
            base64Observable.next(baseArray);
          }
          // base64Observable.next(new Base64Model(reader.result.toString(), itm));
        };

        reader.readAsDataURL(itm['file'].rawFile);
        reader.onerror = (error) => {
          console.error('Error: ', error);
        };
      }

      return base64Observable;
   }
}
