import React from 'react';
import {Container,Row,Col,Card} from 'react-bootstrap';
import '../App.css';
import {Link} from 'react-router-dom';

//component for individual order item
const OrderItem = (props) =>{

        let totalprice = 0;
        return (
            <Card style={{marginTop:'10px'}}>
            { props.order === undefined? <div></div> : props.order.map(orderItem=>{
                totalprice +=parseInt(orderItem.price);
               return  (<Container key={orderItem._id} style={{paddingTop:'10px'}}>
                            <Row>
                                <Col md={4}>
                                    <h5>{orderItem.name}</h5>
                                </Col>
                                <Col md={{span:3,offset:5}}>
                                    <h6>Price: Rs. { orderItem.price}</h6>
                                    </Col>
                            </Row>
                            <Row>
                                <Col md={{span:3,offset:9}}>
                                    <h6>Quantity: {orderItem.quantity}</h6>
                                </Col>
                            </Row>
                            <hr></hr>
                        </Container>)
            })}
            <Container style={{paddingTop:'2px',paddingBottom:'10px'}}>
                <Row>
                
                    <Col md={{span:4}}>
                        <Link to={`/store/${props.id}`}><h6> From {props.restaurant}</h6></Link>
                    </Col>
                    <Col md={{span:4,offset:4}} >
                        <h5> Total Price: {totalprice}</h5>
                    </Col>
                </Row>
            </Container>
            </Card>
        );
    
}

export default OrderItem;