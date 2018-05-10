

const express = require('express')
const fileUpload = require('express-fileupload');

const app = express()



// Generic file uploader window (used for all files)
var up = require('./fileUploader');

app.use('/pub', express.static('pub'))
app.use(fileUpload());



app.get('/', (req, res) => res.send('Hello World! <a href="pub/dashboard.html">Dashboard</a>'))
app.get('/file', (req, res) => res.send(up.uploaderWindow()))

app.get('/getfiles', (req, res) => res.send(up.getFiles()))
app.get('/readFileContents', (req, res) => res.send(up.readFileContents(req, res)))


app.get('/stripFileContents', (req, res) => res.send(up.pyStripper(req, res)))

app.get('/login', (req, res) => res.send('login...'))



 
app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
 
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('C:\\Users\\Kyle\\Desktop\\modugraph-ide\\user\\'+sampleFile.name, function(err) {
    if (err)
      return res.status(500).send(err);
     
    console.log("file uploaded"); 
    res.send('File uploaded!');
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))