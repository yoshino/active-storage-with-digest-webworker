import { BlobRecord } from './activestorage/blob-record'
import { BlobUpload } from './activestorage/blob-upload'

export class DirectUpload {
  file: File
  url: string
  digest: string

  constructor(file: File, url: string, digest: string) {
    this.file = file
    this.url = url
    this.digest = digest
  }

  create(callback: any) {
    const blob = new BlobRecord(this.file, this.digest, this.url)

    blob.create((error: any) => {
      if (error) {
        callback(error)
      } else {
        const upload = new BlobUpload(blob)
        upload.create((error: any) => {
          if (error) {
            callback(error)
          } else {
            callback(null, blob.toJSON())
          }
        })
      }
    })
  }
}
