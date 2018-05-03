
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
        `+this.getFiles();


};

exports.readFileContents = function(request, result){ 


   var filename = request.param('file');


   var contents = fs.readFileSync('C:\\Users\\Kyle\\Desktop\\modugraph-ide\\user\\'+filename).toString();
   return contents;
};

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