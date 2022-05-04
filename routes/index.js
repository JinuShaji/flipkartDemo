var express = require('express');
var router = express.Router();
var con=require('../config/config');

/* GET home page. */
router.get('/', function(req, res, next) {

const images={
  img1:"https://th.bing.com/th/id/OIP.hjZtIcknYScvdNMCKTpfvgHaIw?w=133&h=180&c=7&r=0&o=5&pid=1.7",
  img2:"https://rukminim1.flixcart.com/image/416/416/ktketu80/mobile/r/m/8/iphone-13-pro-max-mllj3hn-a-apple-original-imag6vpgphrzuffg.jpeg?q=70",
  img3:"https://rukminim1.flixcart.com/image/416/416/k2jbyq80pkrrdj/mobile-refurbished/c/u/e/iphone-11-pro-512-u-mwcd2hn-a-apple-0-original-imafkg2fhzhzzh5s.jpeg?q=70"
}

sql="select * from product";
  con.query(sql,(err,Result)=>{
       if(err){
            console.log(err)
       }else{
        res.render('admin/index',{images,product:Result});
       }
  })
// const img=[
//   {
//       imglink:"https://rukminim1.flixcart.com/image/416/416/ke0a7ww0/mobile/4/r/e/mi-redmi-9-prime-m2004j191-original-imafushhfhy3tbp9.jpeg?q=70",
//       name:"Redmi 9 Prime (MintGreen, 64 GB)  (4 GB RAM)",
//       dis:"13MP quad rear camera, ultra-wide, macro, portrait, AI scene recognition, HDR, pro mode | 8 MP front camera 16.58 centimeters (6.53-inch) FHD",
//       price:"15000"
// },
// {
//       imglink:"https://rukminim1.flixcart.com/image/416/416/kjlrb0w0/mobile/n/y/8/vivo-y20a-v2052-original-imafz4z8z2hqhy4z.jpeg?q=70",
//       name:"vivo Y20A 2021 (Dawn White, 64 GB)  (3 GB RAM)",
//       dis:"13MP + 2MP + 2MP | 8MP Front Camera",
//       price:"18000"
// },
// {
//      imglink:"https://rukminim1.flixcart.com/image/416/416/kah413k0/mobile/z/m/g/samsung-galaxy-m21-b07hgjj55il-original-imafsfewggf3dqwc.jpeg?q=70",
//      name:"Samsung Galaxy M21 2021 Edition",
//      dis:"Monster 6000 mAh Battery | Memory, Storage & SIM: 4GB RAM | 64GB internal memory expandable up to 512GB| SIM 1 + SIM 2 + MicroSD",
//      price:"17500"
// },
// {
//      imglink:"https://rukminim1.flixcart.com/image/416/416/knni7ww0/mobile/3/v/s/a54-cph2239-oppo-original-imag2aycn2mzch4x.jpeg?q=70",
//      name:"OPPO A54 (Starry Blue, 128 GB)",
//      dis:"16.54 cm (6.51 inch) HD+ Display",
//      price:"16000"
// }
// ]
// const lap=[
// {
//      imglink:"https://th.bing.com/th/id/OIP.9DR1iDcU6GCFg-JfgnnnfQHaE2?w=279&h=183&c=7&r=0&o=5&pid=1.7",
//      name:"HP 14s-DQ2535TU Laptop",
//      dis:"11th Gen Intel Core i5-1135G7 Processor"
// },
// {
//       imglink:"https://rukminim1.flixcart.com/image/416/416/kvba7bk0/computer/6/a/d/-original-imag88m5enqeq2we.jpeg?q=70",
//       name:"Asus BQ312TS Laptop",
//       dis:"Free upgrade to Windows 11* when available"
      
// },
// {
//       imglink:"https://www.reliancedigital.in/medias/Dell-5410-Laptops-491997011-i-1-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wzNDQxMjh8aW1hZ2UvanBlZ3xpbWFnZXMvaDBhL2gwZS85NjE0NzE3MDkxODcwLmpwZ3xkOTYyZmYzMWU0YWFkZGE5OGZmMTI4YzQ3NDEwNmYxZjIzNWEzMmMxMDRlZjI4OTNhODMxYzZjZDMzZDg0MmI3",
//       name:"Dell 5401 Inspiron 14 2-in-1 Convertible Laptop ",
//       dis:"11th Gen Intel Core i5-1135G7/8GB/512GB SSD/Intel Iris Xe Graphics/Windows 10/MSO/FHD, 35.56 cm (14 inch)"
// },
// {
//      imglink:"https://www.reliancedigital.in/medias/Lenovo-82H700KYIN-Laptops-491996941-i-1-1200Wx1200H?context=bWFzdGVyfGltYWdlc3w3MDM5NDF8aW1hZ2UvanBlZ3xpbWFnZXMvaGE1L2gyZC85NTgyODgzMzQwMzE4LmpwZ3xjZGQ0OWM1M2M4MDc0MGY3NDI4Yzg0ZDNjZTdkMTExMzAwODgxNmVmOTk1MGZiMWVkZGVlZjVmYTkxMDQxYjNj",
//      name:"Lenovo KYIN IdeaPad Slim 3i Laptop",
//      dis:"11th Gen Intel Core i5-1135G7/8GB/512GB SSD/Intel Iris Xe Graphics/Windows 10/MSO/Full HD, 35.6 cm"
// }



// ]

  
});


router.get('/about',function(req,res,next){
     res.render('about');
})
router.get('/addProducts',function(req,res,next){
     res.render('admin/addProduct');
})
router.get('/login',function(req,res,next){
     res.render('admin/adminLog')
   })
   router.get('/register',function(req,res,next){
     res.render('admin/adminReg')
   })

   router.post('/adReg',function(req,res,next){
     console.log(req.body);
   })
   router.post('/adLog',function(req,res,next){
     console.log(req.body);
   })
   router.post('/addpro', function(req, res, next) {
    console.log(req.files)
    if (!req.files) {
      return res.status(400).send("No files are uploaded");
    }
    var file = req.files.uploaded_img;
    var img_name = file.name;
    let sql="insert into product set ?";
        if(file.mimetype == 'image/jpeg'||file.mimetype=='image/png'){
          file.mv("public/images/product/"+ file.name,function(err){
            if(err){
              console.log(err)
            }else{
              let data=  {
                name:req.body.name,
                discription:req.body.dis,
                price:req.body.price,
                image:img_name,
              };
              console.log(data)
              con.query(sql,data,(err,result)=>{
                if(err){
                  console.log(err)
                }else{
                  console.log("success")
                  res.redirect('/')
                }
              })
            }
          })
        }
   });

module.exports = router;



/*
var img_name;
    console.log("-------------------------")
     console.log(req.files)
     if (!req.files) {
       return res.status(400).send("No files are uploaded");
     }
     var file = req.files.uploaded_img;
     var img_name = file.name;
     let sql="insert into product set ?";

     console.log(img_name);
     if(
       file.mimetype == "image/jpg" ||
       file.mimetype == "image/png" ||
       file.mimetype == "image/gif" 
       
     ){
       file.mv("public/images/product/"+file.name,function(err){
         if(err)return res.status(500).send(err);
         console.log(img_name);

         let data=  {
           name:req.body.name,
           discription:req.body.dis,
           price:req.body.price,
           image:img_name,
         };
         con.query(sql,data,(err,result)=>{
           if(err){
             console.log(err)
           }else{
             res.redirect('/')
           }
         })
       })
     }

*/