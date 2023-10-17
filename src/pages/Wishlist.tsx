import React from 'react'
import { useWishlistContext } from '../context/WishlistContext'
import { Col, Row, Stack } from 'react-bootstrap'
import WishlistCompontent from '../Component/WishlistCompontent/WishlistCompontent'

export default function Wishlist() {


    const { wishlistUser } = useWishlistContext()

    const list: string[] = wishlistUser[0]?.userWishList

    return (


        <>
            <div className="container">
                <Stack direction='horizontal' gap={3} className=''>
                    <Row  >


                        {list && (
                            list.map(item =>


                                <WishlistCompontent itemId={item} />
                            )
                        )}
                    </Row>

                </Stack>

            </div>

        </>
    )
}
