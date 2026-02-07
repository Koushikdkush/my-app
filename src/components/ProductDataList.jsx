import React, { useState } from "react";
import { useEffect } from "react";

function ProductDataList({ success }) {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);


    useEffect(() => {

        if (success) {
            const parsed = success.map((ele) => ({
                ...ele, showMore: false,
                updateStatus: 'Order Now'
            }))
            setProducts(parsed.slice(page, limit));
        }
    }, [success, page, limit]);

    function toggleMore(productId) {

        setProducts(prev => (
            prev.map((ele) => (ele.id === productId ? { ...ele, showMore: !ele.showMore } : ele))
        ));
    }


    function update_cart(productId) {
        setProducts(prev => (
            prev.map((prod) => (prod.id === productId ? { ...prod, updateStatus: 'Added To Cart' } : prod))
        ))
    }

    function removeCart(productId) {
        setProducts(prev => (
            prev.map((prod) => (prod.id === productId ? { ...prod, updateStatus: 'Order Now' } : prod))
        ))
    }

    function next() {
        setPage(p => p + 10);
        setLimit(l => l + 10);
    }

    function previous() {
        if (page <= 0) return;
        setPage(p => p <= 10 ? 0 : p - 10);
        setLimit(l => l === 10 ? 10 : l - 10);
    }

    if (!products.length) return null;

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 d-flex justify-content-between">
                        <button className="btn btn-secondary" onClick={previous}>Previous</button>
                        <button className="btn btn-primary" onClick={next}>Next</button>

                    </div>
                </div>
                <div className="row g-3 mt-2">
                    {
                        products && products.map((product) => (
                            <div key={product.id} className="col-12 col-md-4">
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
                                    <div className="card-footer d-flex justify-content-between">
                                        <button onClick={() => update_cart(product.id)}
                                            className={`btn 
                                        ${product.updateStatus === 'Added To Cart' ? 'btn-warning' : 'btn-success'}`}>
                                            {product.updateStatus}</button>

                                        {
                                            product && product.updateStatus === 'Added To Cart' && (
                                                <>
                                                    <button
                                                        onClick={() => removeCart(product.id)}
                                                        className="btn btn-danger">Remove</button>
                                                </>
                                            )
                                        }
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