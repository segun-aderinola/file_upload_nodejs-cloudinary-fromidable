const express = require('express');
const cloudinary = require('cloudinary').v2;
const formidable = require('formidable')
const app = express();
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

// Cloudinary Configuration 
cloudinary.config({
    cloud_name: "deh3s35go",
    api_key: "829139173439115",
    api_secret: "xfW-wIuRidX52RVOEI5TwYRws_s"
  });

app.get('/', (req, res)=>{
    // Generate images

  cloudinary.search.expression(

    'folder:image_upload_system/*', // add your folder
    ).sort_by('public_id','desc')
    .max_results(30).execute()
    .then(result=>{
        // console.log(result.resources);
        res.render('index', { status: 1, 'images': result.resources})
})    
})



app.post('/', (req, res)=>{
   
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

    const filename = files.upload_file.originalFilename;
    
    const path = files.upload_file.filepath;
            
    cloudinary.uploader.upload(path, {folder: 'image_upload_system', public_id: filename}, result =>{
        res.render('index',{ status: 0})
    });
    
})
})


app.use((req, res)=>{
    res.status(404).redirect('/')
});




// start the server
app.listen(3000 || process.env.PORT, (err)=>{
    console.log(`Server running on 3000`)
})