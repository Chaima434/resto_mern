import React,{useState} from 'react'
import {Container,Row,Col} from 'react-bootstrap';
import { Input } from 'semantic-ui-react';
import {filterSearch} from '../helpers/filterHelper'; 
import _ from 'lodash';
import {connect} from 'react-redux';

function Filters(props) {
    const [input, setinput] = useState('');
    
    const handleChange=(e)=> {setinput(e.target.value)};
      
    const newList=
        props.foodList.filter((item)=> 
        {
            let name = item.name;
            let nameLower=name.toLowerCase();

            return nameLower.includes(input);
        });    
    

    input === '' ? props.changeList(props.foodList) : props.changeList(newList);

    return (
        <Container className='filters'>
            <Row>
                <Col>
                    Filters
                    <Input type='text' value={input}  onChange={handleChange} className='form-control'></Input>
                </Col>
            </Row>
        </Container>
    )
}



const mapStateToProps = (state)=>{
    const {foodList} = state.reducer;
    
    return {foodList};
}

export default connect(mapStateToProps)(Filters);
