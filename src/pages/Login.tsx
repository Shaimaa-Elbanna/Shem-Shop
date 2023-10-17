




import React, { useState } from 'react';


import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Url } from '../Utilities/MainUrl';
import * as yup from 'yup';
import { useWishlistContext } from '../context/WishlistContext';
import { decodedToken } from '../Utilities/decodeToken';
import TokenData from '../Interfaces/token';

interface User {
  password: string;
  email: string;

  [key: string]: string | undefined | File | null;

}

type loginProp={

  setRefToken: React.Dispatch<React.SetStateAction<TokenData | null | undefined>>; 

}

export default function Login({setRefToken}:loginProp) {


 const{getWishlist}= useWishlistContext()
  const navigate = useNavigate();
  const [apiErr, setApiErr] = useState<string>("")
  const [validErr, setValidErr] = useState<string[]>([])
  const [userData, setUserData] = useState<User>({

    password: '',
    email: '',

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
    




      const { data } = await axios.post(`${Url}auth/login`, userData);

      console.log(data);



      if (data.message === 'Done') {
localStorage.setItem("access_token",JSON.stringify(data.access_token))
localStorage.setItem("refresh_token",JSON.stringify(data.refresh_token))
await decodedToken("refresh_token",setRefToken)
console.log(await decodedToken("refresh_token",setRefToken)
);

getWishlist()

        navigate('/home');
      }

    } catch (error: any) {
      setApiErr(error.response.data.message);
      console.log(error.response.data.message);

    }
  }





  function filterErrByWord(arr: string[], word: string): string[] {
    return arr.filter(err => err.startsWith(word))
  }
  const filterEmailErr = filterErrByWord(validErr, "email")
  const filterPassErr = filterErrByWord(validErr, "password")

  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(2).max(15).required(),
  });

  return (

    <>
      <div className="container d-flex align-item-center  my-5 ">
        <div className="w-50 m-auto shadow shadow-lg p-5">
          <form onSubmit={submitData}>
            <div className="row g-3">



            <div className="col-md-6">
                <div className=' '>
                  <input onChange={getUserData} type="text" name='email' id='email' className='text-muted form-control ] my-3' required placeholder='Email' />
                  {filterEmailErr?.length > 0 ? <div className="alert alert-light p-1 text-center">
                    {filterEmailErr}
                  </div> : ""}

                  {/* {validErr?.some(err => err.startsWith("email")) ? (<div className="alert alert-light p-1 text-center">
                                        {validErr.filter(err => err.startsWith("email"))}
                                    </div>) : ""} */}
                </div>



              
             



              </div>
              <div className="col-md-6">


                <div className=' '>
                  <input onChange={getUserData} type="password" name='password' id='password' className='text-muted form-control  my-3' required placeholder='Password' />
                  {filterPassErr?.length > 0 ? <div className="alert alert-light p-1 text-center">
                    {filterPassErr}
                  </div> : ""}


                  {/* {validErr?.some(err => err.startsWith("password")) ? (
                                        <div className="alert alert-light p-1 text-center">
                                            {validErr.filter(err => err.startsWith("password"))}
                                        </div>
                                    ) : ""} */}
                </div>

              



              </div>
             

            </div>
            {apiErr ? (<div className="alert alert-danger p-1 text-center">{apiErr}</div>) : ""}
          

            <div >
              <button className="btn btn-primary btnbrd text-white w-100 py-2 my-4" > login</button>

            </div>


            <div>
              <p className="text-muted text-center ">Forget Password? <Link to='/login' className='text-primary'>Log in</Link></p>
            </div>
          </form>
        </div>
      </div>
    </>

  )
}
