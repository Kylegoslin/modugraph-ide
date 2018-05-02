
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

console.log("url is" + request.url);

//var url_parts = url.parse(request.url, true);
var filename = request.param('file');
fs.readFile('C:\\Users\\Kyle\\Desktop\\modgraph\\user\\'+filename, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});

};

exports.getFiles = function(){ 

   console.log("listing files..");
   var path = 'C:\\Users\\Kyle\\Desktop\\modgraph\\user\\';
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