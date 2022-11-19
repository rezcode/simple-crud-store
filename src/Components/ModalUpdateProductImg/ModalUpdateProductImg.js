import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import style from "./ModalUpdateProductImage.module.css";
import { BsFillImageFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  editImgProduct,
  resetProduct,
} from "../../Redux/features/product/productSlice";

function ModalUpdateProductImg(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [img, setImg] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isError, message, isSuccess } = useSelector((state) => state.product);

  const userLogged = {
    user: JSON.parse(localStorage.getItem("user")),
    token: JSON.parse(localStorage.getItem("userToken")),
  };

  useEffect(() => {
    if (isError) {
      Swal.fire({
        icon: "error",
        text: message,
      });
      // .then((result) => result.isConfirmed && handleClose());
    }

    if (isSuccess) {
      Swal.fire({
        icon: "success",
        text: "product image updated",
      });
    }
    dispatch(resetProduct());
  }, [message, isError, dispatch, isSuccess]);

  const handleImage = (e) => {
    let image = e.target.files[0];
    setImg(image);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", img);

    const config = {
      headers: {
        Authorization: `Bearer ${userLogged?.token}`,
        "Content-Type": "multipart/form-data; ",
      },
    };

    const data = {
      formData,
      config,
      id,
    };
    dispatch(editImgProduct(data));
  };

  return (
    <>
      <label
        onClick={handleShow}
        className={`btn btn-light rounded-circle ${style.middle}`}
      >
        <BsFillImageFill size={20} className="mb-2" /> Change image
      </label>

      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="mb-3">
              <label className="form-label">Product Image :</label>
              <input
                type="file"
                className="form-control rounded-pill"
                onChange={handleImage}
                required
                accept="image/png, image/jpg"
              />
              <small className="text-danger" style={{ fontSize: "12px" }}>
                Format file must be .jpg, .png only and max size 100 kb
              </small>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className="rounded-pill"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button variant="primary" className="rounded-pill" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default ModalUpdateProductImg;
