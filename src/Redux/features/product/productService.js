import axios from "axios";

const getAllProduct = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/`);

  return response.data;
};

const getProductDetail = async (id) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/${id}`
  );

  return response.data;
};

const addNewProduct = async (dataProduct) => {
  await axios.post(
    `${process.env.REACT_APP_API_URL}/product/add`,
    dataProduct.formData,
    dataProduct.config
  );

  const checkAllProduct = await getAllProduct();

  return checkAllProduct;
};

const deleteProduct = async (data) => {
  await axios.delete(
    `${process.env.REACT_APP_API_URL}/product/${data.id}`,
    data.config
  );

  const checkAllProduct = await getAllProduct();

  return checkAllProduct.data;
};

const editProduct = async (data) => {
  console.log(data.body, data.id, data.config);
  const response = await axios.patch(
    `${process.env.REACT_APP_API_URL}/product/${data.id}`,
    data.body,
    data.config
  );

  return response.data;
};

const editImgProduct = async (data) => {
  console.log(data.formData, data.id, data.config);
  const response = await axios.patch(
    `${process.env.REACT_APP_API_URL}/product/image/${data.id}`,
    data.formData,
    data.config
  );

  console.log(response);
  return response.data;
};

const productService = {
  getAllProduct,
  getProductDetail,
  addNewProduct,
  deleteProduct,
  editProduct,
  editImgProduct,
};

export default productService;
