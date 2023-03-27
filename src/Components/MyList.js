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
import MyList from "../Components/MyList";

// const getFilteredItems = (query, items) => {
//   if (!query) {
//     return items;
//   }
//   return items.filter((song) => song.name.includes(query));
// };
function MyList1() {
  // const [query, setQuery] = useState("");

  // const [products, setProducts] = useState([])
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  let navigate = useNavigate();
  const { userInfo } = userLogin;

  if (!userInfo) {
    navigate("/login");
  } else {
    if (!userInfo.isSubscriber) {
      navigate("/plans");
    }
  }

  const [products, setProducts] = useState([]);
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    axios
      .get("https://naigtest.pythonanywhere.com/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const mylistFromLocalStorage =
    localStorage.getItem("userInfo").mylist || "[]";
    const parsedMyList = JSON.parse(mylistFromLocalStorage);
    console.log('parsedMyList', parsedMyList);
    setMyList(parsedMyList);
  }, []);

  const filteredProducts = products.filter((product) => myList.includes(product._id));

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
        {filteredProducts.map((product) => (
        <div key={product._id}>{product.name}</div>
      ))}
      
      </Container>
    </div>
  );
}

export default MyList1;
