import React, { useMemo, useState } from "react";

function ProductDataList({ success }) {

    const [page, setPage] = useState(1);
    const [product, setUiState] = useState({});

    // initial load of Products 
    const parsedProducts = useMemo(() => {
        if (success) {
            return success.map((ele) => ({
                ...ele, showMore: product[ele.id]?.showMore ?? false,
                updateStatus: product[ele.id]?.updateStatus ?? 'Order Now'
            }));
        }
    }, [success, product]);


    // paginated products 
    const paginatedProds = useMemo(() => {
        if (!parsedProducts) return [];

        const pagePoint = (page - 1) * 10;
        return parsedProducts && parsedProducts.slice(pagePoint, pagePoint + 10);
        
    }, [parsedProducts, page]);


    function toggleMore(productId) {
        setUiState(prev => ({
            ...prev,
            [productId.id]: {
                ...prev[productId.id],
                showMore: !prev[productId.id]?.showMore
            }
        }));
    }


    function update_cart(productId) {

        setUiState(prev => ({
            ...prev,
            [productId.id]: {
                ...prev[productId.id],
                updateStatus: 'Added To Cart'
            }
        }));
    }

    function removeCart(productId) {
        setUiState(prev => ({
            ...prev,
            [productId]: {
                ...prev[productId],
                updateStatus: 'Order Now'
            }
        }));
    }

    function next() {
        setPage(p => p + 1);
    }

    function previous() {
        if (page === 1) return;
        setPage(p => p - 1);
    }

    if (!paginatedProds.length) return null;

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
                        paginatedProds && paginatedProds.map((product) => (
                            <div key={product.id} className="col-12 col-md-4">
                                <div className="card" style={{ width: '20rem' }}>
                                    <div className="card-img bg-black">
                                        <img src={product.images[0]} alt="" className="w-100 h-100 object-fit-cover" />
                                    </div>
                                    <div className="card-body">
                                        <p>{!product.showMore ? product.description.slice(0, 50) : product.description.slice(50)}
                                            <span
                                                onClick={() => toggleMore(product)}
                                                style={{ cursor: 'pointer' }} className="text-info fw-semibold ms-1">{!product.showMore ? 'More' : 'Less'}</span>
                                        </p>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between">
                                        <button onClick={() => update_cart(product)}
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