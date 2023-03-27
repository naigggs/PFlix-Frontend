import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Carousel, Form } from 'react-bootstrap';
import DirectorProducts from '../Components/DirectorProducts';
import { listGenreMovies } from '../Actions/genreActions';

function GenreProductsScreen() {
  const [search, setSearch] = useState('')
  const { id } = useParams()
  const [genreproduct, setGenreProducts] = useState([])
  const userLogin = useSelector((state) => state.userLogin);
  let navigate = useNavigate()
  let dispatch = useDispatch()
  const { userInfo } = userLogin;
  const genreMovies = useSelector((state) => state.genreMovies);
  const { genreproducts1 } = genreMovies;

  if (!userInfo) {
    navigate('/login');
  } else {
    if (!userInfo.isSubscriber) {
      navigate('/plans')
    }
  }
  useEffect(() => {
    async function fetchGenreProducts() {
      const { data } = await axios.get(`/api/genreproducts/${id}`)
      setGenreProducts(data);
    }
    fetchGenreProducts()
  }, [])
  // useEffect(() =>{
  //   dispatch(listGenreMovies(id))
  // }, [])
  return (
    <div><br />
      <div class='text-center' variant='light'>
        <h1>Movie List</h1>
        <Form>
            <Row><Col md={3} />
              <Col md={6}>
                <Form.Control onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  placeholder="Search"
                  className="me-1"
                  aria-label="Search"
                />
              </Col>
            </Row>
          </Form><br />
      </div>
      <br />
      <Container fluid>
        <Row>
          {/* {genreproducts1.map(product => (
            <Col className='row g-1' key={product._id} sm={12} md={6} lg={4} xl={3}>
              <DirectorProducts product={product} />
            </Col>
          ))} */}
          
          {genreproduct.filter((product) => {
              return search.toLowerCase() === '' ?
                product : product.name.toLowerCase().includes(search) ||
                product.description.toLowerCase().includes(search) ||
                product.genre.toLowerCase().includes(search) ||
                product.genre_two.toLowerCase().includes(search) ||
                product.genre_three.toLowerCase().includes(search);
            }).map(product => (
            <Col className='row g-1' key={product._id} sm={12} md={6} lg={4} xl={3}>
              <DirectorProducts product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default GenreProductsScreen