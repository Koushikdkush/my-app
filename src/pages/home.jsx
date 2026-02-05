import React, { useMemo, useState } from "react";
import globalProductsJson from '../jsonData/products.json';
import '../styles/Home.css';
import { ModalComponent } from "../components/Modal";
export default function Home() {

    const {
        globalProducts
    } = globalProductsJson;

    const [products, setProds] = useState(globalProducts);
    const [search, setSearch] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [productSelected, setProductSelected] = useState(null);

    let filteredItems = useMemo(() => {
        if (!search) return products;

        return products.filter((ele) => ele.title.toLowerCase().includes(search.toLowerCase()));

    }, [search, products]);

    function deleteItem(rowIndex) {
        setProds(prev => (prev.filter((_, index) => index !== rowIndex)));
    }


    function open_Modal(product) {
        setProductSelected(product);
        setOpenModal(!openModal);
    }



    const Items = ({ className }) => {
        return (
            filteredItems.length > 0 && filteredItems.map((ele, index) => (
                <div
                    key={ele.id}
                    className={`${className} d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2`}
                >
                    {/* Title */}
                    <div className="text-break">
                        {ele.title}
                    </div>

                    {/* Actions */}
                    <div className="d-flex gap-2 align-self-end align-self-md-center">
                        <span
                        onClick={() => open_Modal(ele)}
                        className="badge bg-success btn">Edit</span>
                        <span
                            onClick={() => deleteItem(index)}
                            className="badge bg-danger btn"
                        >
                            Remove
                        </span>
                    </div>
                </div>
            ))
        )
    }

    return (
        <>
            <SearchBox search={search} setSearch={setSearch} className={'form-control'} />
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div className="list-group mt-2">
                            <Items className={'list-group-item'} />
                        </div>
                    </div>
                </div>
            </div>

            {
                productSelected && openModal && (
                    <ModalComponent setOpenModal={setOpenModal} productSelected={productSelected}>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <h6 className="text-muted text-center">Do you want to remove this item {productSelected.title}</h6>
                                </div>
                            </div>
                        </div>
                    </ModalComponent>
                )
            }
        </>
    )
}

const SearchBox = ({ search, setSearch, className }) => {
    return (
        <>
            <div className="container p-1">
                <div className="row">
                    <div className="col-6">
                        <input type="text" placeholder="Search Here.." className={className}
                            name="search" id="search" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
            </div>
        </>
    )
}