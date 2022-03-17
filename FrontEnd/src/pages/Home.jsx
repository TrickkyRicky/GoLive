import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Bootstrap
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import { listCategories } from "../store/content/content-actions";

const Home = () => {
  const dispatch = useDispatch();

  const [active, setActive] = useState("Gaming");

  const categoryNames = useSelector((state) => state.content.categoryNames);

  useEffect(() => {
    //List Categories
    dispatch(listCategories());
  }, []);

  const clickCategory = (e, title) => {
    console.log(e.target, title);
    setActive(title);
  }

  return (
    <Container>
      <div>
        Carousel
      </div>
      <div>
        <Nav>
          {
            categoryNames.map((title, i) => {
              return (
                <Button key={i} className={(active === title ? "category-pill active" : "category-pill")} onClick={e => clickCategory(e, title)}>{title}</Button>
              )
            })
          }
        </Nav>
        <div className="card-group">
        {
            categoryNames.map((title, i) => {
              return (
                <Card style={{ width: '18rem' }} key={i}>
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk of
                      the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              )
            })
          }
        </div>
      </div>
    </Container>
  );
};

export default Home;
