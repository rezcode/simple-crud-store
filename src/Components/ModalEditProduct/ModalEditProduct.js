import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { editProduct } from "../../Redux/features/product/productSlice";

function ModalEditProduct(props) {
  const [name, setName] = useState("");
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const { id } = useParams();

  const userLogged = {
    user: JSON.parse(localStorage.getItem("user")),
    token: JSON.parse(localStorage.getItem("userToken")),
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${userLogged?.token}`,
      },
    };

    const body = {
      name,
      purchasePrice,
      sellPrice,
      stock,
    };
    const data = {
      id,
      body,
      config,
    };

    if (name === "" && purchasePrice === 0 && sellPrice === 0 && stock === 0) {
      Swal.fire({
        icon: "warning",
        text: "Please fill any field atleast one",
      });
    } else {
      dispatch(editProduct(data));
      Swal.fire({
        icon: "success",
        text: "Product updated",
      });
    }
  };

  return (
    <>
      <Button variant="primary" className="rounded-pill" onClick={handleShow}>
        Edit Data
      </Button>

      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label className="form-label">Product name :</label>
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder={props?.data?.[0]?.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <div className="row">
                <div className="col-4">
                  <label className="form-label">Purchase price :</label>
                  <input
                    type="number"
                    className="form-control rounded-pill"
                    placeholder={props?.data?.[0]?.purchase_price}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    min="0"
                    onKeyPress={(event) => {
                      if (event.charCode < 48) {
                        event.preventDefault();
                      }
                    }}
                  />
                </div>
                <div className="col-4">
                  <label className="form-label">Sell price :</label>
                  <input
                    type="number"
                    className="form-control rounded-pill"
                    placeholder={props?.data?.[0]?.sell_price}
                    onChange={(e) => setSellPrice(e.target.value)}
                    min="0"
                    onKeyPress={(event) => {
                      if (event.charCode < 48) {
                        event.preventDefault();
                      }
                    }}
                  />
                </div>
                <div className="col-4">
                  <label className="form-label">Stock :</label>
                  <input
                    type="number"
                    className="form-control rounded-pill"
                    placeholder={props?.data?.[0]?.stock}
                    onChange={(e) => setStock(e.target.value)}
                    min="0"
                    onKeyPress={(event) => {
                      if (event.charCode < 48) {
                        event.preventDefault();
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className="rounded-pill"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button variant="primary" className="rounded-pill" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default ModalEditProduct;
