import React, { useState, useRef } from "react";
import thunkMiddleware from "redux-thunk";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import {
	createStore,
	combineReducers,
	compose,
	applyMiddleware,
} from "@reduxjs/toolkit";

import { useOnClickOutside } from "./hooks";
import { GlobalStyle } from "./components/reusable-components/GlobalStyles";
import Burger from "./components/Hamburger/Burger";
import HamburgerContent from "./components/Hamburger/HamburgerContent";
import Header from "./components/Header";
import Main from "./components/Main";
import Login from "./components/Login";
import UserTasks from "./components/UserTasks";
import Leaderboard from "./components/LeaderBoard";
import InfoPage from "./components/InfoPage";
import UserProfile from "./components/UserProfile";
import UserSearch from "./components/UserProfile";
import NotFound from "./components/NotFound";

import { theme } from "./components/reusable-components/GlobalStyles";

import user from "./reducers/user";
import tasks from "./reducers/tasks";
import { ui } from "./reducers/ui";
import checkedTasks from "./reducers/checkedTasks";

const reducer = combineReducers({
	user: user.reducer,
	tasks: tasks.reducer,
	ui: ui.reducer,
	checkedTasks: checkedTasks.reducer,
});

const persistedStateJSON = localStorage.getItem("myAppReduxState");
const persistedState = persistedStateJSON ? JSON.parse(persistedStateJSON) : {};

const composedEnhancers =
	(process.env.NODE_ENV !== "production" &&
		typeof window !== "undefined" &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const store = createStore(
	reducer,
	persistedState,
	composedEnhancers(applyMiddleware(thunkMiddleware))
);

store.subscribe(() => {
	localStorage.setItem("myAppReduxState", JSON.stringify(store.getState()));
});

// window.onload = () => {
//   window.localStorage.clear();
// };

const App = () => {
	const [open, setOpen] = useState(false);
	const node = useRef(null);
	useOnClickOutside(node, () => setOpen(false));
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<BrowserRouter>
					<div ref={node}>
						<Burger open={open} setOpen={setOpen} />
						<HamburgerContent open={open} setOpen={setOpen} />
					</div>
					<Header />
					<Routes>
						<Route path="/" element={<Main />} />
						<Route path="/login" element={<Login />} />
						<Route path="/eco-facts" element={<InfoPage />} />
						<Route path="/leaderboard" element={<Leaderboard />} />
						<Route path="/tasks" element={<UserTasks />} />
						<Route path="/userprofile" element={<UserProfile />} />
						<Route path="/user/:username" element={<UserSearch />} />
						<Route path="/*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
