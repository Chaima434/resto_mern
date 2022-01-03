import React from 'react';
import './App.css';
import {Container,Row,Col,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function Home() {



    return (
        <Container id='main_heading'>
            <section className='section_main'>
                <h1 className='headerOne'>Delivering Food From 50 Best Restaurants In The City</h1>
                <Link to='/store'><Button className='exploreButton'>Explore</Button></Link>
                <h6 className='headerOne'>Choose From Various Different Categories</h6>
                
            </section>
        </Container>
    )
}
