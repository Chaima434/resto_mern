import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {Container,Row,Col,Button} from 'react-bootstrap';
import '../App.css';
import {Link} from 'react-router-dom';
import {placeOrderError,placeOrderPending,placeOrderSuccess} from '../actions/placeorder';
import CartItem from './CartItem';


//cart for guests
function CartGuest(props) {

    //for handling response errors
    function handleErrors (response) {
        if (!response.ok) {
            throw Error(response.text());
        }
        return response.json();
    }

    return (
        <Container>
                {
                  props.cart &&  props.cart.length === 0 ? <div><h4>There are No Items Inside Your Cart</h4><div><Link to='/store'><Button>Explore</Button></Link></div></div> : <div></div>}
                {
                    props.cart && props.cart.map(cartItem=>{
                        return <Container key={cartItem._id}><CartItem   cartItem = {cartItem} ></CartItem><hr></hr></Container>
                    })
                }
                    <Row style={{margin:'15px'}}>
                        
                        <Col md={{span:3,offset:9}}> { props.cart.length >0 ? <Button >Login To Order</Button> : <div></div>}</Col>
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
)(CartGuest)
