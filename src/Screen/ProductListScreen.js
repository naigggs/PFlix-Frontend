import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { listProducts, deleteProduct } from "../Actions/productActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { useDispatch, useSelector } from "react-redux";

const ProductListScreen = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const [setProducts] = useState([]);
  const { error, loading, products } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  useEffect(() => {
    dispatch(listProducts());
  }, []);
  const userLogin = useSelector((state) => state.userLogin);
  let navigate = useNavigate();
  const { userInfo } = userLogin;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id)).then((response) => {
        navigate("/deleted");
      });
    }
  };
  if (!userInfo) {
    navigate("/login");
  } else {
    if (!userInfo.isAdmin) {
      navigate("/");
    }
  }
  return (
    <div>
      <div className="text-center">
        <br />
        <h3>MOVIE LIST</h3>
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
        <div class="container">
          <div class="row">
            <div class="row justify-content-center mt-10 gap-2">
              <Link to="/addmovie" className="btn btn-primary">
                Add Movie
              </Link>


              <Link to="/adddirector" className="btn btn-primary">
                Add Director
              </Link>
              
              <Link to="/addgenre" className="btn btn-primary">
                Add Genre
              </Link>
            </div>
          </div>
        </div>
      </div>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>MOVIE</th>
            <th>POSTER</th>
            <th>VIDEO</th>
            <th>DESCRIPTION</th>
            <th>GENRE</th>
            <th>DIRECTOR</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <tbody>
            {products
              .filter((product) => {
                return search.toLowerCase() === ""
                  ? product
                  : product.name.toLowerCase().includes(search) ||
                      product.description.toLowerCase().includes(search) ||
                      product.genre.includes(search) ||
                      product.genre_two.toLowerCase().includes(search) ||
                      product.genre_three.toLowerCase().includes(search);
              })
              .map((product) => {
                return (
                  <tr key="">
                    <td>{product.name}</td>
                    <td>
                      <img
                        className="rounded"
                        src={product.image}
                        width="400"
                        height="250"
                      />
                    </td>
                    <td>{product.video}</td>
                    <td>{product.description}</td>
                    <td>
                      {product.genre} <br /> {product.genre_two}
                      <br />
                      {product.genre_three}
                    </td>
                    <td>{product.director}</td>
                    <td>
                      <div class="d-grid gap-1">
                        <Button
                          variant="danger"
                          className="btn-md"
                          onClick={() => deleteHandler(product._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                        {/* <Button variant='primary' className='btn-md'>
                        <i className='fas fa-edit'></i>
                      </Button> */}
                        <LinkContainer to={`/editmovie/${product._id}`}>
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        )}
      </Table>
    </div>
  );
};

export default ProductListScreen;
