




import React, { useState } from 'react';

import { User } from '../Interfaces/UserInterface';

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Url } from '../Utilities/MainUrl';
import * as yup from 'yup';
import { CustomFile } from "../TS/custom"


export default function SignUp() {
    const navigate = useNavigate();
    const [apiErr, setApiErr] = useState<string>("")
    const [validErr, setValidErr] = useState<string[]>([])
    const [userData, setUserData] = useState<User>({
        name: '',
        password: '',
        email: '',
        confirmPassword: '',
        phone: '',
        gender: '',
        DOB: '',
        userImage: null,
    });

    function getUserData(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    }

    async function submitData(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            await validationSchema.validate(userData, { abortEarly: false });
        } catch (error: any) {
            console.log(error.errors);
            setValidErr(error.errors);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('password', userData.password);
            formData.append('email', userData.email);
            formData.append('confirmPassword', userData.confirmPassword);
            formData.append('phone', userData.phone || '');
            formData.append('gender', userData.gender || '');
            (userData.userImage && formData.append('userImage', userData.userImage || ''))
        

            const { data } = await axios.post(`${Url}auth/signup`, formData);




            if (data.message === 'done') {
                navigate('/login');
            }

        } catch (error: any) {
            setApiErr(error.response.data.message);
            console.log(error.response.data.message);

        }
    }




    function getUserImage(event: React.ChangeEvent<HTMLInputElement>) {
        const imageFile = event.target.files?.[0] as CustomFile;
        if (imageFile) {
            setUserData((prevData) => ({ ...prevData, userImage: imageFile }));
        }
    }
    function filterErrByWord(arr: string[], word: string): string[] {
        return arr.filter(err => err.startsWith(word))
    }
    const filterNameErr=filterErrByWord(validErr,"name")
    const filterEmailErr=filterErrByWord(validErr,"email")
    const filterPassErr=filterErrByWord(validErr,"password")
    const filterConPassErr=filterErrByWord(validErr,"Passwords must match")
    const filterPhoneErr=filterErrByWord(validErr,"phone")

    const validationSchema = yup.object().shape({
        name: yup.string().min(2).max(15).required(),
        email: yup.string().email().required(),
        password: yup.string().min(2).max(15).required(),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), undefined], 'Passwords must match')
            .required(),
        phone: yup.string().length(12).notRequired(),
        DOB: yup.string().notRequired(),
        gender: yup.string().oneOf(['male', 'female']).notRequired(),
        userImage: yup
            .mixed<CustomFile>()
            .nullable() // Allow null value for userImage

            .test('fileSize', 'Image size too large', (value) => !value || value.size <= 500000)
            .test('fileFormat', 'Invalid file format', (value) => value === null || value instanceof File), // Custom test for null or File instance
    });

    return (

        <>
            <div className="container d-flex align-item-center  my-5 ">
                <div className="w-50 m-auto shadow shadow-lg p-5">
                    <form onSubmit={submitData}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className=' '>
                                    <input onChange={getUserData} type="text" name='name' id='name' className='text-muted form-control my-3' required placeholder='Username' />
                                    {/* {validErr?.some(err => err.startsWith("name")) ? (
                                        <div className="alert alert-light p-1 text-center">
                                            {validErr.filter(err => err.startsWith("name")).join(", ")}
                                        </div>
                                    ) : ""} */}

                                    {filterNameErr?.length > 0 ? <div className="alert alert-light p-1 text-center">
                                           {filterNameErr}
                                        </div> : "" }
                                </div>

                                <div className=' '>
                                    <input onChange={getUserData} type="password" name='password' id='password' className='text-muted form-control  my-3' required placeholder='Password' />
{filterPassErr?.length>0 ? <div className="alert alert-light p-1 text-center">
                                           {filterPassErr}
                                        </div>:""}


                                    {/* {validErr?.some(err => err.startsWith("password")) ? (
                                        <div className="alert alert-light p-1 text-center">
                                            {validErr.filter(err => err.startsWith("password"))}
                                        </div>
                                    ) : ""} */}
                                </div>

                                <div className=' '>
                                    <input onChange={getUserData} type="text" name='phone' id='phone' className='text-muted form-control  my-3' placeholder='phone' />
                                    {filterPhoneErr?.length>0 ?<div className="alert alert-light p-1 text-center">
                                           {filterPhoneErr}
                                        </div>:"" }
                                    {/* {validErr?.some(err => err.startsWith('phone')) ? (
                                        <div className="alert alert-light p-1 text-center">
                                            {validErr.filter(err => err.startsWith("phone"))}
                                        </div>) : ""} */}
                                </div>



                            </div>
                            <div className="col-md-6">
                                <div className=' '>
                                    <input onChange={getUserData} type="text" name='email' id='email' className='text-muted form-control ] my-3' required placeholder='Email' />
{filterEmailErr?.length>0 ? <div className="alert alert-light p-1 text-center">
                                           {filterEmailErr}
                                        </div>:""}

                                    {/* {validErr?.some(err => err.startsWith("email")) ? (<div className="alert alert-light p-1 text-center">
                                        {validErr.filter(err => err.startsWith("email"))}
                                    </div>) : ""} */}
                                </div>



                                <div className=' '>
                                    <input onChange={getUserData} type="password" name='confirmPassword' id='confirmPassword' className='text-muted form-control  my-3' required placeholder='Confirm your password' />


                                    {filterConPassErr?.length>0?<div className="alert alert-light p-1 text-center">
                                           {filterConPassErr}
                                        </div>:""}
                                    {/* {validErr?.some(err=> err.startsWith("Passwords must match"))?(<div className="alert alert-light p-1 text-center">
                                          {validErr.filter(err=>err.startsWith("Passwords must match"))}
                                      </div>):''} */}
                                </div>
                                <div className=' '>
                                    <input onChange={getUserData} type="number" name='DOB' id='DOB' className='text-muted form-control  my-3' required placeholder=' Age' />
                                    {/* {validErr?.some(err => err.startsWith("DOB")) ? (<div className="alert alert-light p-1 text-center">
                                        {validErr.filter(err => err.startsWith("DOB"))}
                                    </div>) : ""} */}
                                </div>



                            </div>

                        </div>
                        <div className="row g-3 mt-3" >
                            <div className="col-md-3">
                                <div className=''>
                                    <span>Gender:</span>
                                    <br />
                                    <label htmlFor='male'>
                                        <input onChange={getUserData} type='radio' name='gender' id='male' value='male' /> Male
                                    </label>
                                    <br />
                                    <label htmlFor='female'>
                                        <input onChange={getUserData} type='radio' name='gender' id='female' value='female' /> Female
                                    </label>

                                </div>
                            </div>
                            <div className="col-md-4 offset-3 ">
                                <div>
                                    <input onChange={getUserImage} type="file" accept="image/*" name='userImage' />
                                </div>

                            </div>


                        </div>

                        <div >
                            <button className="btn btn-primary btnbrd text-white w-100 py-2 my-4" > Create Account</button>

                        </div>

                        {apiErr ? (<div className="alert alert-danger p-1 text-center">{apiErr}</div>) : ""}

                        <div>
                            <p className="text-muted text-center ">Already a member? <Link to='/login' className='text-primary'>Log in</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}
