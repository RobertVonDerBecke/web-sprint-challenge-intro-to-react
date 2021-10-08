import axios from "axios";
import React, { useState, useEffect } from "react";
import {
	Container,
	Row,
	Col,
	Card,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	ListGroup,
	ListGroupItem,
} from "reactstrap";
import styled, { keyframes } from "styled-components";
import "./App.css";

const Appstyled = styled.div`
display: flex;
margin: auto;
align-items: center;
justify-content: center;
.margin {
  padding: 1em;
  font-size:1em;
}
.tiled {
  display: flex;
  flex-wrap: wrap;
  }
  .card {
    max-width:25%;
    margin: 1em;
    background-color: rgba(255, 255, 255, .75)
  }
	li {
    color: ${(pr) => pr.theme.textColor};
		background-color: ${(pr) => pr.theme.background};
		border-bottom: 1px solid black;
	}
`;
const App = (props) => {
	// Try to think through what state you'll need for this app before starting. Then build out
	// the state properties here.
	const [characterData, getCharacterData] = useState([]);

	// Fetch characters from the API in an effect hook. Remember, anytime you have a
	// side effect in a component, you want to think about which state and/or props it should
	// sync up with, if any.
	useEffect(() => {
		axios
			.get("https://swapi.dev/api/people")
			.then((resp) => {
				getCharacterData(resp.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);
	console.log(characterData);
	return (
		<Appstyled>
			<Container>
          <Row className='offset-1'>
					{characterData.map((char, index) => {
            return (
              <Card className='col-3'>
              <Col>
							<CardBody>
								<CardTitle>{char.name}</CardTitle>
								<CardSubtitle className='margin'>
									{characterData[index].films.map((film) => `${film}, `)}
								</CardSubtitle>
								<CardText>
									<ListGroup>
										<ListGroupItem>Height: {char.height}</ListGroupItem>
										<ListGroupItem>Hair Color: {char.hair_color}</ListGroupItem>
										<ListGroupItem>Skin Color: {char.skin_color}</ListGroupItem>
										<ListGroupItem>Gender: {char.gender}</ListGroupItem>
										<ListGroupItem>Eye Color: {char.eye_color}</ListGroupItem>
									</ListGroup>
								</CardText>
							</CardBody>
              </Col>
				</Card>
						);
					})}
          </Row>
			</Container>
		</Appstyled>
	);
};

export default App;
