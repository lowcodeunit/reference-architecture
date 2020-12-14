// @dynamic

/**
 * @dynamic is used because this class contains static properties
 */

export class ClipboardCopyFunction {
    /**
         * Copies the string content to the clipboard for the user to paste
         * @param copyContent the content to copy to the clipboard
         */
        public static ClipboardCopy(copyContent: string): void {
            const el = document.createElement('textarea');
            el.value = copyContent;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        }
    
    }