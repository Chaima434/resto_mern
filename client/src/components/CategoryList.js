import React from 'react';
import {Row,Container} from 'react-bootstrap';
import Category from './Category';

function CategoryList({list,matchurl}) {
    return (
        <div>
        <Container>
            <Row>
            {
                list.map((listItem,index)=>{
                    return (
                        <Category key={listItem.linkcode} matchurl={matchurl} link={listItem.linkcode} title={listItem.name} images={listItem.images}></Category>
                    )
                })
            }
            </Row>
        </Container>
        </div>
    )
}

export default CategoryList
