import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProduct,
  getProducts,
  UpdateProduct,
} from "../../redux/features/product/productSlice";
import ProductForm from "../../components/product/productForm/ProductForm";
import Loader from "../../components/loader/Loader";

export default function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.product.isLoading);
  const productEdit = useSelector((state) => state.product.product);

  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);
  console.log(productEdit?.product);
  useEffect(() => {
    setProduct(productEdit?.product);
    setImagePreview(
      productEdit && productEdit?.image
        ? productEdit?.product?.image?.filePath
        : null
    );
    setDescription(
      productEdit && productEdit.product?.description ? productEdit?.product?.description : null
    );
  }, [productEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value || '' });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product?.name);
    formData.append("category", product?.category);
    formData.append("quantity", product?.quantity);
    formData.append("price", product?.price);
    formData.append("description", description);
    if (productImage) {
      formData.append("image", productImage);
    }
    console.log(product?.category)
    console.log(...formData);

    await dispatch(UpdateProduct({ id, formData }));
    await dispatch(getProducts());

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Product</h3>
      <ProductForm
        product={product}
        placeholder={product?.product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
        setImagePreview={setImagePreview}
      />
    </div>
  );
}
