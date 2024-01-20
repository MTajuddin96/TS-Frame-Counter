import express from 'express';



export const uploadFile = async (req: express.Request, res: express.Response) => {
  try {
    const files: any = req.files
    let $Promises:Promise<{ frameCount: number, file: string }>[] = []

    Object.keys(files).forEach(async key => {
      return $Promises.push(countFrames(files[key]));
    })
    const data = await Promise.all($Promises)



    return res.status(200).json({ "data": data[0] }).end() // for sigle files
    // return res.status(200).json({ data }).end() // for multiple files

  } catch (error) {
    console.log(error);

    return res.sendStatus(400);
  }
}

async function countFrames(file: any): Promise<{ frameCount: number, file: string }> {
  try {
    const syncPattern = Buffer.from([0xFF, 0xFB]); // MP3 frame synchronization pattern
    const mp3Buffer = file.data
    let frameCount = 0;
    let searchingForSync = true;

    for (let i = 0; i < mp3Buffer.length - 1; i++) {
      if (searchingForSync && mp3Buffer[i] === syncPattern[0] && mp3Buffer[i + 1] === syncPattern[1]) {
        frameCount++;
        searchingForSync = false;
      } else if (mp3Buffer[i] === 0xFF && (mp3Buffer[i + 1] & 0xE0) === 0xE0) {
        // Possible start of a new frame, continue searching for sync
        searchingForSync = true;
      }
    }



    return ({ frameCount, file: file.name });
  } catch (error) {
    throw new Error(`Error reading MP3 file: ${error.message}`);
  }
}
