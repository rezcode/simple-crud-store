import React from "react";
import style from "./ProductList.module.css";
import { useNavigate } from "react-router-dom";

const ProductList = ({ id, img, name, purchase_price, sell_price, stock }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="col-md-2 mb-4">
        <div
          className={`card ${style.cardProduct}`}
          style={{ width: "100%" }}
          onClick={() => navigate(`/detail/${id}`)}
        >
          <img src={img} className="card-img-top" alt="..." />
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <b>{name}</b> <br />
                <span className="text-secondary">Rp{purchase_price}</span>
              </div>
              <div>
                <button
                  type="button"
                  className={`btn btn-primary btn-sm rounded-pill position-relative ${style.stockBadge}`}
                >
                  Stock
                  <span className="position-absolute top-0 start-100 translate-middle badge bg-danger">
                    {stock}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
