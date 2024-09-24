import fs from 'fs'
import multer from '@koa/multer'
import { uid } from 'uid'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const id = `${+Date.now()}-${uid(8)}`
    const dist = `/files/${id}`
    if (!fs.existsSync(dist)) {
      fs.mkdirSync(dist)
    }
    cb(null, dist)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/\s+/g, '-'))
  }
})

const upload = multer({
  storage
  // dest: '/files'
})

const koaMulterUploader = upload.single('file')

export default koaMulterUploader
