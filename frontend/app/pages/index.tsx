import { FC, useRef, useState, useEffect } from 'react'

import DirectUploadForm from 'components/DirectUploadForm'
import DirectUploadWithDigestForm from 'components/DirectUploadWithDigestForm'

const Home: FC = () => {
  // Hash Wasm
  const hashWasmWorkerRef = useRef<Worker>()
  const [hashWasmDigest, setHashWasmDigest] = useState<string>()
  const [hashWasmTime, setHashWasmTime] = useState<number>()

  useEffect(() => {
    hashWasmWorkerRef.current = new Worker(
      new URL('../src/workers/calculate-digest-hash-wasm', import.meta.url),
    )
    hashWasmWorkerRef.current.onmessage = (event: MessageEvent<File>) => {
      const result: any = event.data
      setHashWasmDigest(result[1])
      setHashWasmTime(result[2])
    }
    return () => {
      hashWasmWorkerRef.current?.terminate()
    }
  }, [])

  // Spark MD5
  const sparkMD5WorkerRef = useRef<Worker>()
  const [sparkMD5Digest, setSparkMD5Digest] = useState<string>()
  const [sparkMD5Time, setSparkMD5Time] = useState<number>()

  useEffect(() => {
    sparkMD5WorkerRef.current = new Worker(
      new URL('../src/workers/calculate-digest-spark-md5', import.meta.url),
    )
    sparkMD5WorkerRef.current.onmessage = (event: MessageEvent<File>) => {
      const result: any = event.data
      setSparkMD5Digest(result[1])
      setSparkMD5Time(result[2])
    }
    return () => {
      sparkMD5WorkerRef.current?.terminate()
    }
  }, [])

  return (
    <>
      <h1>Active Storage Test</h1>
      <div>
        <h3>Active Storage Hash Wasm</h3>
        <div>digest: {hashWasmDigest}</div>
        <div>time to digest: {hashWasmTime}</div>
        <DirectUploadForm digest={hashWasmDigest} workerRef={hashWasmWorkerRef} />
      </div>
      <div>
        <h3>Active Storage SparkMD5</h3>
        <div>digest: {sparkMD5Digest}</div>
        <div>time to digest: {sparkMD5Time}</div>
        <DirectUploadForm digest={sparkMD5Digest} workerRef={sparkMD5WorkerRef} />
      </div>
      <div>
        <h3>Active Storage (digest in library method)</h3>
        <DirectUploadWithDigestForm />
      </div>
    </>
  )
}

export default Home
