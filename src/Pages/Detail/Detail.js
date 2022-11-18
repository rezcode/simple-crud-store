import React from "react";
import style from "./Detail.module.css";
import phoneDummy from "../../Assets/Images/amir-hanna-sweUF7FcyP4-unsplash.jpg";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ModalEditProduct from "../../Components/ModalEditProduct/ModalEditProduct";
import ModalDeleteProduct from "../../Components/ModalDeleteProduct/ModalDeleteProduct";

const Detail = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={`d-flex gap-2 align-items-center ${style.header}`}>
        <div>
          <MdArrowBackIos size={25} onClick={() => navigate("/")} />
        </div>
        <span>Back home</span>
      </div>
      <div className="row my-4">
        <div className="col-md-4">
          <div className={`card ${style.cardLeft}`}>
            <div className="card-body">
              <img src={phoneDummy} className="card-img-top" alt="..." />
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className={`card ${style.cardRight}`}>
            <div className="card-body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Purchase Price</th>
                    <th scope="col">Sell Price</th>
                    <th scope="col">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Iphone</td>
                    <td>Rp. 12.000.000</td>
                    <td>Rp. 14.000.000</td>
                    <td>5 pcs</td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex text-end gap-3 justify-content-end">
                <ModalDeleteProduct />
                <ModalEditProduct />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
