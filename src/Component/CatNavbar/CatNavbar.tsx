import React from 'react'
import useUrl from '../../hooks/useUrl'
import { Url } from '../../Utilities/MainUrl'
import { AllCat, Category, Subcategoty } from '../../Interfaces/CartegoryInterface'
import { Link, NavLink } from 'react-router-dom'
import './catnav.css';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'


export default function CatNavbar() {


    const { allData } = useUrl<AllCat>(`${Url}category`)
    const categories: Category[] | undefined = allData?.category






    return (

        <>

            <nav className="navbar navbar-expand-lg  shadow shadow-lg ">
                <div className="container">
                    <div className="d-flex col-3 justify-content-start">
                        <h2 className=" h4 text-black" >All Categories</h2>

                    </div>


                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">


                        <>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">






                                {categories?.map(cat => (
                                    <li className="nav-item dropdown" key={cat._id}>
                                        <NavLink className={({ isActive }) => isActive ? "nav-link text-muted active dropdown-toggle" : "nav-link text-muted dropdown-toggle"} to={`category/${cat.slug}/${cat._id}`}  >
                                            {cat.name}
                                        </NavLink>
                                        {cat.subcategoty && cat.subcategoty.length > 0 && (
                                            <ul className="dropdown-menu ">

                                                {
                                                    cat.subcategoty.map(subCat => (
                                                        <li key={subCat._id}>  <Link className='dropdown-item' to={`/subcategory/${subCat.slug}/${subCat._id}`}    >{subCat.name}</Link></li>



                                                    ))
                                                }
                                            </ul>

                                        )}

                                    </li>


                                ))}













                            </ul>

                        </>







                    </div>
                </div>
            </nav>


        </>


    );

    //   <div className="category-navbar">
    //     <ul>
    //       {categories?.map(category => (
    //         <li key={category._id}>
    //           <NavLink to={`/category/${category.slug}`}>{category.name}</NavLink>
    //           {category?.subcategoty && category?.subcategoty?.length > 0 && (
    //             <ul className="subcategory-dropdown">
    //               {category.subcategoty.map(subcategory => (
    //                 <li key={subcategory._id}>
    //                   <NavLink to={`/subcategory/${subcategory.slug}`}>{subcategory.name}</NavLink>
    //                 </li>
    //               ))}
    //             </ul>
    //           )}
    //         </li>
    //       ))}
    //     </ul>
    //   </div>


}
