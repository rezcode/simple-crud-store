import React from "react";
import ModalAddProduct from "../../Components/ModalAddProduct/ModalAddProduct";
import ProductList from "../../Components/ProductList/ProductList";
import style from "./Home.module.css";
import data from "../../DummyData/Data";

const Home = () => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div className={style.header}>
          <input
            type="text"
            className="form-control rounded-pill"
            placeholder="search product..."
          />
        </div>
        <div>
          <ModalAddProduct />
        </div>
      </div>
      <hr />
      <div className="row">
        {data?.map((item) => (
          <ProductList key={item.id} {...item} />
        ))}
      </div>
    </>
  );
};

export default Home;
