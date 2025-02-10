import React from 'react'
import './ExploreMenu.css'
import {menu_list} from '../../assets/assets'
export const ExploreMenu = ({category,setcategory}) => {
  return (
    <div className="explore-menu" id='explore-menu'>
        <h1>Explore here for menu</h1>
        <p className='explore-menu-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus perferendis sunt sapiente hic sed recusandae?</p>
        <div className="explore-menu-list">
          {menu_list.map((item,index)=>{
            return (
              <div onClick={()=>setcategory(prev=>prev===item.menu_name? "All" :item.menu_name)} key={index}className="explore-menu-list-items">
                <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                <p>{item.menu_name}</p>

              </div>
            )
          })}
        </div>
        <hr/>
        
    </div>
  )
}
