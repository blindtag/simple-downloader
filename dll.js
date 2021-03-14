//Import modules
const https = require('https');
const fs = require('fs');
const path = require('path')

const downloadFile=(url)=>{
    //Path to downloaded content
    const filename = path.basename(url);
    
    const req = https.get(url, (res)=>{
        //Using the file system to write stream
        const fileStream = fs.createWriteStream(filename);
        res.pipe(fileStream);
        
        //Upon error in creating the write stream
        fileStream.on('error', ()=>{
            console.log(`An error occured {error}`);
        })
    
        //When done writing
        fileStream.on('finish', ()=>{
            fileStream.close();
            console.log('done');
        })
    });

    //Any error in the request
    req.on('error', ()=>{
        console.log(`An error occured in your request`);
    });;
    
}
//Call the function downloadFile and pass a url to it with extention;
downloadFile('https://unsplash.com/photos/DntxQ-LNWSw.jpeg');