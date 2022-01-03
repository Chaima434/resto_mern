import React,{Suspense} from 'react'
import {useState,useEffect} from 'react';
import {Row,Container,Col} from 'react-bootstrap';
import {Header,Modal,Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {fetchFoodPending,fetchFoodError,fetchFoodSuccess} from '../actions/getfood';
import {cartEmpty} from '../actions/addtocart';
import {setCartPending,setCartSuccess,setCartError,cartUpdateDONE} from '../actions/setusercart';
import {Link} from 'react-router-dom';
import {debounce} from 'lodash';
import Filters from './Filters';
import '../App.css'

const FoodItem=React.lazy(()=>import('./FoodItem'));
 
function RestaurantList(props) {

    const [modalOpen, setmodalOpen] = useState(false);
    const [match, setmatch] = useState(false);
    const [list, setlist] = useState([]);
    const {restaurantID,fetchFoodError,fetchFoodPending,fetchFoodSuccess,cartUpdated} = props;

    //open the modal
    const handleOpen = ()=>{
        setmodalOpen(true);
    }

    //close the modal
    const handleClose = ()=>{
        setmodalOpen(false);
    }

    //clear cart
    const clearcart= ()=>{
        props.cartempty();
        handleClose();
    }

    //for handling response errors
    function handleErrors (response) {
        if (!response.ok) {
            throw Error(response.text());
        }
        return response.json();
    }

    //check whether we have requests from previous restaurants
    useEffect(() => {
        if(restaurantID === props.match.params.id || restaurantID === ''){
            setmatch(true);
        }else{
            setmatch(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restaurantID])

    //add contents to cart
    useEffect(() => {
        console.log("cart has been updated "+ cartUpdated);
        if(cartUpdated){
            debounce(()=>{
                console.log('delayed!');
            },400)
            props.pending();
            fetch('http://localhost:3200/cart',
              {
                  method: 'post',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token' : localStorage.getItem('user-token')
                },
                body : JSON.stringify({cart:props.cart})
              }).then(handleErrors)
              .then(function(myJson) {
                  props.success(myJson);
                  return true;
              }).then((output)=>{
                  //redux update
                    props.updated();
              }).catch(function(err){
                  props.error(err);
                  props.updated();
              });
        }      
    },[props.cart])

    //network request on component Mount    
    useEffect(() => {
        fetchFoodPending();
        fetch('http://localhost:3200/food',
        {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body : JSON.stringify({link : props.match.params.id})
        }).then(handleErrors)
        .then(function(myJson) {
            fetchFoodSuccess(myJson);
        }).catch(function(error){
            fetchFoodError(error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
                <Modal
                    open={modalOpen}
                    onClose={handleClose}
                    basic
                    size='small'>
                    <Header icon='browser' content='Items In Cart' />
                    <Modal.Content>
                      <h3>There are Items Already Inside Your Cart.</h3>
                    </Modal.Content>
                    <Modal.Actions>
                     <Link to='/cart'><Button color='green' onClick={handleClose} inverted>
                            Go To Cart
                    </Button></Link>
                    <Button color='red' onClick={clearcart} inverted>
                        Clear Cart
                      </Button>
                    </Modal.Actions>
                  </Modal>
        <Container><Row>
            <Col md={2}><Filters changeList= {setlist} /></Col>
        <Col md={10}>
            {   
                list && list.map((item)=>{    
            return( <Suspense key={item._id} fallback={<div className='parent'><div className='containerNew'>Loading....</div></div>}>
                <FoodItem openModal={handleOpen} matchBoolean={match} path={props.match.params.id} key={item._id} item={item} ></FoodItem></Suspense>  )
                }) 
            }
            
            </Col>
            </Row>
            </Container>
        </div>
    )
}

const mapStateToProps = (state)=>{
    const {foodList,pending,error,cart,restaurantID,cartUpdated} = state.reducer;
    const newState = {foodList,pending,error,cart,restaurantID,cartUpdated}; 
    return newState;
}

const mapDispatchToProps = dispatch =>{
    return{
        fetchFoodPending: () => dispatch(fetchFoodPending),
        fetchFoodError : (error) => dispatch(fetchFoodError(error)),
        fetchFoodSuccess : (items) => dispatch(fetchFoodSuccess(items)),
        cartempty : () => dispatch(cartEmpty()),
        success : () => dispatch(setCartSuccess()),
        pending : () => dispatch(setCartPending()),
        error : () => dispatch(setCartError()),
        updated : () => dispatch(cartUpdateDONE())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(RestaurantList);
