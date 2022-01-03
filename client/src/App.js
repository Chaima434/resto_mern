import React,{useEffect} from 'react';
import { BrowserRouter as Router,Switch, Route,Redirect,Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Store from './Store';
import Nav from './Navigation';
import Navigation from './components/NavigationAuth';
import CategoryMainPage from './components/CategoryMainPage';
import Login from './components/Login';
import Register from './components/Register';
import CartGuest from './components/CartGuest';
import Cart from './components/Cart';
import Orders from './components/Orders';
import {connect} from 'react-redux';
import {getCartPending,getCartSuccess,getCartError} from './actions/getcart';
import RestaurantList from './components/RestaurantList';

function App(props) {
  
    const {loggedIN,pending,error,success} = props;

    //for handling response errors
    function handleErrors (response) {
      if (!response.ok) {
          throw Error(response.text());
      }
      return response.json();
    }


  useEffect(() => {
      pending();
      //if user is logged in then get his cart contents
      if(loggedIN){
      fetch('http://localhost:3200/getcart',
      {
          method: 'get',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('user-token'),
        },
      }).then(handleErrors)
      .then(function(myJson) {
        console.log(myJson.cart);
          success(myJson.cart);
      }).catch(function(err){
          error(err);
      });
      }
    
  }, [loggedIN])

  return (
    <Router>   
     <div className="App">
      {
        loggedIN ? <Navigation></Navigation> : <Nav></Nav> 
      }
      <Switch>
          <Route exact path="/" component={Home} />
          
          <Route exact path='/store' component={CategoryMainPage} />
          <Route path ='/store/:id' component={RestaurantList}  />
          <ReverseProtect  path="/login"   component={Login}  isAllowed={loggedIN}  />
          <ReverseProtect  path="/register" component={Register}  isAllowed={loggedIN}/> 
          <ProtectedRouteCart path="/cart" component={Cart} isAllowed={loggedIN} />
          <ProtectedRoute path="/orders" component={Orders} isAllowed={loggedIN} />
          <Route path='/error' component={Error} />  
          <Route path='/cartguest' component={CartGuest} />  
          <Route path='/logged' component={Logged} />  

      </Switch>
    </div>
    </Router>

  );
}

//for unauthorized access
const Error = () =>{
  return <div><h5>You Must Login first before accessing this page!<Link to='/login'>Click Here</Link></h5> </div>
}

//cart protected route
const ProtectedRouteCart =({ isAllowed, ...props }) => 
isAllowed 
? <Route {...props}/> 
: <Redirect to="/cartguest"/>;


//for keeping unauthorized users away from server
const ProtectedRoute 
  = ({ isAllowed, ...props }) => 
     isAllowed 
     ? <Route {...props}/> 
     : <Redirect to="/error"/>;

//for keeping unauthorized users away from server
const ReverseProtect 
  = ({ isAllowed, ...props }) => 
     isAllowed 
     ?  <Redirect to="/logged"/> :
     <Route {...props}/> 
     
const Logged= ()=>{
  return <div>You are already Logged In!</div>
}
     

const mapStateToProps = state => {
  const {loggedIN,cart} = state.reducer;
  const newState = {loggedIN,cart}; 
  return newState;
}

const mapDispatchToProps = (dispatch) =>{
    return {
        pending : ()=>dispatch(getCartPending()),
        success : (items)=>dispatch(getCartSuccess(items)),
        error : ()=>dispatch(getCartError())
        
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
