import React, {useState, useEffect} from 'react'
import './Register.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from '../../features/auth/authSlice'



function Register() {
    const [registerModal, setRegisterModal] = useState(false)
    const [formRegister, setFormRegister] = useState({
        first_name: '',
        last_name:'',
        email: '',
        password: '',
        password2: ''
    })
    const{ first_name, last_name, email, password, password2 } = formRegister
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() =>{
      // if(isError){
      //   toast.error(message)
      // }
      if(isSuccess || user){
        navigate('/')
      }
      dispatch(reset())
    },[user, isLoading, isError, isSuccess, message, navigate, dispatch])

    const onChangeReg = (e) =>{
        setFormRegister((prevstate) => ({
            ...prevstate,
            [e.target.name] : e.target.value
        }))
    }
    const onSubmitReg = (e) => {
        e.preventDefault()
        if(password !== password2){
          toast.error('Passwords do not match')
        } else {
          const userData = {
            first_name,
            last_name,
            email,
            password
          }
          dispatch(register(userData))
        }
        if(isSuccess || user){
          navigate('/')
          setRegisterModal(false)
        }
    }

    // if(isLoading){
    //   return "loading..."
    // }
  return (
    <div className='register-container'>
        <div className="register-banner">
            <div className="register-title">Become a Nozama Member and Unleash the Savings</div>
            <Button className="register-button" onClick={() => setRegisterModal(true)}>Register</Button>
        </div>
        <Modal
              centered
              show={registerModal}
              onHide={() => setRegisterModal(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
              </Modal.Header>
              <Modal.Body className="header-modal-body">
                <Form className="header-signin-form" onSubmit={onSubmitReg}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" name="first_name" onChange={onChangeReg}/>
                 </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" name="last_name" onChange={onChangeReg}/>
                 </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="john@email.com" name="email" onChange={onChangeReg}/>
                 </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={onChangeReg}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password2" onChange={onChangeReg}/>
                  </Form.Group>
                  <Button variant="dark" type="submit" className="submit-btn">
                    Submit
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
    </div>
  )
}

export default Register