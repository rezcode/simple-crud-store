import React, { useState } from "react";
import { RiAlertLine } from "react-icons/ri";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalDeleteProduct() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="danger" className="rounded-pill" onClick={handleShow}>
        Delete product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="row text-center">
            <RiAlertLine size={60} color="#d63384" className="my-3" />
            <p>Are you sure to delete this product?</p>
          </div>
          <div className="d-flex gap-3 justify-content-center my-3">
            <button
              className="btn btn-secondary rounded-pill"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button className="btn btn-danger rounded-pill">
              Yes delete it
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalDeleteProduct;
