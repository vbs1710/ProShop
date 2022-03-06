import React, { useEffect, useState } from "react";
import {
  Col,
  Image,
  ListGroup,
  Row,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";

const ProductScreen = () => {
  const { id } = useParams();
  // const product = products.find((p) => p._id ===(id)) // jo video mei ye wali lineh vo react router version 5 ki h .. version 6 mei match wagera jo video mei use kre h vo band kr diye h .... id ke liye ab useParams hook use krna padega ....
  // const [product,setProduct] = useState({}) // ab yaha ek single product ki baat ho rhi h isiliye humne useEffect ke andar {} curly braces lagaye h ... wahi homescreen wali file mei humne useEffect ke andar [] square brackets lagaye the kyuki waha multiple products the... toh waha array ya list use hogi

  const [qty,setQty] = useState(0)

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    // // axios.get('/api/products').then  ye wala syntax hum use nhi krenge ...its not a good way to write the promises ...axios.get return promise so we willl use async await buttt useEffect ke arrow function mei async await use nhi kr skte toh hum useEffect ke andar ek aur function bana denge
    // const fetchProduct = async() => {
    //     const {data} = await axios.get(`/api/products/${id}`)
    //     // console.log('the data is',data) this line was used for checking purposes
    //     setProduct(data) // basically ye data jo h vo res.data ka h... matlab jaha {data} ye h waha hum ye res.data bhi likh skte h kyuki response ka hi part h data.....
    // }

    // fetchProduct()
    // jo upar h vo component level pr h pr react-redux use krke hum global level pr use krenge

    dispatch(listProductDetails(id));
  }, [id, dispatch])

  const navigate = useNavigate()
  const addToCartHandler = () => {
      navigate(`/cart/${id}?qty=${qty}`)
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: ${product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)} >
                                    {[...Array(product.countInStock).keys()].map(x => (
                                        <option key={x+1} value={x+1}>
                                            {x+1}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
