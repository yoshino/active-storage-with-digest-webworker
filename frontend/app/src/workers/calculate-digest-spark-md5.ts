import { FileChecksum } from '../libs/activestorage/file-checksum'

addEventListener('message', async ({ data: { file } }) => {
  const start = performance.now()
  FileChecksum.create(file, (err: any, checksum: string) => {
    if (err) {
      postMessage([err.message, null, null])
    }

    const time = performance.now() - start
    postMessage([null, checksum, time])
  })
})
