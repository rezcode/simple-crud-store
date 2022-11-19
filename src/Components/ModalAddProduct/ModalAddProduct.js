import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";
import {
  addNewProduct,
  resetProduct,
} from "../../Redux/features/product/productSlice";

function ModalAddProduct() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [stock, setstock] = useState(0);
  const [img, setImg] = useState({});
  const { isLoading, isError, message } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userLogged = {
    user: JSON.parse(localStorage.getItem("user")),
    token: JSON.parse(localStorage.getItem("userToken")),
  };

  const handleImage = (e) => {
    let image = e.target.files[0];
    setImg(image);
  };

  useEffect(() => {
    if (isError) {
      Swal.fire({
        icon: "error",
        text: message,
      });
      // .then((result) => result.isConfirmed && handleClose());
    }
    dispatch(resetProduct());
  }, [message, isError, dispatch]);

  const handleAddRecipe = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("purchasePrice", purchasePrice);
    formData.append("sellPrice", sellPrice);
    formData.append("stock", stock);
    formData.append("img", img);

    const config = {
      headers: {
        Authorization: `Bearer ${userLogged?.token}`,
        "Content-Type": "multipart/form-data; ",
      },
    };

    const userData = {
      formData,
      config,
    };

    dispatch(addNewProduct(userData));
    handleClose();
  };

  return (
    <>
      <Button variant="primary" className="rounded-pill" onClick={handleShow}>
        Add new product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleAddRecipe}>
          <Modal.Header closeButton>
            <Modal.Title>New product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label className="form-label">Product name :</label>
              <input
                type="text"
                className="form-control rounded-pill"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Product image :</label>
              <input
                type="file"
                className="form-control rounded-pill"
                onChange={handleImage}
                accept="image/png, image/gif, image/jpeg"
                required
              />
              <small className="text-danger" style={{ fontSize: "12px" }}>
                Format file must be .jpg, .png only and max size 100 kb
              </small>
            </div>
            <div className="mb-3">
              <div className="row">
                <div className="col-4">
                  <label className="form-label">Purchase price :</label>
                  <input
                    type="number"
                    className="form-control rounded-pill"
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    min="0"
                    onKeyPress={(event) => {
                      if (event.charCode < 48) {
                        event.preventDefault();
                      }
                    }}
                    required
                  />
                </div>
                <div className="col-4">
                  <label className="form-label">Sell price :</label>
                  <input
                    type="number"
                    className="form-control rounded-pill"
                    min="0"
                    onChange={(e) => setSellPrice(e.target.value)}
                    onKeyPress={(event) => {
                      if (event.charCode < 48) {
                        event.preventDefault();
                      }
                    }}
                    required
                  />
                </div>
                <div className="col-4">
                  <label className="form-label">Stock :</label>
                  <input
                    type="number"
                    className="form-control rounded-pill"
                    min="0"
                    onChange={(e) => setstock(e.target.value)}
                    onKeyPress={(event) => {
                      if (event.charCode < 48) {
                        event.preventDefault();
                      }
                    }}
                    required
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
            <Button
              variant="primary"
              className="rounded-pill"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : "Submit"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default ModalAddProduct;
