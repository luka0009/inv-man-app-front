import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./ProductDetail.scss";
import useRedirect from "../../../customHook/useRedirect";
import { getProduct } from "../../../redux/features/product/productSlice";
import Card from '../../card/Card';
import { SpinnerImg } from "../../loader/Loader";
import DOMPurify from "dompurify";

export default function ProductDetail() {
  useRedirect("/login");
  const dispatch = useDispatch();
  const {id} = useParams();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const stockStatus = (quantity) => {
    if(quantity > 0) {
      return <span className="--color-success"> In Stock </span>
    } else {      
      return <span className="--color-danger"> Out of Stock </span>
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getProduct(id));
    }
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  console.log(product);
  return (
    <div className="product-detail">
      <h3 className="--mt">Product Details</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {product && (
          <div className="detail">
            <Card cardClass='group'>
              {product?.product?.image ? (
                <img src={product?.product?.image?.filePath} alt={product?.product?.image?.fileName} />
              ) : (
                <p>No Image is added for this product or image is added in format that is not accepted
                  <br />
                  <br />
                  accepted formats are: jpeg, jpg, png.
                </p>
              )}
            </Card>
            <h4>Product Availability {stockStatus(product.quantity)}</h4>
            <hr />
            <h4 style={{fontWeight:'bold', color: 'black'}}>
              product name: {product?.product?.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {product?.product?.sku}
            </p>
            <p>
              <b>&rarr; Category : </b> {product?.product?.category}
            </p>
            <p>
              <b>&rarr; Price : </b> {"$"}
              {product?.product?.price}
            </p>
            <p>
              <b>&rarr; Quantity in stock : </b> {product?.product?.quantity}
            </p>
            <p>
              <b>&rarr; Total Value in stock : </b> {"$"}
              {product?.product?.price * product?.product?.quantity}
            </p>
            <hr />
            <span style={{fontWeight: 'bold', fontSize: '19px', color: 'black'}}> Description </span>: <div dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product?.product?.description)
            }}>
            </div>
            <hr />
              <code className="--color-dark">Created At: {product?.product?.createdAt.toLocaleString('en-US')}</code>
              <br />
              <code className="--color-dark">Updated At: {product?.product?.updatedAt.toLocaleString('en-US')}</code>
          </div>
        )}
      </Card>
    </div>
  )
};