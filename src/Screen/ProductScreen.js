import React, { useEffect, useState } from "react";
import {
  ListGroup,
  Col,
  Row,
  Button,
  Card,
  Image,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  Player,
  ControlBar,
  VolumeMenuButton,
  PlayToggle,
  BigPlayButton,
} from "video-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import products from '../products'
// import '../App.css';
import DirectorLink from "../Components/DirectorLink";
import { listProductDetails, listProducts } from "../Actions/productActions";
import { detailDirector } from "../Actions/directorActions";
import Message from "../Components/Message";
import AddToListButton from "../Components/AddToListButton";
import Product from "../Components/Product";
import RemoveToListButton from "../Components/RemoveToListButton";

function Productscreen() {
  const { id } = useParams();
  // const { _id } = useParams();
  // const userId = userInfo.id;
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;

  const directorDetails = useSelector((state) => state.directorDetails);
  const { directors } = directorDetails;
  const [director, setDirector] = useState(directors);

  //   const { directorInfo } = axios.get(`/api/directors/1`);
  //   console.log(directorInfo);
  // console.log(direcotrInfo)
  // console.log(product.director)\
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
  useEffect(() => {
    dispatch(listProductDetails(id));
    dispatch(detailDirector(product.director));
    setDirector(directors);
    // console.log(director)
  }, [dispatch]);

  //     const productList = useSelector(state => state.productList)
  //     const { products } = productList
  //     useEffect(() =>{
  //     dispatch(listProducts())
  //   }, [])
  // let product = []
  return (
    <div>
      <br />
      <Container fluid>
        <Row>
          <Col md={6}>
            <Player src={product.video} autoPlay={true}>
              <ControlBar autoHide={true}>
                <PlayToggle />
                <VolumeMenuButton vertical />
              </ControlBar>
              <BigPlayButton position="center" />
            </Player>
          </Col>
          <Col md={6}>
            <Row>
              <Col md={6}>
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    maxWidth: 1920,
                    maxHeight: 1080,
                  }}
                  src={product.image}
                  className="rounded"
                />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>{product.description}</ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>
                      <DirectorLink />
                    </h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h3>Genre</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {product.genre} {product.genre_two} {product.genre_three}
                  </ListGroup.Item>
                </ListGroup>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>Add To Your List</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <AddToListButton productId={id} userId={userInfo._id} />
                    <br />
                    <br />
                    <RemoveToListButton productId={id} userId={userInfo._id} />
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <br />
    </div>
  );
}

export default Productscreen;
