import { DirectUpload } from '@rails/activestorage'
import { FC, useState } from 'react'

const DIRECT_UPLOAD_URL = 'http://localhost:3000/rails/active_storage/direct_uploads'
const ATTACHMENT_URL = 'http://localhost:3000/cats/1/image'

const UploadForm: FC = () => {
  const [file, setFile] = useState<File>()
  const [uploadTime, setUploadTime] = useState<number>()

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setFile(files[0])
    }
  }

  function createDirectUpload(directUpload: any) {
    return new Promise((resolve, reject) => {
      directUpload.create((err: Error, blob: any) => {
        if (err) reject(err)
        else resolve(blob)
      })
    })
  }

  const upload = async () => {
    if (!file) {
      throw new Error('file not found')
    }

    const start = performance.now()
    const directUpload = await new DirectUpload(file, DIRECT_UPLOAD_URL)

    const directUploadResponse: any = await createDirectUpload(directUpload)
    await fetch(ATTACHMENT_URL, {
      method: 'PUT',
      headers: {
        Accept: 'application/json, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ id: 1, image: directUploadResponse.signed_id }),
    })
      .then(() => {
        const end = performance.now()
        setUploadTime(end - start)
      })
      .catch((e) => {
        console.log(e)
        throw new Error('upload error')
      })
  }

  return (
    <div>
      <input name='file' type='file' accept='image/*' onChange={onChangeFile} />
      <input type='button' disabled={!file} value='submit' onClick={() => upload()} />
      <p>upload time: {uploadTime}</p>
    </div>
  )
}

export default UploadForm
