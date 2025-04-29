import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase.init';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { MdDriveFileRenameOutline, MdInsertPhoto } from 'react-icons/md';

const Register = () => {

    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const verifyMessage = () => toast.info("We sent you a Verification email. Please check & verify!")


    const handleRegister = e => {
        e.preventDefault();

        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value
        const terms = e.target.terms.checked
        console.log(email, password, terms)

        setSuccess(false)
        setErrorMessage('')

        if(!terms) {
            setErrorMessage('ACCEPT TERMS AND CONDITIONS');
            return
        }

        // Create User
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result)

                // Verify Email
                sendEmailVerification(auth.currentUser)
                .then(() => {
                    setSuccess(true)
                    verifyMessage()
                    
                })

                // Update user profile
                const profile = {
                    displayName: name,
                    photoURL: photo
                }
                updateProfile(auth.currentUser, profile)
                .then(() => {
                    console.log("User profile updated");
                }).catch(error=>console.log(error))

            }).catch(error => {
                console.log(error)
                setErrorMessage(error.message)
            })
    }
    return (
        <div className='max-w-sm mx-auto mt-14'>
            <h2 className='text-2xl font-bold mb-5'>Sign Up Here</h2>

            <form className='space-y-5' onSubmit={handleRegister}>

                {/* Email and Name */}

                <label className="input validator join-item">
                   <div className='opacity-50'><MdDriveFileRenameOutline/></div>
                    <input type="text" name='name' placeholder="Your Name" required />
                </label>
                <label className="input validator join-item">
                <div className='opacity-50'><MdInsertPhoto /></div>
                    <input type="text" name='photo' placeholder="Photo URL" required />
                </label>
                <label className="input validator join-item">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </g>
                    </svg>
                    <input type="email" name='email' placeholder="Enter your mail" required />
                </label>
                <div className="validator-hint hidden">Enter valid email address</div>
                <br />

                {/* Password */}

                <label className="input validator">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                            ></path>
                            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                        </g>
                    </svg>
                    <div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            placeholder="Password"
                            name='password'
                            minlength="8"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                        />
                        <button onClick={() => { setShowPassword(!showPassword) }} className='btn btn-xs ml-8'>
                            {
                                showPassword ? <FaEyeSlash /> : <FaEye />
                            }
                        </button>
                    </div>
                </label>
                <p className="validator-hint hidden">
                    Must be more than 8 characters, including
                    <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                </p>
                <br />

                <label className="label">
                    <input type="checkbox" name='terms' className="checkbox checkbox-sm" />
                    Accept terms and conditions
                </label> <br />

                <button className="btn btn-neutral join-item">Sign Up</button>
            </form>
            <p className='mt-5'>Already have an account? <Link className='underline text-blue-600' to='/login'>Please Login</Link></p>
            {
                errorMessage && <p className='text-red-600 font-bold text-xl mt-4'>{errorMessage}</p>
            }
            {
                success && <p className='text-green-600 text-xl font-bold mt-4'>User has created successfully</p>
            }

        </div>
    );
};

export default Register;