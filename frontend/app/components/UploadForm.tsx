import { FC, useEffect, useState } from 'react'
import { DirectUpload } from '@rails/activestorage'

const UploadForm: FC = () => {
  const [file, setFile] = useState<File | null>(null)

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setFile(files[0])
    }
  }

  function createUpload(up: any) {
    return new Promise((resolve, reject) => {
      up.create((err: Error, blob: any) => {
        if (err) reject(err);
        else resolve(blob);
      });
    });
  }

  const upload = async () => {
    let imageBlob;

    if (file) {
      const res = await new DirectUpload(file, "http://localhost:3000/rails/active_storage/direct_uploads")

      try {
        imageBlob = await createUpload(res);
      } catch (err) {
        throw err;
      }
    }
    console.log('blob: ', imageBlob)
  }

  return (
    <div className="App">
      <div className="App-form">
        <input
          name="file"
          type="file"
          accept="image/*"
          onChange={onChangeFile}
        />
        <input type="button" disabled={!file} value="submit" onClick={() => upload()} />
      </div>
    </div>
  )
}

export default UploadForm;
