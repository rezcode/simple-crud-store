import React, { useState } from "react";
import { RiAlertLine } from "react-icons/ri";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../Redux/features/product/productSlice";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ModalDeleteProduct() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userLogged = {
    user: JSON.parse(localStorage.getItem("user")),
    token: JSON.parse(localStorage.getItem("userToken")),
  };

  const handleDelete = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userLogged?.token}`,
        "Content-Type": "multipart/form-data; ",
      },
    };

    let data = {
      config,
      id,
    };

    dispatch(deleteProduct(data));
    Swal.fire({
      text: "Product Deleted",
      icon: "success",
    });
    navigate("/");
  };

  return (
    <>
      <Button variant="danger" className="rounded-pill" onClick={handleShow}>
        Delete product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="row text-center">
            <RiAlertLine size={100} color="#d63384" className="my-3" />
            <p>Are you sure to delete this product?</p>
          </div>
          <div className="d-flex gap-3 justify-content-center my-3">
            <button
              className="btn btn-secondary rounded-pill"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger rounded-pill"
              onClick={handleDelete}
            >
              Yes delete it
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalDeleteProduct;
