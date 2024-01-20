import express from 'express'


const MB = 5;
const SIZE_LIMIT = MB * 1024 * 1024

const sizeLimiter = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const files: any = req.files

  const limitExceeded = []

  Object.keys(files).forEach(key => {
    if (files[key].size > SIZE_LIMIT) {
      limitExceeded.push(files[key].name)
    }
    if (limitExceeded.length) {
      return res.status(413).json({ message: 'Files are over 5mb limit' })
    }
    next()
  })
}

export default sizeLimiter