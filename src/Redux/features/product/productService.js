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
  console.log("data product", dataProduct);
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/product/add`,
    dataProduct.formData,
    dataProduct.config
  );

  return response.data;
};

const productService = {
  getAllProduct,
  getProductDetail,
  addNewProduct,
};

export default productService;
