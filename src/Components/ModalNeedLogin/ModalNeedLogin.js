import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function ModalNeedLogin(props) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(props);

  return (
    <>
      <Button
        variant={props.color}
        className="rounded-pill"
        onClick={handleShow}
      >
        {props.text}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="row text-center">
            <AiOutlineInfoCircle size={100} color="#7432f9" className="my-3" />
            <p>You need to login first!</p>
          </div>
          <div className="d-flex gap-3 justify-content-center my-3">
            <button
              className="btn btn-secondary rounded-pill"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary rounded-pill"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalNeedLogin;
