import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './account.css'
import Form from 'react-bootstrap/Form'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {updateAccount, reset} from '../../features/auth/authSlice'

import Button from 'react-bootstrap/Button'


function Account() {
    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [account, setAccount] = useState({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
    })
    const{_id, first_name, last_name, email} = account

    useEffect(() =>{
        if(!user){
            navigate('/')
            
        }
        if(isSuccess){
            toast.success('Account updated')
            window.location.reload()
        }
        dispatch(reset())
        
    },[user, navigate, isSuccess, isLoading, message])
    


    
    const onChangeAccount = (e) => {
        setAccount((prevstate) => ({
            ...prevstate,
            [e.target.name] : e.target.value
        }))
    }

    const onSubmitAccount = (e) => {
        e.preventDefault()
        
            const userData ={
                _id,
                first_name,
                last_name,
                email
            }
            dispatch(updateAccount(userData))
            
        
        
        if(isError){
            toast.error('Something went wrong')
        }

    }

  return (
    <div className="account-container">
        <div className="account-title">Welcome back, {user.first_name} {user.last_name} </div>
        <div className="account-main-wrapper">
            <span className='update-title'>Update Account Details</span>
            <Form className='update-form' onSubmit={onSubmitAccount}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" name="first_name" value={account.first_name} onChange={onChangeAccount}/>
                 </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" name="last_name" value={account.last_name} onChange={onChangeAccount}/>
                 </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="john@email.com" name="email" value={account.email} onChange={onChangeAccount}/>
                 </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">

                   
                  </Form.Group>

                  <Button variant="dark" type="submit" className="submit-btn">
                    Submit
                  </Button>
            </Form>
            
        </div>
    </div>
  )
}

export default Account