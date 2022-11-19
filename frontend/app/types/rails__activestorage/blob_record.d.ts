export class BlobRecord {
  constructor(
    file: string,
    checksum: string,
    url: string,
  );
  create(any): void;
  toJSON(): any;

  xhr: XMLHttpRequest;
}
