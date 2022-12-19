import React, {useEffect} from 'react'
import './cart.css'
import { FaShoppingCart } from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {getItems,deleteItem, reset, deleteCart} from '../../features/cart/cartSlice'
import { saveItem} from '../../features/list/listSlice'
import {useSelector, useDispatch} from 'react-redux'
import Data from '../../data.json'
import { BsBookmarkHeart, BsTrash} from 'react-icons/bs'
import ProgressBar from 'react-bootstrap/ProgressBar'

import {addOrder} from '../../features/order/orderSlice'

function Cart() {
  

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { items, isError, message, isLoading, isSuccess } = useSelector((state) => state.cart)
  const {isSaveSuccess} = useSelector((state) => state.list)

  const getPrice = () =>{
    let totalPrice = 0
    items.map((item, i) => {
      totalPrice = totalPrice + Data[item.product - 1].price
    })
    return totalPrice.toFixed(2)
  }

  useEffect(() =>{
    if(isError){
      console.log(message)
    }

  dispatch(getItems())
    return () => {
      dispatch(reset())
      
    }
  },[dispatch, getItems])


  const handleSave = async (item) => {
    let product = {
      user,
      product: item.product
    }
    await dispatch(saveItem(product)).then(dispatch(deleteItem(item._id)))
  }
  const handleDelete = (id) => {
    dispatch(deleteItem(id))
  }
  useEffect(() => {
    if(isSaveSuccess){
      window.location.reload()
    }
  },[handleSave, handleDelete])

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    let price = await getPrice()
    let shipping = price > 50 ? false: true
    // let totalPrice = await parseFloat(price).toFixed(2)
    let date = new Date()
    // let products = await dispatch(getItems())
    let order = {
      user,
      products: items,
      totalPrice: await parseFloat(price).toFixed(2),
      date,
      shipping
    }
   await dispatch(addOrder(await order)).then(dispatch(deleteCart())).then(navigate('/'))
    
  }
  return (
    <div className="cartContainer">
      {items.length > 0  ? (<div className="cart-main-wrapper">
              <div className="cart-items">
              {items.map((item, i) => {
                return(
                 <div className='cart-item'>
                  <img className="cart-item-image" src={Data[item.product-1].image}/>
                  <div className="cart-item-title"><span>{Data[item.product-1].title}</span><span>${Data[item.product-1].price.toFixed(2)}</span></div>
                  <div className="cart-item-actions"><button onClick={() => handleSave(item)}><BsBookmarkHeart /></button><button onClick={() => handleDelete(item._id)}><BsTrash /></button></div>
                 </div>
                )
              })}
              </div>
              <div className="cart-summary">
                <div className="cart-summary-title">Order Summary</div>
                <div className="cart-summary-progress-shipment">
                  {getPrice() < 50 ? (
                    <div className="cart-summary-progress">
                      <span className='summary-progress-text'>Spend 50$ or more and get free shipping!</span>
                      <ProgressBar now={(getPrice())} max={50} variant="cart-summary-progress-bar"/>
                    </div>
                  ) : (
                    <div className="cart-summary-progress">
                      <span className='summary-progress-text'>You get free shipping!</span>
                      <ProgressBar now={100} variant="cart-summary-progress-bar"/>
                    </div>
                  )}
                </div>
                <div className="cart-summary-total">
                  <div className="cart-summary-price">
                  <span>Order value</span>
                  <span> ${getPrice()}</span>
                  </div>
                  <div className="cart-summary-shipment">
                    <span>Shipping</span>
                    {getPrice() < 50 ? (<span>$7.99</span>) : (<span>FREE</span>)}
                  </div>
                  <hr className="cartsummary-hr"/>
                  <div className="cart-summary-total-price">
                    <span>Total</span>
                    {getPrice() < 50 ? (<span>${(parseFloat(getPrice()) + 7.99).toFixed(2)}</span>) : (<span>{getPrice()}</span>)}
                  </div>
                  </div>
                  <hr className="cartsummary-hr"/>
                <div className="cart-summary-actions">
                  <button onClick={(e) => handlePlaceOrder(e)}>Place Order</button> 
                </div>
              </div>
              
              </div>) : (
                <div className="empty-cart">
                <FaShoppingCart />
                <h3>Your shopping cart is empty.</h3>
                <div className="start-shopping">
                  {/* https://uiverse.io/alexmaracinaru/empty-moose-12 */}
                  <Link class="cta" to="/products">
                    <span class="hover-underline-animation"> Start shopping </span>
                    <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                    <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                    </svg>
                    </Link>
                </div>
                </div>
              )}
      
    </div>
  )
}

export default Cart