/*
----------------------------------------------------------------------
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

Copyright 2018 Dr.Kyle Goslin, Dr. Markus Hofmann
Institute of Technology Blanchardstown
----------------------------------------------------------------------
*/

const express = require('express')
const fileUpload = require('express-fileupload');
const app = express()
var fs = require('fs');


// Change this to suit the current dirictory
var mgRoot = 'C:\\Users\\Kyle\\Desktop\\modugraph-ide\\';

// If the tmp folder doesn't exist then
// make it. It will be ignored during the
// commit to git.
var dir = './tmp';
console.log("Checking if tmp folder exists..")
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
    console.log("no tmp folder... creating..");
}

// this file has a list of different functions
// that can be used on the server side.
var up = require('./server_functions');

app.use('/pub', express.static('pub'))
app.use(fileUpload());



app.get('/', (req, res) => res.send('<a href="pub/dashboard.html">Dashboard</a>'))
app.get('/file', (req, res) => res.send(up.uploaderWindow()))
app.get('/getfiles', (req, res) => res.send(up.getFiles()))
app.get('/readFileContents', (req, res) => res.send(up.readFileContents(req, res)))
app.get('/runEngine', (req, res) => res.send(up.runEngine(req, res)))
app.get('/login', (req, res) => res.send('login...'))
app.get('/getlog', (req, res) => res.send(up.getLog()))
app.get('/output', (req, res) => res.send(up.readOutput()))
app.get('/saveConfig', (req, res) => res.send(up.saveConfig(req,res)))

 
app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
 
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(mgRoot+'\\user\\'+sampleFile.name, function(err) {
    if (err)
      return res.status(500).send(err);
     
    console.log("file uploaded"); 
    res.send('File uploaded!');
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))