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
	ul {
		color: ${(pr) => pr.theme.textColor};
	}
	li {
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
				<Card>
					{characterData.map((char, index) => {
						return (
							<CardBody>
								<CardTitle>{char.name}</CardTitle>
								<CardSubtitle>
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
						);
					})}
				</Card>
			</Container>
		</Appstyled>
	);
};

export default App;
