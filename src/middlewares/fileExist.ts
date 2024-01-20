import express from 'express'
const fileExists = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!req.files) return res.status(400).json({ message: 'Missing file' })
  next()
}

export default fileExists