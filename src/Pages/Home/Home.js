import React, { useEffect } from "react";
import ModalAddProduct from "../../Components/ModalAddProduct/ModalAddProduct";
import ProductList from "../../Components/ProductList/ProductList";
import style from "./Home.module.css";
import LoadingData from "../../Components/LoadingData/LoadingData";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../Redux/features/product/productSlice";
import ModalNeedLogin from "../../Components/ModalNeedLogin/ModalNeedLogin";

const Home = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  const token = localStorage.getItem("userToken");

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
          {!token ? (
            <ModalNeedLogin text="Add New Product" color="primary" />
          ) : (
            <ModalAddProduct />
          )}
        </div>
      </div>
      <hr />
      <div className="row">
        {isLoading ? (
          <LoadingData />
        ) : (
          data?.map((item) => <ProductList key={item.id} {...item} />)
        )}
      </div>
    </>
  );
};

export default Home;
