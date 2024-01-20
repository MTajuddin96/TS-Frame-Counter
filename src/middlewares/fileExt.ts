import express from 'express'
import Path from 'path'


const fileExt = (allowedExt: [String]) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const files: any = req.files

    const fileExts: string[] = []

    Object.keys(files).forEach(key => {
      fileExts.push(Path.extname(files[key].name))
    })

    const allowed = fileExts.every(ext => allowedExt.includes(ext))
    if (!allowed) {
      res.status(422).json({message:`Upload Failed. Only upload ${allowedExt.toString()} format`})
    }

    next()
  }
}


export default fileExt