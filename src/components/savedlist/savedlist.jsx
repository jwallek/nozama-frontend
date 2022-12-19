import React, {useEffect} from 'react'
import './savedList.css'
import {useSelector, useDispatch} from 'react-redux'
import Data from '../../data.json'
import {getItems, deleteItem} from '../../features/list/listSlice'
import { addItem, reset} from '../../features/cart/cartSlice'
import { CgShoppingCart } from 'react-icons/cg'
import { BsTrash} from 'react-icons/bs'


function Savedlist() {
  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { items, isError, message, isLoading, isSaveSuccess} = useSelector((state) => state.list)
  const {isSuccess} = useSelector((state) => state.cart)
  useEffect(() =>{
    dispatch(getItems())
  },[dispatch, getItems])

  const handleDelete = (id) => {
    dispatch(deleteItem(id))
    
  }
  const handleMove = async (item) => {
    let product={
      user,
      product: item.product
    }
    await dispatch(addItem(product)).then(dispatch(deleteItem(item._id)))

  }

  useEffect(() => {
    if(isSuccess){
      window.location.reload()
    }
  })
  return (
    <div className='savedlist-container'>
      {!user ? (<div>Sign in to begin adding products to your wish list</div>) : (
        <div className="savedlist-wrapper">
        <div className="savedlist-title">{user.first_name}'s WishList</div>
        
          {!items.length > 0 ? (<span>Loading...</span>) : (
           <div className="savedlist-items">
            {items.map((item) => {
              return(
              <div className="savedlist-item">
                <div className="savedlist-item-img">
                  <img src={Data[item.product-1].image} className="savedlist-image"/>
                </div>
                <div className="savedlist-item-footer">
              <div className="savedlist-item-footer-top">
                <div className="savedlist-item-title">{Data[item.product-1].title.substring(0,20)}{Data[item.product-1].title.length > 20 ? ("...") : ('')}</div>
                <div className="savedlist-item-price">${Data[item.product-1].price.toFixed(2)}</div>
              </div>
              <div className="savedlist-item-footer-actions">
                <button onClick={() => handleDelete(item._id)}><BsTrash /></button>
                <button onClick={() => handleMove(item)}><CgShoppingCart /></button>
              </div>
            </div>
              </div>
              )
            })}
            </div>
          )}
          
          {/* <div className="savedlist-item">
            <div className="savedlist-item-img"></div>
            <div className="savedlist-item-footer">
              <div className="savedlist-item-footer-top"></div>
              <div className="savedlist-item-footer-actions"></div>
            </div>
          </div> */}
        
        </div>
        )}
      
    </div>
  )
}

export default Savedlist