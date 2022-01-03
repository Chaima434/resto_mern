import React from 'react';
import {Container,Row,Col,Button} from 'react-bootstrap';
import {Icon} from 'semantic-ui-react';
import '../App.css';
const CartButton = (props)=>{

const {condition} = props;

return (      <>
            {  condition ? 
                <Container >
                     <Row  >
                        <Col md={4} >
                            <center>
                                <Button className='btn cartButtonsChange' onClick={props.addQuantity}>+</Button>
                            </center>
                        </Col>
                        <Col md={4}><h5 className='quantityHeader'>{props.quantity}</h5></Col>
                        <Col md={4}>
                            <center>  <Button className='btn cartButtonsChange' onClick={props.removeQuantity}>-</Button>
                            </center>
                        </Col>
                    </Row>
                        <Row >
                            <Col>
                               
                            <Icon size='large' className='item_delete'  name='trash alternate' color='red' onClick={props.removeItem} /> 
                            </Col>
                        </Row>
                    </Container>
                        :
                    <Button  onClick={props.addCart} className='cartButton'>ADD TO CART</Button>                  
            }
            </>
                    
    )
}

export default CartButton;