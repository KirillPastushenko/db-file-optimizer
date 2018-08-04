var f = 1;
var fs = require('fs');
const replace = require('replace-in-file');



function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
};


function getFilePath(match){
	type =  getFileExtension(match);
	f++;
	filePath = 'shop'+f+'.' + type;
	return filePath;

}
 


const options = {
    files: [
		'isolux-images.txt'
	],
  from:  /(?=\w)([\w\/]+(?:\.png|\.jpg|\.jpeg|\.gif|\.xls|\.xlsx|\.rar|\.zip|\.doc|\.docx))|([\.\~\&\-\w\/]+(?:\.png|\.jpg|\.jpeg|\.gif|\.xls|\.xlsx|\.rar|\.zip|\.doc|\.docx))/gmi,
  to: function (match){
		var a;
	  	if (fs.existsSync(match)){
			newname = getFilePath(match);
			fs.rename(match, newname, (err) => {
				if (err) fs.appendFileSync('err.txt', `\n${err}`); 
			});
			fs.appendFileSync('log.txt', `\n${match} -> ${newname}`); 
 			return newname;
		} else {
			return match;
		}
	  
 	  
  },
  encoding: 'utf8'
};
 
replace(options)
  .then(changes => {
    console.log('Modified files:', changes.join(', '));
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });
  
  
