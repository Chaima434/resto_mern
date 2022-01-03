import React from 'react'
import { Menu ,Button} from 'semantic-ui-react';
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {cartEmpty} from '../actions/addtocart';
import '../App.css';
import {setCartPending,setCartSuccess,setCartError} from '../actions/setusercart';
import {logOut} from '../actions/logoutuser';


function NavigationAuth(props) {
  
   const [activeItem, setactiveItem] = useState('home');
  //console.log(props.logout);
  const handleItemClick = (e, { name }) => setactiveItem(name);
  const {length,cartempty} = props;
  
  
    useEffect(() => {
      length === 0 ? cartempty() : console.log('not empty') 
    }, [length])
    
       //for handling response errors
       function handleErrors (response) {
         
      console.log(response.ok+'got the response');
        if (!response.ok) {
            throw Error(response.text());
        }
        return response.json();
    }

    //fetch request on logout for setting the cart and resetting data from redux
    const logoutClick = ()=>{
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
        }).then(function(bool){
            props.logout();
        }).catch(function(err){
            props.error(err);
            props.logout();  
        });
    }
    

    return (
      <div>
        <Menu color='grey'   pointing >
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to='/'
          />
          <Menu.Item
            name='Restaurants'
            active={activeItem === 'Restaurants'}
            onClick={handleItemClick}
            as={Link}
            to='/store'
          />
          <Menu.Item
            name='orders'
            active={activeItem === 'orders'}
            onClick={handleItemClick}
            as={Link}
            to='/orders'
          />
          <Menu.Menu position='right'>

          <Menu.Item
            name={`Cart`}
            active={activeItem === 'Cart'}
            onClick={handleItemClick}
            as={Link} 
            to='/cart'
          >Cart <div className='cart_badge'>{` ${props.length}`}</div></Menu.Item>  
          <Menu.Item
              name='Logout'
              active={activeItem === 'Logout'}
              as={Button}
              onClick={logoutClick}
            />
          </Menu.Menu>
        </Menu>

      </div>
    )
  
}

const mapStateToProps = state =>{
  const {cart} = state.reducer;
  const length = cart.length;
  const newState = {length,cart};
  return newState;
}

const mapDispatchToProps = dispatch =>{
  return {
      logout : () => dispatch(logOut()),
      cartempty : () => dispatch(cartEmpty()),
      success : () => dispatch(setCartSuccess())
      ,pending : () => dispatch(setCartPending())
      ,error : () => dispatch(setCartError())

  }
}
export default connect(
  mapStateToProps,mapDispatchToProps
)(NavigationAuth)