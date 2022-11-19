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
  const response = await axios.delete(
    `${process.env.REACT_APP_API_URL}/product/${data.id}`,
    data.config
  );

  return response.data;
};

const productService = {
  getAllProduct,
  getProductDetail,
  addNewProduct,
  deleteProduct,
};

export default productService;
