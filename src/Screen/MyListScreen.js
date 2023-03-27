import React, { useEffect, useState } from "react";
import { Container, Row, Col, Carousel, Form, Button } from "react-bootstrap";
import Product from "../Components/Product";
import Slider from "../Components/Carousel";
import axios from "axios";
// import products from '../products'
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../Actions/productActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { useNavigate } from "react-router-dom";
import MyList1 from "../Components/MyList";

function MyListScreen() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  let navigate = useNavigate();
  const { userInfo } = userLogin;
  const productIds = userInfo.mylist;

  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;


  useEffect(() => {
    dispatch(listProducts());
  }, []);

  if (!userInfo) {
    navigate("/login");
  } else {
    if (!userInfo.isSubscriber) {
      navigate("/plans");
    }
  }

  let mappedProducts = [];
  if (products.length > 0) {
    mappedProducts = productIds.map((id) =>
      products.find((product) => product._id === id)
    );
  }

  return (
    <div>
      {/* <Slider /> */}
      <br />
      <Container fluid>
        <div class="text-center" variant="light">
          <h1>Latest Movies</h1>
          <Form>
            <Row>
              <Col md={3} />
              <Col md={6}>
                <Form.Control
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  placeholder="Search"
                  className="me-1"
                  aria-label="Search"
                />
              </Col>
            </Row>
          </Form>
          <br />
        </div>
        <Row>
          {mappedProducts
            .filter((product) => {
              return search.toLowerCase() === ""
                ? product
                : product.name.toLowerCase().includes(search) ||
                    product.description.toLowerCase().includes(search) ||
                    product.genre.toLowerCase().includes(search) ||
                    product.genre_two.toLowerCase().includes(search) ||
                    product.genre_three.toLowerCase().includes(search);
            })
            .map((product) => {
              return (
                <Col
                  className="row g-1"
                  key={product._id}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                >
                  <Product product={product} />
                </Col>
              );
            })}
        </Row>
      </Container>
    </div>
  );
}

export default MyListScreen;
