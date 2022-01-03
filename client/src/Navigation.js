import React from 'react'
import { Menu,Icon } from 'semantic-ui-react';
import {useState} from 'react';
import {Link} from 'react-router-dom';


export default function Navigation() {
  
   const [activeItem, setactiveItem] = useState('home')

  const handleItemClick = (e, { name }) => setactiveItem(name);

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
        
          <Menu.Menu position='right'>
          
          <Menu.Item
            name={`Cart`}
            active={activeItem === 'Cart'}
            onClick={handleItemClick}
            as={Link} 
            to='/cart'
          >Cart <div ><Icon  name='cart' /></div></Menu.Item>  
          <Menu.Item
            name='Login'
            active={activeItem === 'Login'}
            onClick={handleItemClick}
            as={Link} 
            to='/login'
          />  
          <Menu.Item
              name='Register'
              active={activeItem === 'Register'}
              onClick={handleItemClick}
              as={Link}
              to='/register'
            />
          </Menu.Menu>
        </Menu>

      </div>
    )
  
}