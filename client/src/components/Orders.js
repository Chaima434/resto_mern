import React from 'react';
import {connect} from 'react-redux';
import {Container,Button} from 'react-bootstrap';
import '../App.css';
import {Link} from 'react-router-dom';
import {fetchOrderError,fetchOrderPending,fetchOrderSuccess} from '../actions/fetchallorders';
import OrderItem from './OrderItem';
import {useEffect} from 'react';

function Orders(props) {
    const {fetchOrderError,fetchOrderPending,fetchOrderSuccess} = props;    

    useEffect(() => {
        //fetch all past orders for user
    const fetchOrders = () =>{
            console.log('got the orders');
            //for handling response errors
            function handleErrors (response) {
                if (!response.ok) {
                    throw Error(response.text());
                }
                return response.json();
            }

            fetchOrderPending();
            fetch('http://localhost:3200/order',
            {
                method: 'get',
                headers: {
                'Accept': 'application/json',
                'auth-token': localStorage.getItem('user-token'),
                'Content-Type': 'application/json'
            }
            }).then(handleErrors)
            .then(function(myJson) {
                fetchOrderSuccess(myJson);
            }).catch(function(error){
                console.log(error+'no internet');
                
                fetchOrderError(error);
            });
        }
        fetchOrders();    
    }, [fetchOrderError,fetchOrderPending,fetchOrderSuccess])

    return (
        <Container>
                {
                   props.orders &&  props.orders.length===0 ? <div><h4>Currently You Have No Orders!</h4><div><Link to='/store'><Button>Explore</Button></Link></div></div> : <div></div>}
                {
                    props.orders && props.orders.map(item=>{ 
                        return <Container key={item._id}><OrderItem  restaurant={item.restaurant_name} id={item.restaurant_id} order = {item.order} ></OrderItem><hr></hr></Container>
                    })
                }
        </Container>
    )
}

const mapStateToProps = state => {
    const {orders} = state.reducer;
    return {orders};
}

const mapDispatchToProps = dispatch => {

        return{
            fetchOrderPending: () => dispatch(fetchOrderPending()),
            fetchOrderError : (error) => dispatch(fetchOrderError(error)),
            fetchOrderSuccess : (orders) => dispatch(fetchOrderSuccess(orders))
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders);