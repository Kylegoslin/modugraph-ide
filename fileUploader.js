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
var fs = require('fs');
var url = require('url');

//
// File uploader window.
// This is used for all file types
exports.uploaderWindow = function () {
    return `


        <html>
          <body>
            <form ref='uploadForm' 
              id='uploadForm' 
              action='http://localhost:3000/upload' 
              method='post' 
              encType="multipart/form-data">
                <input type="file" name="sampleFile" />
                <input type='submit' value='Upload!' />
            </form>     
          </body>
        </html>
        `;


};

// -------------------------------------------------------
//
// Read the contents of a file
// -------------------------------------------------------
exports.readFileContents = function(request, result){ 


   var filename = request.param('file');

   var contents = fs.readFileSync('C:\\Users\\Kyle\\Desktop\\modugraph-ide\\user\\'+filename).toString();
   return contents;
};


// --------------------------------------------------------
//
// Run Python engine
//
// --------------------------------------------------------
exports.runEngine = function(request, result){ 

  var flags = request.param('flags');
  var configFile = request.param('configfile');
  
  
  console.log("Flags--"+flags);
  console.log("Config File--"+configFile);
  /*


// Run the python script for this module
const { exec } = require('child_process');
exec('python.exe pyrunners/stripNonAlpha.py user/'+filename, (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    console.log('didnt run..');
    return;
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`);
  dump = (`stdout: ${stdout}`);

  console.log(`stderr: ${stderr}`);
});
*/




var child = require('child_process').exec('python.exe pyrunners/engine.py '+flags+' '+configFile)
child.stdout.pipe(process.stdout)
child.on('exit', function() {
  console.log("fin");
  

})




   //var filename = request.param('file');

   //var contents = fs.readFileSync('C:\\Users\\Kyle\\Desktop\\modugraph-ide\\user\\'+filename).toString();
   //return contents;
};
//Create a list of the files that are 
//currently available to work with.
exports.getFiles = function(){ 

   console.log("listing files..");
   var path = 'C:\\Users\\Kyle\\Desktop\\modugraph-ide\\user\\';
   var ff = 'Files<br>'
   var fs = require('fs'),
   files = fs.readdirSync(path);

   files.forEach(function(file) {
      //var contents = fs.readFileSync(__dirname + '/files/' + file, 'utf8');
      console.log(file);
      ff = ff + file + '<input type="radio" name="selectedFile" value="'+file+'"><br>';
}) 
    
    return (ff) ;
 };