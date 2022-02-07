import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

import { fetchTasks } from "../../reducers/tasks";
import { fetchCheckedTasks } from "../../reducers/checkedTasks";
import { Button } from "../reusable-components/Buttons";

import { API_URL } from "../../utils/urls";

import checkedTasks from "../../reducers/checkedTasks";

import { Carousel, Slides, OuterCard, Card } from "./Carousel";

const Tasks = () => {
	const navigate = useNavigate();
	const accessToken = useSelector((store) => store?.user?.accessToken);
	const userId = useSelector((store) => store?.user?.userId);
	const tasks = useSelector((store) => store?.tasks?.tasks?.response);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!accessToken) {
			navigate("/login");
		}
	}, [accessToken, navigate]);

	useEffect(() => {
		dispatch(fetchTasks(accessToken));
	}, [dispatch, accessToken]);

	const addTask = async (taskId) => {
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: accessToken,
			},
			body: JSON.stringify({ userId: userId, taskId: taskId }),
		};
		const optionsPatch = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: accessToken,
			},
			body: JSON.stringify({ taskId: taskId }),
		};

		await fetch(API_URL("tasks/checked-tasks"), options)
			.then((res) => res.json())
			.then((data) => {
				dispatch(checkedTasks.actions.appendCheckedTask(data));
			});
		await fetch(API_URL(`user/${userId}/score`), optionsPatch)
			.then((res) => res.json())
			.then((data) => console.log(data));
		dispatch(fetchCheckedTasks(accessToken, userId));
	};

	const categorizedTasks = _(tasks)
		.groupBy("category")
		.map((tasks, category) => ({
			category,
			tasks: tasks.map((o) =>
				_.omit(o, ["category", "createdAt", "updatedAt"])
			),
		}))
		.value();

	return (
		<>
			<h1>All tasks</h1>
			<Carousel>
				{categorizedTasks &&
					Array.isArray(categorizedTasks) &&
					categorizedTasks?.map((task) => (
						<Slides key={task.category}>
							<h2>{task.category}</h2>
							<OuterCard>
								{task.tasks.map((task) => (
									<Card key={task._id}>
										<h3>{task.title}</h3>
										<p>{task.description}</p>
										<Button onClick={() => addTask(task._id)} text="+"></Button>
									</Card>
								))}
							</OuterCard>
						</Slides>
					))}
			</Carousel>
		</>
	);
};

export default Tasks;