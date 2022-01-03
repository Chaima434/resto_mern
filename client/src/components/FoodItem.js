import {Col,Image,Container,Card,Row} from 'react-bootstrap';
import React,{Suspense} from 'react';
import {addToCart,removeFromCart} from '../actions/addtocart';
import {addFoodQuantity,removeFoodQuantity} from '../actions/addquantity';
import {connect} from 'react-redux';
import '../App.css';
const CartButton = React.lazy(()=>import('./CartButton'));

const FoodItem = (props)=>{

        //find if item is present inside the cart or not
    let item =props.cart.find( item => item._id === props.item._id);
    
        //add To cart If not present already
    const addCart = () => {
       props.matchBoolean ? props.addtocart(props.item,props.path) : props.openModal()
    }

    //for handling response errors
    function handleErrors (response) {

    //    console.log(response.ok+'got the response');
        if (!response.ok) {
            throw Error(response.text());
        }
        return response.json();
    }
      
    

        //increment the quantity
    const addQuantity = () =>{
        const item = {
            ...props.item,
            quantity : props.quantity
        }
        props.addFoodQuantity(item);
    }
        //decrement the quantity
    const removeQuantity = ()=>{
        const item = {
            ...props.item,
            quantity : props.quantity
        }
        props.removeFoodQuantity(item);   
    }

    //remove item from cart
    const removeItem = () =>{
        props.removeFromCart(item);
    }

        //see if  item is inside cart or not then only use quantity
    let quantity = -10;
    if(item !== undefined){
        quantity = item.quantity;
            //if item quantity is 0 remove From cart
        if(item.quantity === 0){
            props.removeFromCart(item);
        } 
    }else{
        quantity = -1;
    }
    // <Col md={3}>
    //     <Card className='cardFood'>
    //         <Row>
    //             <Col>
    //                 <Image className='image_new' ></Image>
    //             </Col>
    //         </Row>
    //         <Row style={{marginTop:'5px'}}> 
    //             <Col>
    //                 <h6 className='pricetag'>{props.item.name}</h6>
    //             </Col>
    //         </Row>
    //         <Row>
    //             <Col>
    //                 <h6 className='pricetag' >Rs. {props.item.price}</h6>
    //             </Col>
    //         </Row>
    //         <Suspense fallback={<div>Loading...</div>}>  
    //                     <CartButton condition={item!==undefined} addCart={addCart} quantity={quantity} addQuantity = {addQuantity} removeQuantity = {removeQuantity}
    //                                 removeItem = {removeItem}
    //                     ></CartButton>       
    //          </Suspense>
    //          </Card>
    //     </Col>

    return (
            <Row>
            <Col md={12} className='category_row'>
                <Card className='cardCategoryRow'>
                        <Row>
                            <Col md={2}>
                                <Image className='image_row_new' ></Image>
                            </Col>
                            <Col md={4}>
                                <Row>
                                    <Col>
                                        <h6 className='pricetag'>{props.item.name}</h6>
                                    </Col>
                                </Row>
                                <Row>
                                <Col>
                                    
                    <h6 className='pricetag' >Rs. {props.item.price}</h6>
                                </Col>
                                </Row>
                            </Col>
                            <Col className='cartButton_new' md={{span:3,offset:3}} >
                                
                            <Suspense fallback={<div>Loading...</div>}>  
                                        <CartButton  condition={item!==undefined} addCart={addCart} quantity={quantity} addQuantity = {addQuantity} removeQuantity = {removeQuantity}
                                                    removeItem = {removeItem}
                                        ></CartButton>       
                            </Suspense>
                            </Col>
                        </Row>
                </Card>
            </Col>
            </Row>
        
    );
}

const mapStateToProps = state=>{
    const {cart,restaurantID,loggedIN} = state.reducer;
    const newState = {cart,restaurantID};
    return newState;
}

const mapDispatchToProps = dispatch =>{
    return {
        addtocart : (item,id) => dispatch(addToCart(item,id)),
        addFoodQuantity : (item) => dispatch(addFoodQuantity(item)),
        removeFoodQuantity : (item) => dispatch(removeFoodQuantity(item)),
        removeFromCart : (item) => dispatch(removeFromCart(item)), 
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FoodItem);