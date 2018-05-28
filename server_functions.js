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

// These are hard coded for the moment
// will change in the future.
var mgRoot = 'C:\\Users\\Kyle\\Desktop\\modugraph-ide\\';
var userPath = mgRoot + 'user\\';
var tempPath = mgRoot+ 'tmp\\';

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

//
// Function used for saving specific configuration
// variables to the user's config file in the
// /user folder
exports.saveConfig = function(request, result){ 


   var varname_val = request.param('varname');
   var option_val = request.param('option');
   
   // This currently just writes the first line, which is the file to load from the operator
   // this has to be improved to include other variables on other lines in the future.
   fs.writeFile(userPath+'\\settings\\config.cfg', 'user/'+option_val, function (err) {
  if (err) throw err;
  console.log('Saved!');
});

   
   
};
// -------------------------------------------------------
//
// Read the contents of a file by name.
// -------------------------------------------------------
exports.readFileContents = function(request, result){ 


   var filename = request.param('file');

   var contents = fs.readFileSync(userPath+filename).toString();
   return contents;
};


//
// Function for pulling in the contents of the raw output file for viewing.
//
exports.readOutput = function(request, result){ 


  

   var contents = fs.readFileSync(mgRoot+'\\tmp\\output.txt').toString();
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
  
   //
  // delete the proginal process_log file.
  //
   var path = tempPath+'process_log.txt';
  fs.stat(path, function (err, stats) {
  

   if (err) {
       return console.error(err);
   }

   fs.unlink(path,function(err){
        if(err) return console.log(err);
        console.log('file old log deleted successfully');
        exports.runEngineGo(request, result);
   });  
   });
 


// Stat the paython engine
// 
exports.runEngineGo = function(request, result){   
  
  
    exports.addToLog("Flags--"+flags);
    exports.addToLog("Config File--"+configFile);
  
  
    var child = require('child_process').exec('python.exe pyrunners/engine.py '+flags+' '+configFile)
    child.stdout.pipe(process.stdout)
    child.on('exit', function() {
      console.log("fin");
      exports.addToLog("Running Python Engine");
      exports.addToLog("------ Finished");

    })




   //var filename = request.param('file');

   //var contents = fs.readFileSync('C:\\Users\\Kyle\\Desktop\\modugraph-ide\\user\\'+filename).toString();
   //return contents;
};

};

//
// Get the contents of the log
// and make it web friendly.
exports.getLog = function(){
    
     var contents = fs.readFileSync(tempPath+'\\process_log.txt').toString();
   return contents;
};

exports.addToLog = function(tx){

    fs.appendFileSync(tempPath+"process_log.txt", tx+"<br>\r\n", function(err) {
    if(err) {
        return console.log(err);
    }

    
}); 
    
 };

//Create a list of the files that are 
//currently available to work with.
exports.getFiles = function(request, result){ 


//   var type = request.param('t');

   console.log("listing files..type");
  
   var ff = 'Files<br>';
   var fs = require('fs'),
   files = fs.readdirSync(userPath);

   files.forEach(function(file) {
      ff = ff + file + '<input type="radio" name="selectedFile" onclick="saveFileSelected()" id="selectedFile" value="'+file+'"><br>';
}) 
   ff = ff + '';
    return (ff) ;
 };