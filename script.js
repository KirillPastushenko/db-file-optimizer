var fs = require('fs');
 
function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
};


 
function doLine(line){
	 
	var art=line.substring(0,line.indexOf(','));
	var pattern = /(?=\w)([\w\/]+(?:\.png|\.jpg|\.jpeg|\.gif|\.xls|\.xlsx|\.rar|\.zip|\.doc|\.docx))|([\.\~\&\-\w\/]+(?:\.png|\.jpg|\.jpeg|\.gif|\.xls|\.xlsx|\.rar|\.zip|\.doc|\.docx))/gmi;
	var result1 = [];
	var result2 = [];
	var lng = 0;
	
	result1 = line.match(pattern);
	lng= result1.length;

	result1.forEach(function(item,i){
		ext = getFileExtension(String(item));
		index = i+1;
		newItem = "shop"+ art +"-"+ index + "." + ext;
		result2.push(newItem);
	});

	for(i=0; i<=lng;i++){

	  	if (fs.existsSync(result1[i])){
			fs.rename(result1[i], result2[i], (err) => {
				if (err) fs.appendFileSync('err.txt', `\n${err}`); 
			});
			fs.appendFileSync('log.txt', `\n${result1[i]} -> ${result2[i]}`); 
			
			line = line.replace(result1[i], result2[i]);
				console.log(line);
		} 		
	}
	fs.appendFileSync('result.txt', `\n${line}`); 
	return line;
	
	
};
 

 fs.readFile('isolux-images-add.csv', { encoding : 'utf8' },
  (err, data) => {
    if (err) fs.appendFileSync('err.txt', `\n${err}`); 
    data.split('\n').forEach(line => {
      doLine(line);
    });
  });
 
 

 
 
 
 