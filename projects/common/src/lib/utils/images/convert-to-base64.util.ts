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
    public static GetBase64(files: Array<File>): Observable<Array<Base64Model>> {
      const base64Observable = new Subject<Array<Base64Model>>();
      const baseArray: Array<Base64Model> = [];
      let file: File;

      for (file of files) {
        const reader = new FileReader();
        console.log("file = ", file)
        reader.onload = () => {
          // baseArray.push(new Base64Model(reader.result.toString(), file));

          if (baseArray.length === files.length) {
            base64Observable.next(baseArray);
          }
        };

        reader.readAsDataURL(file['file'].rawFile);
        baseArray.push(new Base64Model(reader.result.toString(), file));

        reader.onerror = (error) => {
          console.error('Error: ', error);
        };
      }

      return base64Observable;
   }
}
