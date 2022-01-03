const router = require('express').Router();
const User = require('./models/Users');
const Restaurants = require('./models/Restaurants');
const UserCart = require('./models/Usercart');
const FoodItems = require('./models/Fooditems');
const Order = require('./models/Orders');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const verifyUser = require('./verifyToken'); 

dotenv.config();

router.post('/register', async (req,res)=>{
    const emailExist = await User.findOne({email : req.body.email});
    if(emailExist) return res.status(400).send({error:'Email already exists'});
    const user = new User({
        username : req.body.username,
        password : req.body.password,
        email : req.body.email
    })

    try{
        const savedUser  = await user.save();
        res.send(user);
    }catch(err){
        res.status(400).send(err);
    }
})

router.post('/restaurants',async (req,res)=>{

    const restaurants = await Restaurants.find({});
    if(restaurants){
        try{
            res.send(restaurants);
        }catch(err){
            res.status(400).send(err);
        }
    }

})


router.post('/order',verifyUser,async(req,res)=>{
    console.log('order found'+req.body.order);
    const order = new Order({
        order : req.body.order,
        user_id : req.user._id,
        restaurant_id : req.body.restaurantID,
        restaurant_name : req.body.restaurantName
    })

    try{
        const savedOrder  = await order.save();
        res.send(order);
    }catch(err){
        res.status(400).send(err);
    }
})


router.post('/cart',verifyUser,async(req,res)=>{
    console.log('request arrived here');
    const cartExists =await UserCart.findOne({user_id :  req.user._id});
    const cart = new UserCart({
            user_id : req.user._id,
            cart : req.body.cart
        });
        if(!cartExists){
            try{
                const savedCart  = await cart.save();
                res.send(cart);
            }catch(err){
                res.status(400).send(err);
            }
        }else{
            await UserCart.updateOne({user_id: req.user._id},{cart:req.body.cart});
            res.send(cart);
        }
   
    
})

router.get('/getcart',verifyUser,async(req,res)=>{

    const cart = await UserCart.findOne({ user_id : req.user._id });
    console.log('our cart for getcart is as follows'+cart);
    try{
        res.send(cart);
    }catch(err){
        res.status(400).send(err);
    }
})



router.get('/order',verifyUser,async(req,res)=>{

    const orders = await Order.find({user_id : req.user._id});
    
    try{
        res.send(orders);
    }catch(err){
        res.status(400).send(err);
    }
})

router.post('/food',async(req,res)=>{
    const items = await FoodItems.find({link : req.body.link})

   
    if(items){
        try{
            res.send(items);
        }catch(err){
            res.status(400).send(err);
        }
    }
})
router.post('/login', async (req,res)=>{
    
    const user = await User.findOne({username : req.body.username, password : req.body.password});

    if(user){
        const token = jwt.sign({_id : user._id},process.env.SECRET);
        try{
            //res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>'])
            res.append('auth-token', token)

            res.send({user:user._id});
            console.log(res.headersSent);
        }catch(err){

            res.send({error:'Something Went Wrong!'});
        }
    }else{
        res.send({error:'Incorrect Username or Password!'});
    }

    
})

module.exports= router;

