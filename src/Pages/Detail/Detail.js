import React, { useEffect } from "react";
import style from "./Detail.module.css";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import ModalEditProduct from "../../Components/ModalEditProduct/ModalEditProduct";
import ModalDeleteProduct from "../../Components/ModalDeleteProduct/ModalDeleteProduct";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../Redux/features/product/productSlice";
import LoadingData from "../../Components/LoadingData/LoadingData";
import ModalNeedLogin from "../../Components/ModalNeedLogin/ModalNeedLogin";
import ModalUpdateProductImg from "../../Components/ModalUpdateProductImg/ModalUpdateProductImg";

const Detail = () => {
  const { data, isLoading } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, navigate, id]);

  const token = localStorage.getItem("userToken");

  return (
    <>
      <div className={`d-flex gap-2 align-items-center ${style.header}`}>
        <div>
          <MdArrowBackIos size={25} onClick={() => navigate("/")} />
        </div>
        <span>Back home</span>
      </div>
      {isLoading ? (
        <LoadingData />
      ) : (
        <div className="row my-4">
          <div className="col-md-4">
            <div className={style.container}>
              {data?.map((item) => (
                <div key={item.id}>
                  <img
                    src={item.img}
                    alt="Avatar"
                    className={style.image}
                    style={{ width: "100%" }}
                  />

                  <ModalUpdateProductImg />
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-8">
            <div className={`card ${style.cardRight}`}>
              <div className="card-body">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Product Name</th>
                      <th scope="col">Purchase Price</th>
                      <th scope="col">Sell Price</th>
                      <th scope="col">Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>Rp. {item.purchase_price}</td>
                        <td>Rp. {item.sell_price}</td>
                        <td>{item.stock} pcs</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="d-flex text-end gap-3 justify-content-end">
                  {!token ? (
                    <ModalNeedLogin text="Delete Product" color="danger" />
                  ) : (
                    <ModalDeleteProduct />
                  )}
                  {!token ? (
                    <ModalNeedLogin text="Edit Data" color="primary" />
                  ) : (
                    <ModalEditProduct data={data} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
