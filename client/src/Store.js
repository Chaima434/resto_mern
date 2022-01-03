import React from 'react';
import './App.css';
import CategoryList from './components/CategoryList';
const Store =({match}) =>{

    const list = [{id:1,name:'Restaurants',linkcode:'restaurants',images:'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?cs=srgb&dl=chairs-menu-restaurant-6267.jpg&fm=jpg'},
    {id:2,name:'Grocery Store',linkcode:'grocery',images:'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?cs=srgb&dl=branding-buy-city-264636.jpg&fm=jpg'},
    ];
    return(
        <div>
            <CategoryList matchurl={match.url} list={list}></CategoryList>
        </div>
      );
}
export default Store;