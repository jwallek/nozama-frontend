import React, {useState, useEffect} from 'react'
import { CgShoppingCart } from 'react-icons/cg'
import { BsBookmarkHeart, BsCheck } from 'react-icons/bs'
import './products.css'
import data from '../../data.json'
import Modal from 'react-bootstrap/Modal'
import { BiStar } from 'react-icons/bi'
import {useSelector, useDispatch} from 'react-redux'
import { addItem, reset } from '../../features/cart/cartSlice'
import { saveItem, resetSave } from '../../features/list/listSlice'
import {toast} from 'react-toastify'


function Products() {
  let[opened, setOpened] = useState([])
  let[filters, setFilters] = useState([])


  const {user} = useSelector((state) => state.auth)
  const {isSuccess, isError, isLoading} = useSelector((state) => state.cart)
  const {isSaveSuccess, isSaveError, isSaveLoading} = useSelector((state) => state.list)
  const dispatch = useDispatch()

  useEffect(() =>{
    for(let i = 0; i < data.length; i++){
      setOpened(current => [...current, false])
    }
  }, [])
  useEffect(() => {
    filterData()
  }, [filters])

  const handleClick = (id) => {
    let product={
      user,
      product: id
    }
    if(!user){
      alert('Please sign in or make an account before adding items to your cart')
    } else{
      dispatch(addItem(product))
    }
    
    

  }

  const handleSave = (id) => {
    let product={
      user,
      product: id
    }
    if(!user){
      alert('Please sign in or make an account before adding items to your wishlist')
    }
    else{
      dispatch(saveItem(product))
    }
    
   
  }


    
  const getOpened = (e) => {
    let tempArray = [...opened]
    tempArray[e] = !tempArray[e]
    setOpened(tempArray)
  }
  const filterData = () => {
    let tempArray = []
    if(filters.length === 0){
      return data
    }
    for(let i = 0; i < data.length; i++){
        if(filters.includes(data[i].category)){
          tempArray.push(data[i])
        }
    }
    return tempArray
  }
 
  const handleFilters = e => {
    if(!filters.includes(e)){
      setFilters(current => [...current, e])
    } else{
      let index = filters.indexOf(e)
      let tempArray = [...filters]
      tempArray.splice(index, 1)
      setFilters(tempArray)
    }
  }


  
  return (
    <div className='products-container'>
      <div className="products-banner">
      <div className="products-title">Clothing & Jewelry</div>
      </div>
      
      <div className="products-menu-bar">
        <div className="product-menu-option">
        <input type="checkbox" id="women's clothing" name="w-clothing" value="w-clothing" onClick={(e) => handleFilters(e.target.id)}/>
        <label for="w-clothing">Women's Clothing</label>
        </div>
        <div className="product-menu-option">
        <input type="checkbox" id="men's clothing" name="m-clothing" value="m-clothing" onClick={(e) => handleFilters(e.target.id)}/>
        <label for="m-clothing">Men's Clothing</label>
        </div>
        <div className="product-menu-option">
        <input type="checkbox" id="jewelery" name="jewelery" value="jewelery" onClick={(e) => handleFilters(e.target.id)}/>
        <label for="jewelery">Jewelry</label>
        </div>
      </div>
      <div className="products-main">
       {(filterData()).map((item, i) => {
        return(
          <div className="product" id={item.id}>
          <img className='product-image' src={item.image}/>
          <div className="product-footer">
            <div className="product-title">{item.title}</div>
            <div className="product-price">${item.price.toFixed(2)}</div>
            <div className="product-actions" >
              {/* https://uiverse.io/alexmaracinaru/empty-moose-12 */}
              <button class="cta" onClick={() => getOpened(i)}>
                    <span class="hover-underline-animation"> Quick shop</span>
                    <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                    <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                    </svg>
               </button>
              <button onClick={() => handleClick(item.id)}><CgShoppingCart className='product-cart' /></button>
              <button onClick={() => handleSave(item.id)}><BsBookmarkHeart className='product-save'/></button>
            </div>
          </div>
          <Modal
            show={opened[i]}
            size="lg"
            onHide={() => getOpened(i)}
            >
              <Modal.Header closeButton>
                <Modal.Title className="modal-title">{item.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body className="modal-body">
              <img className='product-image-modal' src={item.image}/>
              <p className='modal-desc'>{item.description}</p>
              <span className='modal-rating'>{item.rating.rate} <BiStar className='modal-star'/> {' '} {'('}{item.rating.count}{')'}</span>
              <span className="modal-actions">
                <div className="modal-buy"><span>Add to cart</span><button  onClick={() => handleClick(item.id)}><CgShoppingCart className='product-cart' /></button></div>
                <div className="modal-save"><span>Save to favorites</span><button onClick={() => handleSave(item.id)}><BsBookmarkHeart className='product-save'/></button></div>
              </span>
              </Modal.Body>
            </Modal>
        </div>
        )
       })}
      </div>
    </div>
  )
}

export default Products