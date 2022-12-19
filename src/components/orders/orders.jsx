import React, {useEffect, useState} from 'react'
import './orders.css'
import {useSelector, useDispatch} from 'react-redux'
import {getOrders,reset} from '../../features/order/orderSlice'
import data from '../../data.json'
import Modal from 'react-bootstrap/Modal'
import { BiStar } from 'react-icons/bi'


function Orders() {
    const dispatch = useDispatch()
    const {orders} = useSelector((state) => state.order)
    let[opened, setOpened] = useState([])
    useEffect(() =>{
        for(let i = 0; i < data.length; i++){
          setOpened(current => [...current, false])
        }
      }, [])
      const getOpened = (e) => {
        let tempArray = [...opened]
        tempArray[e] = !tempArray[e]
        setOpened(tempArray)
      }


    useEffect(() =>{
     dispatch(getOrders())
        return () => {
          dispatch(reset())
          
        }
      },[dispatch, getOrders])


  return (
    <div className='orders-container'>
        <div className="orders-title">Orders</div>
        <div className="orders-wrapper">
           {orders.map((order, i) => {
            return(
                <div className="order">
                    <div className="order-date">{order.date.slice(0, 10)}</div>
                    <div className="order-total">${order.totalPrice}</div>
                    {/* https://uiverse.io/alexmaracinaru/empty-moose-12 */}
                    <button class="cta" onClick={() => getOpened(i)}>
                    <span class="hover-underline-animation"> View order </span>
                    <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                    <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                    </svg>
                    </button>
                    <Modal
                    show={opened[i]}
                    size="lg"
                    scrollable
                    className="order-modal"
                    onHide={() => getOpened(i)}>
                        <Modal.Header closeButton className='modal-header'>
                            <Modal.Title className="modal-title">Order number: {order._id}</Modal.Title>
                            <span>{order.date.slice(0,10)}</span>
                        </Modal.Header>
                        <Modal.Body className="modal-body">
                            <div className="products-wrapper">
                                    {order.products.map((product, i) =>{
                                        return(
                                            <div className='order-product'>
                                                <div className="order-product-img">
                                            <img src={data[product.product-1].image} className="order-product-image"/>
                                            </div>
                                            <div className="order-product-details">
                                            <div className="order-product-title">{data[product.product-1].title.substring(0,25)}...</div>
                                            <div className="order-product-price">${data[product.product-1].price}</div>
                                            <div className="order-product-reviews">
                                                <div className="order-product-rating">{data[product.product-1].rating.rate.toFixed(1)}<BiStar /></div>
                                                <div className="order-product-number-reviews">{data[product.product-1].rating.count}</div>
                                            </div>
                                            </div>
                                            </div>
                                        )
                                    })}
                                    <div className="order-details">
                                        <div className="order-details-wrapper">
                                        <div className="order-sub-total">Subtotal: ${order.totalPrice > 50 ? order.totalPrice : parseFloat(order.totalPrice - 7.99).toFixed(2)}</div>
                                        <div className="order-shipping">Shipping: {order.totalPrice > 50 ? <span>FREE</span> : <span>$7.99</span>}</div>
                                        <hr className="order-details-hr"/>
                                        <div className="order-total">Total: ${order.totalPrice} </div>
                                    </div>
                                    </div>
                            </div>
                            
                        </Modal.Body>
                    </Modal>
                </div>  
                
            )
            
           })}
        </div>
    </div>
  )
}

export default Orders