import React from 'react'
import { Button, Form, Message } from 'semantic-ui-react';
import '../App.css';
import {useState} from 'react';
import {connect} from 'react-redux';
import  {loginuser} from '../actions/loginuser';

const Login = (props) => {
    
    //values for form inputs
    const [values, setValues] = useState({
        username: '',
        password: ''
    })

    //loading bar 
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(false)
    const [errorMessage, seterrorMessage] = useState('')

    //on form input value change
    const onChange = (e) => {
        setValues({...values,[e.target.name]:e.target.value});
    }


    //for handling response errors
    function handleErrors (response) {

      //get the jwt token from the server
      let token = response.headers.get('auth-token');
      if(token) localStorage.setItem('user-token',token);
      if (!response.ok) {
          throw Error(response.json());
      }
      return response.json();
    }

    //on submit     
    const onSubmit = (e) =>{
        setloading(true);
          //api call
          fetch('http://localhost:3200/login', 
          {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
            body: JSON.stringify(values)
      }).then(handleErrors)
      .then(function(myJson) { 
         setloading(false);  
          if(myJson.user !== undefined){
              props.loginuser(true);
              props.history.push('/store');
            }else{
              seterror(true);
              seterrorMessage(myJson.error);
            }
      }).catch(function(error){
        seterror(true);
        setloading(false);
        seterrorMessage('Sorry! There was Some Problem with Server');
    
      });
    }

      return(
      <div className='form_container'>
      <Form className={loading ? 'loading' : ''} onSubmit={onSubmit}>
      <h1>Login</h1>
      <Form.Field>
        <label style={{textAlign:'left'}}>Username</label>
        <input placeholder='Username' name='username' onChange={onChange}/>
      </Form.Field>
      <Form.Field>
        <label style={{textAlign:'left'}}>Password</label>
        <input placeholder='Password' name='password' type='password' onChange={onChange} />
      </Form.Field>
      <Button primary  type='submit'>Login</Button>
    </Form>
    {
      error ? 
      <Message negative>
      <Message.Header>Username or Password is incorrect</Message.Header>
      <p>{errorMessage}</p>
    </Message> : <div></div> 
    }
    </div>)
}

const mapStateToProps = (state)=>{
  return state;
}

export default connect(
  mapStateToProps
  ,{ loginuser }
)(Login);