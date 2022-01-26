import React, { useState, useEffect } from "react";
import { useSelector, batch, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../utils/urls";
import user from "../reducers/user";

// Styling
import { Button } from "./reusable-components/Button";
import styled from "styled-components";

const LoginContainer = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const ModeContainer = styled.form`
	display: flex;
`;

const Form = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 10px;
`;

const TextInput = styled.input`
	padding: 5px;
	border-radius: 5px;
`;

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [description, setDescription] = useState("");
	const [email, setEmail] = useState("");
	const [country, setCountry] = useState("");
	const [city, setCity] = useState("");
	const [mode, setMode] = useState("sign-up");

	const accessToken = useSelector((store) => store.user.accessToken);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// checks if user is authorized, otherwise sends user to login page
	useEffect(() => {
		if (accessToken) {
			navigate("/");
		}
	}, [accessToken, navigate]);

	const onFormSubmit = (event) => {
		event.preventDefault();
		let options = {};

		if (mode === "sign-up") {
			options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username,
					password,
					firstName,
					lastName,
					description,
					email,
					country,
					city,
				}),
			};
		} else {
			options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			};
		}

		fetch(API_URL(mode), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success && mode === "sign-up") {
					alert(
						`Welcome ${data.response.username}, your account has been created!`
					); // welcomes new users who just signed up
				} else if (data.success && mode === "login") {
					console.log(data.response);
					dispatch(user.actions.setUserInfo(data.response));
				} else {
					// dispatch(user.actions.setError(data.response));
					alert(data.response); // returns error message
				}
			});
	};

	return (
		<LoginContainer>
			<ModeContainer>
				<label htmlFor="sign-up">Sign-up</label>
				<input
					id="sign-up"
					type="radio"
					checked={mode === "sign-up"}
					onChange={() => setMode("sign-up")}
				/>
				<label htmlFor="login">Login</label>
				<input
					id="login"
					type="radio"
					checked={mode === "login"}
					onChange={() => setMode("login")}
				/>
			</ModeContainer>
			<Form onSubmit={onFormSubmit}>
				<label htmlFor="username"></label>
				<TextInput
					id="username"
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label htmlFor="password"></label>
				<TextInput
					id="password"
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{mode === "sign-up" && (
					<>
						<label htmlFor="firstName"></label>
						<TextInput
							id="firstName"
							type="text"
							placeholder="First name"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
						<label htmlFor="lastName"></label>
						<TextInput
							id="lastName"
							type="text"
							placeholder="Last name"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
						<label htmlFor="description"></label>
						<TextInput
							id="description"
							type="text"
							placeholder="Write something about yourself"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<label htmlFor="email"></label>
						<TextInput
							id="email"
							type="email"
							placeholder="example@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<label htmlFor="country"></label>
						<TextInput
							id="country"
							type="text"
							placeholder="Country"
							value={country}
							onChange={(e) => setCountry(e.target.value)}
						/>
						<label htmlFor="city"></label>
						<TextInput
							id="city"
							type="text"
							placeholder="City"
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>
					</>
				)}
				<Button type="submit" text={mode} />
			</Form>
		</LoginContainer>
	);
};

export default Login;
