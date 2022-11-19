import { BlobRecord } from 'types/rails__activestorage/blob_record'

export class BlobUpload {
  constructor(blob: BlobRecord );

  create(callback: (error: Error, blob: Blob) => void): void;
  requestDidError(event: Event): void;

  xhr: XMLHttpRequest;
  callback: any;
}
