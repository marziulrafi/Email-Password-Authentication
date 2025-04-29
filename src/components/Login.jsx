import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { auth } from '../firebase.init';
import { Link } from 'react-router';
import { toast } from 'react-toastify';

const Login = () => {

    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const emailRef = useRef();
    const mailVerify = () => toast.error("Please verify your Email address!")
    const reset = () => toast.success("A Password Reset mail has been sent to your email.")
    const handleLogin = e => {
        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password);

        setSuccess(false)
        setErrorMessage('')

        // Login user

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                if(!result.user.emailVerified){
                    mailVerify()
                }
                else {
                    setSuccess(true)
                }
            })
            .catch(error => {
                console.log(error);
                setErrorMessage(error.message)
            })
    }

    const handleForgotPassword =()=> {
        console.log(emailRef.current.value);
        const email = emailRef.current.value;

        setErrorMessage('');

        // Password Reset
        sendPasswordResetEmail(auth, email)
        .then(()=> {
            reset();
        }).catch(error=> {
            setErrorMessage(error.message)
        })
    }

    return (

        <div className="card mt-16 bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-3xl font-bold text-center">Login now!</h1>
                <form onSubmit={handleLogin} className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" name='email' ref={emailRef} className="input" placeholder="Email" />
                    <label className="label">Password</label>
                    <input type="password" name='password' className="input" placeholder="Password" />
                    <div onClick={handleForgotPassword}><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </form>

                <p>New to this website? <Link className='underline text-blue-600' to="/register">Sign Up here</Link></p>


            </div>
            {
                errorMessage && <p className='text-red-600 font-bold p-5'>{errorMessage}</p>
            }
            {
                success && <p className='text-green-600 font-bold p-5'>Logged In successfully</p>
            }
        </div>

    );
};

export default Login;