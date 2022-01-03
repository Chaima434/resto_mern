import React from 'react';
import {connect} from 'react-redux';
import {Row,Col,Card,Container,Image,Button} from 'react-bootstrap';
import {removeFromCart} from '../actions/addtocart';
import {addFoodQuantity,removeFoodQuantity} from '../actions/addquantity';
import {useEffect} from 'react';
import '../App.css';

//component for individual cart items
const CartItem = (props) =>{
    const {cartItem,removeFromCart} = props;
    //find if item is present inside the cart or not
    let item =props.cart.find( item => item._id === props.cartItem._id);
    
        //increment the quantity
    const addQuantity = () =>{
        const item = {
            ...props.cartItem,
            quantity : props.quantity
        }
        props.addFoodQuantity(item);
    }

        //decrement the quantity
    const removeQuantity = ()=>{
        const item = {
            ...props.cartItem,
            quantity : props.quantity
        }
        props.removeFoodQuantity(item);
        
    }

    //onremove remove from cart 
    const removeItem = () =>{
        props.removeFromCart(item);
    }

    //check if quantity is 0 and remove from the cart
    useEffect(() => {
        console.log('this ran in cart');
        if(cartItem.quantity === 0){
             removeFromCart(item);
        }
    }, [item])

   return (
        <Card style={{padding:'10px',marginTop : '5px'}}>
            <Container>
            <Row>
                <Col md={3}><Image className="cart_image"/> </Col>
                <Col md={2}><h5>{props.cartItem.name}</h5></Col>
                <Col md={{span:4,offset:3}}>
                        <Row>
                            <Col md={{span:8,offset:3}}><h5>Price:  Rs.{props.cartItem.price}</h5></Col>
                        </Row>
                        <Row style={{margin:'15px'}}>
                            <Col md={4}>Quantity</Col>
                            <Col md={3}>
                                <center>
                                    <Button   className='btn btn-secondary' onClick={addQuantity}>+</Button>
                                </center>
                            </Col>
                            <Col md={2}>
                                <center>
                                    <h6>{props.cartItem.quantity}</h6>
                                </center>
                            </Col>
                            <Col md={3}><center><Button className='btn btn-secondary' onClick={removeQuantity}>-</Button></center></Col>
                        </Row>
                        <Row>
                            <Col md={{span:7,offset:4}}><center><Button className='btn btn-danger' onClick={removeItem}>Remove</Button></center></Col> 
                        </Row>
                </Col>
            </Row>
            </Container>
            </Card>
            )
} 

const mapStateToProps = state=>{
    const {cart} = state.reducer;
    const newState = {cart};
    return newState;
}

const mapDispatchToProps = dispatch =>{
    return {
        addFoodQuantity : (item) => dispatch(addFoodQuantity(item)),
        removeFoodQuantity : (item) => dispatch(removeFoodQuantity(item)),
        removeFromCart : (item) => dispatch(removeFromCart(item))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartItem);