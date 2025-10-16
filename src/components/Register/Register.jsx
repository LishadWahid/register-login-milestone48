
import React, { useState } from 'react';
import { auth } from '../../firebase/firebase.init';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router';


const Register = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const terms = event.target.terms.checked;
        const name = event.target.name.value;
        const photo = event.target.photo.value;
        console.log('register click', email, password,terms, name, photo);
        // console.log('register click', { email, password });

        const password6Pattern = /^.{6,}$/;
        const casePattern = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
        const specialCharacterPattern = /^(?=.*[!@#$%^&*()_\-+=[\]{};:'",.<>/?\\|`~]).+$/;
        if (!password6Pattern.test(password)) {
            console.log('password didnt match')
            setError('password must have at least one uppercase and one lower case character')
            return;
        }
        else if (!casePattern.test(password)) {
            setError('password must have at least one uppercase and one lowercase character')
            return;
        }
        else if (!specialCharacterPattern.test(password)) {
            setError('Password must contain at least one special character (!, @, #, $, %, ^, &, *)')
            return;
        }

       
        // reset status: success or error
        setError('');
        setSuccess(false);

        if(!terms){
            setError('Please accept our terms and conditions');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log('after creation of a new user', result.user)
                setSuccess(true);
                event.target.reset();

                // update user profile
                const profile = {
                    displayName: name,
                    photoURL: photo
                }

                updateProfile(result.user, profile)
                .then(() => {})
                .catch()

                // send verification email;
                sendEmailVerification(result.user)
                .then(() => {
                    alert('please login to your email and verify your email address');
                })
            })
            .catch(error => {
                console.log('error happened', error.message)
                setError(error.message);
            })

    }

    const handleTogglePasswordShow = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
        return;
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">
                                <label className="label">Name</label>
                                <input type="text" name="name" className="input" placeholder="Your Name" />
                                <label className="label">Photo URL</label>
                                <input type="text" name="photo" className="input" placeholder="Photo URL" />
                                <label className="label">Email</label>
                                <input type="email" name="email" className="input" placeholder="Email" />
                                <label className="label">Password</label>
                                <div className='relative'>
                                    <input type={showPassword ? 'text' : 'password'} name="password" className="input" placeholder="Password" />
                                    <button onClick={handleTogglePasswordShow} className="btn btn-xs absolute top-2 right-5">
                                        {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                                    </button>
                                </div>
                                <label className="label">
                                    <input type="checkbox"
                                    name="terms" 
                                    className="checkbox" />
                                    Accept Our Terms and Conditions
                                </label>
                                <button className="btn btn-neutral mt-4">Register</button>
                            </fieldset>
                            {
                                success && <p className='text-green-500'>Account create successfully.</p>
                            }
                            {
                                error && <p className='text-red-500'>{error}</p>
                            }
                        </form>
                        <p>Already have an account? <Link className='text-blue-400 underline' to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;