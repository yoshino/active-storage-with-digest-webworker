import SparkMD5 from 'spark-md5'

export class FileChecksum {
  file: File
  chunkSize: number
  chunkCount: number
  chunkIndex: number
  callback: any
  md5Buffer: any
  fileReader: any
  fileSlice: any

  static create(file: File, callback: any) {
    const instance = new FileChecksum(file)
    instance.create(callback)
  }

  constructor(file: File) {
    this.file = file
    this.chunkSize = 2097152 // 2MB
    this.chunkCount = Math.ceil(this.file.size / this.chunkSize)
    this.chunkIndex = 0
    this.fileSlice = File.prototype.slice
  }

  create(callback: any) {
    this.callback = callback
    this.md5Buffer = new SparkMD5.ArrayBuffer()
    this.fileReader = new FileReader()
    this.fileReader.addEventListener('load', (event: any) => this.fileReaderDidLoad(event))
    this.fileReader.addEventListener('error', (event: any) => this.fileReaderDidError(event))
    this.readNextChunk()
  }

  fileReaderDidLoad(event: any) {
    this.md5Buffer.append(event.target.result)

    if (!this.readNextChunk()) {
      const binaryDigest = this.md5Buffer.end(true)
      const base64digest = btoa(binaryDigest)
      this.callback(null, base64digest)
    }
  }

  fileReaderDidError(event: any) {
    this.callback(`Error reading ${this.file.name}`)
  }

  readNextChunk() {
    if (this.chunkIndex < this.chunkCount || (this.chunkIndex == 0 && this.chunkCount == 0)) {
      const start = this.chunkIndex * this.chunkSize
      const end = Math.min(start + this.chunkSize, this.file.size)
      const bytes = this.fileSlice.call(this.file, start, end)
      this.fileReader.readAsArrayBuffer(bytes)
      this.chunkIndex++
      return true
    } else {
      return false
    }
  }
}
