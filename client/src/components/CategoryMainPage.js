import React from 'react';
import {Row,Container} from 'react-bootstrap';
import Category from './Category';
import {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchRestPending,fetchRestSuccess,fetchRestError} from '../actions/getrestaurants';


function CategoryMainPage(props) {

    const {fetchRestPending,fetchRestError,fetchRestSuccess} = props;

    //for handling response errors
    function handleErrors (response) {
            if (!response.ok) {
                throw Error(response.json());
            }    
        return response.json();
        }
      
    useEffect(() => {
        fetchRestPending();
        fetch('http://localhost:3200/restaurants',
        {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body : null
        }).then(handleErrors)
        .then(function(myJson) {
            fetchRestSuccess(myJson);
        }).catch(function(error){
            fetchRestError(error);
        });
    },[])

    
    //use match to request category stores...
    return (
        <div>
            <Container>
                <Row>
                    {
                        props.restaurants && props.restaurants.map((listItem,index)=>{
                            return (
                                <Category matchurl={props.match.url} image={listItem.image} key={listItem._id} link={listItem._id} title={listItem.name} images={listItem.images}></Category>
                            )
                        })
                    }    
                </Row>
            </Container>
        </div>
    )
}

const mapStateToProps = state =>{
    const {pending,error,restaurants} = state.reducer;
    const stateNew = {pending,error,restaurants};
    return stateNew;
}

const mapDispatchToProps = dispatch =>{
    return {
        fetchRestError: (error) => dispatch(fetchRestError(error)),
        fetchRestPending: () => dispatch(fetchRestPending()),
        fetchRestSuccess: (restaurants) => dispatch(fetchRestSuccess(restaurants)),
    }
}

export default connect(
        mapStateToProps,
        mapDispatchToProps
  )(CategoryMainPage);
