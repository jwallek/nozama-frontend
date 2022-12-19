import React, {useState, useEffect} from 'react'
import './header.css'
import { BsBookmarkHeart} from 'react-icons/bs'
import { CgProfile, CgShoppingCart } from 'react-icons/cg'
import {Link, useNavigate} from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useSelector, useDispatch} from 'react-redux'
import {signin, logout, reset} from '../../features/auth/authSlice'
import {getItems} from '../../features/cart/cartSlice'
import {toast} from 'react-toastify'


function Header() {
  const [signInModal, setSignInModal] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formSignIn, setFormSignIn] = useState({
    email: '',
    password: ''
  })
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)
 


  useEffect(() =>{
    if(isError){
      toast.error(message)
    }
    dispatch(reset())
  },[user, isLoading, isError, isSuccess, message, navigate, dispatch])

  const { email, password } = formSignIn

  
  
  const onChangeSignIn = (e) => {
    setFormSignIn((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }
  const onSubmitSignIn = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password
    }
    dispatch(signin(userData))
    setSignInModal(false)
    
  }

  const onSignOut = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  if(isSuccess){
    dispatch(getItems())
    window.location.reload()
  }
  // if(isLoading){
  //   return 'Loading...'
  // }
  return (
    <div className='header-container'>
        <div className="header-title"><Link to="/" className='header-link-title'>Nozama</Link></div>
        <div className="header-links">
          <div className="header-link">
            <Dropdown>
              <Dropdown.Toggle className="header-dropdown">
                {user ? <span>{user.first_name.charAt(0)}{user.last_name.charAt(0)}</span> : <CgProfile />}
            </Dropdown.Toggle>
            {!user ?  (
              <Dropdown.Menu className="header-dropdown-menu">
              <Dropdown.Item><Link to="/register" className='register-link'>Register</Link></Dropdown.Item>
              <Dropdown.Item onClick={() => setSignInModal(true)}>Sign-in</Dropdown.Item>
            </Dropdown.Menu>
            ): (
              <Dropdown.Menu className="header-dropdown-menu">
              <Dropdown.Item><Link to="/account" className='register-link'>Account</Link></Dropdown.Item>
              <Dropdown.Item><Link to="/orders" className='register-link'>Orders</Link></Dropdown.Item>
              <Dropdown.Item onClick={onSignOut}>Sign-out</Dropdown.Item>
              </Dropdown.Menu>
            )}
            
            </Dropdown>
            <Modal
              centered
              show={signInModal}
              onHide={() => setSignInModal(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Sign In</Modal.Title>
              </Modal.Header>
              <Modal.Body className="header-modal-body">
                <Form className="header-signin-form" onSubmit={onSubmitSignIn}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={onChangeSignIn}/>
                 </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={onChangeSignIn}/>
                  </Form.Group>
                  <Button variant="dark" type="submit" className="submit-btn">
                    Submit
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
            </div>
          <div className="header-link"><Link to="/savedlist"><BsBookmarkHeart /></Link></div>
          <div className="header-link"><Link to="/cart"><CgShoppingCart /></Link></div>
        </div>
        
    </div>
  )
}

export default Header