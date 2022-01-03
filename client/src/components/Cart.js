import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {Container,Row,Col,Button} from 'react-bootstrap';
import '../App.css';
import {Link} from 'react-router-dom';
import {placeOrderError,placeOrderPending,placeOrderSuccess} from '../actions/placeorder';
import CartItem from './CartItem';

function Cart(props) {

    //for handling response errors
    function handleErrors (response) {
        if (!response.ok) {
            throw Error(response.text());
        }
        return response.json();
    }

    //event listener for placeorder button
    const placeOrder = () =>{
        let restaurant = props.restaurants.filter(item=> item._id ===  props.restaurantID); 
        
        //fetch for placing order 
        props.placeOrderPending();
        fetch('http://localhost:3200/order',
        {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'auth-token': localStorage.getItem('user-token'),
              'Content-Type': 'application/json'
          },
          body : JSON.stringify({order : props.cart,restaurantID : props.restaurantID,restaurantName: restaurant[0].name })
        }).then(handleErrors)
        .then(function(myJson) {
            props.placeOrderSuccess(myJson);
        }).catch(function(error){
            props.placeOrderError(error);
        });
    }

    return (
        <Container>
                {
                   props.cart && props.cart.length === 0 ? <div><h4>There are No Items Inside Your Cart</h4><div><Link to='/store'><Button>Explore</Button></Link></div></div> : <div></div>}
                {
                    props.cart && props.cart.map(cartItem=>{
                        return <Container key={cartItem._id}><CartItem   cartItem = {cartItem} ></CartItem><hr></hr></Container>
                    })
                }
                    <Row style={{margin:'15px'}}>
                        
                        <Col md={{span:3,offset:9}}> { props.cart.length >0 ? <Button onClick={placeOrder}>Place Your Order</Button> : <div></div>}</Col>
                    </Row>
                
        </Container>
    )
}

const mapStateToProps = state => {
    const {cart,restaurantID,restaurants} = state.reducer;
    return {cart,restaurantID,restaurants};
}

const mapDispatchToProps = dispatch => {
        return{
            placeOrderPending: () => dispatch(placeOrderPending()),
            placeOrderError : (error) => dispatch(placeOrderError(error)),
            placeOrderSuccess : () => dispatch(placeOrderSuccess()),
        }    
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart)