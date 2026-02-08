import express from 'express';
import ffmpeg from 'fluent-ffmpeg';

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send("Hello World!");
})

app.post('/process-video', (req, res) => {
  const inputFilepath = req.body.inputFilepath;
  const outputFilepath = req.body.outputFilepath;

  if (!inputFilepath) {
    res.status(400).send("Bad request: missing input file path")
  }
  if (! outputFilepath) {
    res.status(400).send("Bad request: missing output file path")
  }

  ffmpeg(inputFilepath)
    .outputOptions('-vf', 'scale=-1:360') // 360p
    .on('end', function() {
        console.log('Processing finished successfully');
        res.status(200).send('Processing finished successfully');
    })
    .on('error', function(err: any) {
        console.log('An error occurred: ' + err.message);
        res.status(500).send('An error occurred: ' + err.message);
    })
    .save(outputFilepath);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});