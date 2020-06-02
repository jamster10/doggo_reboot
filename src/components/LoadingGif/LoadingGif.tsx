import React from "react";
import styled from "styled-components";

export const LoadingGif = (): JSX.Element => (
	<LoadingContainer>
		<LoadingImg
			src={require("../../assets/loading-dog.gif")}
			alt="loading..."
		/>
		<P>Loading...</P>
	</LoadingContainer>
);

const LoadingContainer = styled.div`
	width: 100px;
	height: 100px;
	display: block;
	position: relative;
	left: 50%;
	top: 30%;
	transform: translate(-50%, -50%);
`;

const LoadingImg = styled.img`
	height: 60px;
`;

const P = styled.div`
	text-align: center;
	padding-left: 30px;
`;
