var max = 512;
var firstDir = "upload/";
var d1 = 0;
var d2 = 0;
var f = 0;

var fs = require('fs');
const replace = require('replace-in-file');



function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
};

function toStr(num){
	if(num<10){
		num="00"+num;
		return num;
	};
	if(num>=10 && num<100){
		num="0"+num;
		return num;
	}
	if(num>=100 ){
		return ""+num;
	}
};

function getFilePath(match){
	type =  getFileExtension(match);
	f++;
	if(f<=max){
		filePath = firstDir + toStr(d1) + "/" + toStr(d2)  + "/" + toStr(d1)+toStr(d2)+toStr(f)+'.' + type;
		return filePath;
	} else {
		f=0;
		d2++;
		if(d2<=max){
			filePath = firstDir + toStr(d1) + "/" + toStr(d2)  + "/" + toStr(d1)+toStr(d2)+toStr(f) + '.' + type;
			return filePath;
		} else{
			d1++;
			filePath = firstDir + toStr(d1) + "/" + toStr(d2)  + "/" + toStr(d1)+toStr(d2)+toStr(f)  + '.' + type;
			return filePath;
		}
	}
}
 

 
 
if(firstDir.length>0 && !fs.existsSync(firstDir)){
	fs.mkdirSync(firstDir);
};

 
const options = {
  files: ['isolux-desc.txt','isolux-desc2.txt'],
  from:  /(?=\w)([\w\/]+(?:\.png|\.jpg|\.jpeg|\.gif|\.xls|\.xlsx|\.rar|\.zip|\.doc|\.docx))|([\.\~\&\-\w\/]+(?:\.png|\.jpg|\.jpeg|\.gif|\.xls|\.xlsx|\.rar|\.zip|\.doc|\.docx))/gmi,
  to: function (match){
		var a;
	  	if (fs.existsSync(match)){
			newname = getFilePath(match);
			dir1 = toStr(d1)
			dir2 = toStr(d2)
			if(!fs.existsSync(firstDir+"/"+dir1)){
				
				fs.mkdirSync(firstDir+"/"+dir1);
			};
			if(!fs.existsSync(firstDir+"/"+dir1+"/"+dir2)){
				fs.mkdirSync(firstDir+"/"+dir1+"/"+dir2);
			};

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
  
  
