import React, { useState } from "react";
import { useEffect } from "react";

function ProductDataList({ success }) {

    const [products, setProducts] = useState([]);


    useEffect(() => {

        if (success) {
            const parsed = success.map((ele) => ({ ...ele, showMore: false }))
            setProducts(parsed);
        }
    }, [success]);

    function toggleMore(productId) {

        setProducts(prev => (
            prev.map((ele) => (ele.id === productId ? { ...ele, showMore: !ele.showMore } : ele))
        ));
    }

    if (!products.length) return null;

    return (
        <>
            <div className="container">
                <div className="row g-3">
                    {
                        products && products.map((product) => (
                                <div key={product.id} className="col-12 col-md-4" >
                                    <div className="card" style={{ width: '20rem' }}>
                                        <div className="card-img bg-black">
                                            <img src={product.images[0]} alt="" className="w-100 h-100 object-fit-cover" />
                                        </div>
                                        <div className="card-body">
                                            <p>{!product.showMore ? product.description.slice(0, 50) : product.description.slice(50)}
                                                <span
                                                    onClick={() => toggleMore(product.id)}
                                                    style={{ cursor: 'pointer' }} className="text-info fw-semibold ms-1">{!product.showMore ? 'More' : 'Less'}</span>
                                            </p>
                                        </div>
                                        <div className="card-footer">
                                            <button className="btn btn-success">Order Now</button>
                                        </div>
                                    </div>
                                </div>
                        ))

                    }
                </div>
            </div>
        </>
    )
}

export default ProductDataList;