import React, { useEffect, useState } from "react";
import "./productList.scss";
import { SpinnerImg } from "../../loader/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts } from "../../../redux/features/product/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteProduct,
  getProducts,
} from "../../../redux/features/product/productSlice";
import { Link } from "react-router-dom";

export default function ProductList({ products, isLoading }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(
    (state) => state.filter.filteredProducts
  );

  const shortenText = (text, n) => {
    if (text.length > n) {
      const newText = text.substring(0, n).concat("...");
      return newText;
    }
    return text;
  };

  const delProduct = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      // message: "Are you sure to delete a product.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert("Click No"),
        },
      ],
    });
  };

  /// ------- pagination ------------------------------------------
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredProducts?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % filteredProducts?.length;
    setItemOffset(newOffset);
  };
  /// -------------------------------------------------------------

  useEffect(() => {
    dispatch(filterProducts({ products, search }));
  }, [products, search, dispatch]);
  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}
        <div className="table">
          {!isLoading && products?.length === 0 ? (
            <p>No products found. Please add your products first</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>&#x2116;</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>{`$${price}`}</td>
                      <td>{quantity}</td>
                      <td>{`$${price * quantity}`}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/product-details/${_id}`}>
                            <AiOutlineEye size={25} color={"blue"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/update-product/${_id}`}>
                          <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            onClick={() => confirmDelete(_id)}
                            size={20}
                            color={"#8B0000"}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< Previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
}
