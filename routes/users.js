const { response } = require('express');
var express = require('express');
var router = express.Router();
var con=require('../config/config')

/* GET users listing. */
router.get('/', function(req, res, next) {

  const images={
    img1:"https://images.pexels.com/photos/7657605/pexels-photo-7657605.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    img2:"https://images.pexels.com/photos/7657741/pexels-photo-7657741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    img3:"https://images.pexels.com/photos/8947145/pexels-photo-8947145.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  }
  sql="select * from product";
  sql2="SELECT COUNT(*) AS total FROM cart where `userID` = ?";
  if(req.session.user){
     var mailid=req.session.user.Email;
  }

  con.query(sql,(err,product)=>{
       if(err){
            console.log(err)
       }else{

          con.query(sql2,[mailid],(err,Result)=>{
               if(err){
                    console.log(err)
               }else{
                    var userData = req.session.user;
                    console.log("homepage root",userData)
                    console.log(Result)
                    var Total = Result[0].total;
                    res.render('user/home',{images,userData,Total,product})
               }
          })

       } 
  })  
});
router.get('/login',function(req,res,next){
     var msg=" ";
  res.render('user/log',{msg,homepage:true});
})
router.get('/registers',function(req,res,next){
     var msg=" ";
     res.render('user/Reg',{msg,homepage:true});
   })
 router.get('/cart/:Email',(req,res)=>{
      Email=req.params.Email;
      
      sql1="SELECT product.image,product.name,product.discription,product.price,cart.Qnty,cart.prodID,product.id,cart.cartId,cart.userID FROM product INNER JOIN cart ON cart.prodID=product.id WHERE userID=?"
          con.query(sql1,[Email],(err,result)=>{
               if(err){
                    console.log(err)
               }else{
                         var userData = req.session.user;
                    res.render('user/cart',{product:result,homepage:true,userData})
               }
          })
 })  
 router.get('/remove/:pid',(req,res)=>{
      pid=req.params.pid;
      usermail=req.session.user.Email;
      sql="delete from cart where prodID=? and userID=?";
      con.query(sql,[pid,usermail],(err,result)=>{
           if(err){
                console.log(err)
           }else{
                console.log("cart remove");
                res.redirect('/users/');
           }
      })
 })
 router.get('/buynow/:pid',(req,res)=>{
      var pid=req.params.pid;
      var Qnty=req.params.Qnty;
      var usermail=req.session.user.Email;
      var userData=req.session.user;
      console.log(pid);
      console.log(Qnty);
      var total;
      sql1="SELECT product.image,product.name,product.id,product.price,cart.Qnty FROM product INNER JOIN cart ON cart.prodID=product.id WHERE userID=? and prodID=?";
      con.query(sql1,[usermail,pid],(err,result)=>{
           if(err){
                console.log(err)
           }else{
                total=result[0].price * result[0].Qnty;
                console.log(total)
                res.render('user/buynow',{homepage:true,product:result[0],userData,total})
           }
      })

 })
 router.get('/directbuynow/:pid',(req,res)=>{
     var pid=req.params.pid;
     var usermail=req.session.user.Email;
     var userData=req.session.user;
     var total;
     console.log(pid);
     sql1=`select * from product where id=${pid}`;
     con.query(sql1,[pid],(err,result)=>{
          if(err){
               console.log(err)
          }else{
               total=result[0].price;
                res.render('user/buynow',{homepage:true,product:result[0],userData,total})
           }
      })

 })
 router.get('/myorder',(req,res)=>{
     var mail=req.session.user.Email;
     var userData=req.session.user;
     sql="SELECT product.name,product.discription,product.price,product.image,orders.amount FROM product INNER JOIN orders ON product.id = orders.prodID AND orders.userID=?;"
     con.query(sql,[mail],(err,result)=>{
       if(err){
         console.log(err)
       }else{
         console.log(result)
         res.render('user/myorder',{homepage:true,product:result,userData})
       }
     })
   })
 router.get('/paymentcard/:total/:id',(req,res)=>{
      var amount=req.params.total;
      var prodID=req.params.id;
      var userID=req.session.user.Email;
      var userData=req.session.user

      sql="insert into orders (userID,prodID) value (?,?)";
      con.query(sql,[userID,prodID],(err,result)=>{
           if(err){
                console.log(err)
           }else{
                console.log("order inserted")
                res.render('user/paymentcard',{homepage:true,amount})
           }
      })
 })
 router.post('/updatepay',(req,res)=>{
     var amount=req.body.amount;
     var userID=req.session.user.Email;
     var userData=req.session.user;
     sql="SELECT * FROM orders WHERE userID = ? ORDER BY id DESC;";
     sql2="update orders set amount=? where userID=? and id=?"
     con.query(sql,[userID],(err,result)=>{
          if(err){
               console.log(err)
          }else{
               console.log(result)
               var id = result[0].id;
               console.log(id)
               con.query(sql2,[amount,userID,id],(err,result)=>{
                    if(err){
                         console.log(err)
                    }else{
                         console.log("payment update");  
                         res.redirect('/users/');
                    }
               })
          }
     })
 })
router.post('/userlog',function(req,res,next){
     console.log(req.body);
     var sql="SELECT * FROM user WHERE Email=? and Password=?";
     var Email=req.body.Email;
     var Password=req.body.Password;
     con.query(sql,[Email,Password],(err,Result)=>{
          if(err)
          {
               console.log(err);
          } else{
               if(Result.length > 0){
                    console.log(Result);
               console.log(" Login Successfully");
               var msg="Login Successfully";
               req.session.user=Result[0];
               res.redirect('/users')
               }else{
               console.log("Emilid or Password you enterd is incorrect ");
               var msg="Emailid or Password you enterd is incorrect";
               res.render('user/log',{msg,homepage:true});  
               }
          }
     })
})
router.post('/uReg',(req,res)=>{
     console.log(req.body)
     
     var  data=req.body;
     var Email=req.body.Email;
     var sql1="SELECT * FROM user WHERE Email=?";
     var sql2="INSERT INTO user set ?";
     con.query(sql1,[Email],(err,Result)=>{
          if(err){
               console.log(err);
          }
          else{
               if(Result.length>0){
                    console.log("This EmailID is already exist");
                    var msg="This EmailID is already exist";
                    res.render('user/Reg',{msg,homepage:true});
               }
               else{
                    con.query(sql2, data, (err, Result) => {
                              if(err){
                                   console.log(err);
                              }
                              else
                              {
                                   console.log("Successfully Inserted");
                                   var msg="Successfully Inserted";
                                   res.render('user/Reg',{msg,homepage:true});
                              }
                     })
               }
          }
     })
    
})
router.get('/logout',(req,res)=>{
     req.session.destroy();
     res.redirect('/users');
})
router.get('/updateInfo/:Email',(req,res)=>{
     var email = req.params.Email;
     console.log(email);
      var sql3 = "SELECT * FROM user WHERE Email = ?";
      con.query(sql3,[email],(err,Result)=>{
           if(err){
                console.log(err)
           }
else{
     var userData = Result[0];
     res.render('user/updateinfo',{userData});
}
      })
     })
 router.post('/updateData',(req,res,next)=>{
      console.log(req.body)
      console.log(req.body.ID)
      var id = req.body.ID;
      sql= `update user set ? where ID=${id}`;
      sql2= `select * from user where ID=${id}`;
      con.query(sql,req.body,(err,Result)=>{
           if(err){
                console.log(err);
           }
           else{
                con.query(sql2,(err,row)=> {
               if(err){
                    console.log(err);
               }else{
                    req.session.user=row[0];
                    res.redirect('/users/');
               }

                })
           }
      })
     
      
 }) 
 router.get('/addtoCart/:pid',(req,res)=>{
      Pid=req.params.pid;
      usermail=req.session.user.Email;
      var Qntydata;
     sql1="select * from cart where userID =? and prodID = ?";
     sql2="update cart set Qnty = ? where prodID = ? and userID = ?";
      sql3="insert into cart (userID,prodID) values (?,?)";
      con.query(sql1,[usermail,Pid],(err,row)=>{
           if(err){
                console.log(err);
           }else{
                if(row.length>0){
                     console.log(row)
                     console.log("cart already added")
                     Qntydata= row[0].Qnty+1;
                      console.log(Qntydata);
                      con.query(sql2,[Qntydata,Pid,usermail],(err,Result)=>{
                           if(err){
                                console.log(err);
                           }
                           else{
                                console.log("cart updated");
                                res.redirect('/users/');
                           }
                      })
                }else{
                     con.query(sql3,[usermail,Pid],(err,Result)=>{
                          if(err){
                               console.log(err);
                          }else{
                               console.log("cart inserted");
                              res.redirect('/users/');

                          }
                     })
                }
           }
      })
 }) 


module.exports = router;