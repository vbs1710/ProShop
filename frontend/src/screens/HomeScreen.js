import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import Product from "../components/Product";
import ProductCarousel from "../components/ProductCarousel";

const Homescreen = () => {
  const { keyword, pageNumber } = useParams();
  // console.log(`keyword- ${keyword} and pageNumber-${pageNumber}`);
  const dispatch = useDispatch();
  // if (!pageNumber) {
  //   pageNumber = 1;
  // }

  const productList = useSelector((state) => state.productList); // ye wahi productList h jo humne store mei combineReducer ke andar banayi thi
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    // axios.get('/api/products').then  ye wala syntax hum use nhi krenge ...its not a good way to write the promises ...axios.get return promise so we willl use async await buttt useEffect ke arrow function mei async await use nhi kr skte toh hum useEffect ke andar ek aur function bana denge
    // const fetchProducts = async() => {
    //     const {data} = await axios.get('/api/products')

    //     setProducts(data) // basically ye data jo h vo res.data ka h... matlab jaha {data} ye h waha hum ye res.data bhi likh skte h kyuki response ka hi part h data.....
    // }

    // fetchProducts()
    // ye jo upar h code vo component level pr kaam kr rha h pr hum react-redux use krke global level pr kaam krenge

    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default Homescreen;
