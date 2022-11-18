import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalAddProduct() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" className="rounded-pill" onClick={handleShow}>
        Add new product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Product name :</label>
            <input type="text" className="form-control rounded-pill" />
          </div>
          <div className="mb-3">
            <label className="form-label">Product image :</label>
            <input type="file" className="form-control rounded-pill" />
          </div>
          <div className="mb-3">
            <div className="row">
              <div className="col-4">
                <label className="form-label">Purchase price :</label>
                <input type="number" className="form-control rounded-pill" />
              </div>
              <div className="col-4">
                <label className="form-label">Sell price :</label>
                <input type="number" className="form-control rounded-pill" />
              </div>
              <div className="col-4">
                <label className="form-label">Stock :</label>
                <input type="number" className="form-control rounded-pill" />
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
            onClick={handleClose}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddProduct;
