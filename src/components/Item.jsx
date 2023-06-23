import React, { useContext } from 'react'
import { CartContext } from '../contexts/ShoppingCartContext'

const Item = ({name,price,id,imgUrl}) => {
   const [cart,setCart] = useContext(CartContext);


   const addToCart =() =>{
    setCart((currItems)=>{
       const isItemsFound = currItems.find((item)=>item.id ===id)
       if(isItemsFound){
        return currItems.map((item)=>{
          if(item.id === id){
             return {...item,quantity: item.quantity +1}
          }else{
            return item;
          }
          })
       
       } else{
        return [...currItems, {id,quantity:1, price}]
       }
    })
   };

   const removeItem = (id) =>{
    setCart ((currItems) =>{
        if(currItems.find((item) => item.id === id)?.quantity === 1){
          return currItems.filter((item) => item.id !=id)

        }else{
          return currItems.map((item)=>{
            if(item.id ===id){
              return {...item,quantity:item.quantity - 1};
            }else{
              return item;
            }
          })
        }
    })
   };

   const getQuantityById = (id) =>{
      return cart.find((item) => item.id ===id)?.quantity || 0;
   }
   const quantityperItem = getQuantityById(id);


  return (
    <div className='item-box'>
      <div>{name}</div>
      <img src={imgUrl} width= '80' height= '55'/>
      <div className='item-price'>${price}</div>
      {
        quantityperItem === 0 ?(
          <button className='item-add-button' onClick={()=>addToCart()}>
        + Add to Cart{quantityperItem > 0 && `(${quantityperItem})`}</button>
        ):(
          <button className='item-plus-button' onClick={()=>addToCart()}>
        + add more {quantityperItem > 0 && `(${quantityperItem})`}</button>
        )}

        {
          quantityperItem > 0 && (
            <button className='item-minus-button' onClick={()=>removeItem(id)}>
        subtract item</button>
          )
        }
    </div>
  )
}

export default Item