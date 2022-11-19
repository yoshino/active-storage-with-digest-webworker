// ref: https://github.com/asyncapi/asyncapi-react/issues/177
import dynamic from 'next/dynamic'

// ref: https://github.com/rails/rails/tree/main/activestorage/app/javascript/activestorage
import { BlobRecord } from '@rails/activestorage/src/blob_record';
import { BlobUpload } from '@rails/activestorage/src/blob_upload';

export class DirectUpload {
  file: string;
  url: string;
  delegate: any;
  checksum: string;

  constructor(file: string, url: string, delegate: any, checksum: string) {
    this.file     = file;
    this.url      = url;
    this.delegate = delegate;
    this.checksum = checksum;
  }

  async create() {
    const blob = new BlobRecord(this.file, this.checksum, this.url);

    // await this.delegate.directUploadWillCreateBlobWithXHR(blob.xhr);

    return new Promise((resolve, reject) => {
      blob.create((error: Error) => {
        if (error) {
          reject(error);
        } else {
          const upload = new BlobUpload(blob);
          upload.requestDidError = (event: Event) => upload.callback(event.target);

          // this.delegate.directUploadWillStoreFileWithXHR(upload.xhr);

          upload.create((error) => {
            if (error) {
              reject(error);
            } else {
              resolve(blob.toJSON());
            }
          });
        }
      });
    });
  }
}
