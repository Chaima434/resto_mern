import React from 'react'
import { Button, Form } from 'semantic-ui-react';
import '../App.css';

import { Redirect } from 'react-router-dom';
import {useState} from 'react';

const Register = () => {
    
    const [values, setValues] = useState({
        username: '',
        password: '',
        email : ''
    })

    //loading bar and 
    const [loading, setloading] = useState(false);
    const [done, setdone] = useState(false);

    //set values from form elements 
    const onChange = (e) => {
        setValues({...values,[e.target.name]:e.target.value});
    }

    //for handling response errors
    function handleErrors (response) {
      if (!response.ok) {
          throw Error(response.json());
      }
      
      setloading(false);
      console.log(done);
      return response.json();
    }

    //on form submit 
    const onSubmit = (e) =>{
        setloading(true);
        
        //http request for registration
        fetch('http://localhost:3200/register', 
            {
              method: 'post',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
              body: JSON.stringify(values)
        })
          .then(handleErrors)
          .then(function(myJson) {
            setdone(true);
            setloading(false);
          }).catch(function(error){
              console.log(error);
              setloading(false);
          });
    }

    return(

        <div className='form_container'>
        {
          done ?  <Redirect to='/login' /> : <div></div> 
          
        }
      <Form className={loading ? 'loading' : ''} onSubmit={onSubmit}>
    <h1>Register</h1>
    <Form.Field>
      <label style={{textAlign:'left'}}>Username</label>
      <input placeholder='Username' name='username' onChange={onChange}/>
    </Form.Field>
    <Form.Field>
      <label style={{textAlign:'left'}}>Email</label>
      <input placeholder='Email' name='email' onChange={onChange}/>
    </Form.Field>
    <Form.Field>
      <label style={{textAlign:'left'}}>Password</label>
      <input placeholder='Password' type='password' name='password' onChange={onChange} />
    </Form.Field>
    
    <Form.Field>
      <label style={{textAlign:'left'}}>Confirm Password</label>
      <input placeholder='Confirm Password' name='confirmpassword' onChange={onChange}/>
    </Form.Field>
    <Button primary   type='submit'>Register</Button>
  </Form>
  
  </div>
)}

export default Register;