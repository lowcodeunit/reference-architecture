export class Base64Model{
    public Blob: string;

    public File: File;
    
    constructor(blob: string, file:File){
        this.Blob = blob;
        this.File = file;
    }
}