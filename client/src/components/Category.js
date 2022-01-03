import React from 'react'
import {Col,Image,Card,Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useEffect} from 'react';
import StarRatings from 'react-star-ratings';
import '../App.css';

function Category({matchurl,image,link,title}) {
    useEffect(() => {
        console.log('rendered');
    }, [])

    return (

        <Col md={{span:10,offset:1}} className='category_row'>
            <Card className='cardCategoryRow'>
                <Link to={`${matchurl}/${link}`}>
                    <Row>
                        <Col md={2}>
                            <Image className='image_row_new' src={require('../images/restaurant/'+image)}></Image>
                        </Col>
                        <Col md={3}>
                            <Row>
                                <Col md={12}>
                            <h5 className='link_title_row'>{title}</h5>
                                </Col>
                            </Row>
                            <Row>
                             <Col>
                                <StarRatings rating={4} starRatedColor='rgb(255,255,0)' starDimension='15px'></StarRatings>
                              </Col>
                            </Row>
                        </Col>
                    </Row>
                </Link>
            </Card>
        </Col>
        // <Col md={4} className='category_wrapper'>
        //     <Card className='cardCategory'>
                
        //                 <Link to={`${matchurl}/${link}`}>
        //                 <Row>
        //                     <Col>
        //                     <Image className='image_new' src={require('../images/restaurant/'+image)}></Image>
        //                     </Col>
        //                     </Row>
        //                 <Row>   
        //                     <Col>
        //                     <center><h5 className='link_title'>{title}</h5></center>
        //                     </Col>    
        //                     </Row>                           
        //                 </Link>

        //     </Card>  
        // </Col>
    )
}

export default Category
