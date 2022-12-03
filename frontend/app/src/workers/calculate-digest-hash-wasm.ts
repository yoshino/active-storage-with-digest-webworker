import { createMD5 } from 'hash-wasm'

addEventListener('message', async ({ data: { file } }) => {
  try {
    const start = performance.now()
    const digest = await calculateDigest(file)
    const time = performance.now() - start

    postMessage([null, digest, time])
  } catch (err: any) {
    console.error(err)

    postMessage([err.message, null, null])
  }
})

async function calculateDigest(file: File) {
  const md5 = await createMD5()
  md5.init()

  const reader = file.stream().getReader()

  let done
  let chunk: any

  while ((({ done, value: chunk } = await reader.read()), !done)) {
    md5.update(chunk)
  }

  return btoa(String.fromCharCode(...md5.digest('binary')))
}
