# Active Storage With Digest Web Worker

This repository shows that the time of ActiveStorage's direct-upload can be shortened by calculating digest before uploading and using hash-wasm to digest.

This idea is owed to the repository, [ddbj/submission-mss](https://github.com/ddbj/submission-mss).

Active Storage facilitates(Ruby on Rails's module) uploading files to a cloud storage service like Amazon S3, Google Cloud Storage, or Microsoft Azure Storage.

If you want to saves backend server process time and power, you can direct upload by Active Storage.

Active Storage has npm package(@rails/activestorage) and [RAILS GUIDES](https://edgeguides.rubyonrails.org/active_storage_overview.html) example is,

```js
const upload = new DirectUpload(file, url);

upload.create((error, blob) => {
  if (error) {
    // Handle the error
  } else {
    // Add an appropriately-named hidden input to the form with a
    //  value of blob.signed_id so that the blob ids will be
    //  transmitted in the normal upload flow
    const hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("value", blob.signed_id);
    hiddenField.name = input.name;
    document.querySelector("form").appendChild(hiddenField);
  }
});
```

`upload.create` executes two http requests to Active Storage server.

First request is to create AcitveStorage::Blob after calculating checksum for the file to upload.

Srecond request is to upload the file althogh actual upload is executed by cloud storage that you can specify.

To shorten upload time, calculating checksum should be done before uploading.

This repository adopts this strategy.

Imagine that user upload a image file. He selects upload file by the input field, and click the upload button.  
Before clicking the button, webworker can calculate can checksum asynchronously.

In addition, although active storage uses hash-md5 to calculate the checksum, you can use hash-wasm to shorten the upload time more.

## Execution time

Uploading 1GB image file is as follows.

|           | digest  | click -> upload |
| --------- | ------- | --------------- |
| hash-wasm | 1894ms  | 4840ms          |
| spark-md5 | 11733ms | 5878ms          |
| default   | N/A     | 16602ms         |

※ `default`'s click -> upload includes the time of calulating checksum.

## Setup

```
docker compose build
docker compose run backend rails db:create
```

## Start at Local

```
docker compose up
```

backend(Ruby on Rails) works on 3000 port.  
frontend(Next.js) works on 4000 port.

![active-storage-sample](https://user-images.githubusercontent.com/17586662/206849194-8605d79f-99b2-4ee2-abce-1e6d4edcfaa4.PNG)
