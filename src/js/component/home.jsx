import React, { useEffect, useState } from "react";

//include images into your bundle

//create your first component
const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");
	const [taskExists, setTaskExists] = useState(false);

	useEffect(() => {
		let position = tasks.findIndex(task => task === newTask);
		if (position === -1) {
			setTaskExists(false);
		} else {
			setTaskExists(true);
		}
	}, [newTask]);

	async function getTodos() {
		let response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ChiaraR3",
			{
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
		let responseJson = response.json();
		return await responseJson;
	}

	async function createTodos() {
		let response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ChiaraR3",
			{
				headers: {
					"Content-Type": "application/json"
				},
				method: "POST",
				body: JSON.stringify([])
			}
		);
		let responseJson = response.json();
		console.log(responseJson);
	}
	async function updateTodos(tasks) {
		let response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ChiaraR3",
			{
				headers: {
					"Content-Type": "application/json"
				},
				method: "PUT",
				body: JSON.stringify(tasks)
			}
		);
		let responseJson = response.json();
		console.log(responseJson);
	}

	async function deleteTodos() {
		let response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ChiaraR3",
			{
				headers: {
					"Content-Type": "application/json"
				},
				method: "DELETE"
			}
		);
		let responseJson = response.json();
		console.log(responseJson);
	}
	async function newTaskChange(event) {
		setNewTask(event.target.value);

		await getTodos();
	}
	async function addNewOne(event) {
		//if (event.key === "Enter") {
		//	let position = tasks.findIndex(task => task === newTask);
		//	if (position === -1) {
		const newTodos = [...tasks, newTask];

		//	} else {
		//		setTaskExists(true)}
		await updateTodos(newTodos);
		let serverToDos = await getTodos();
		setTasks(serverToDos);
		setNewTask([{ label: " ", done: false }]);
	}
	async function deleteTask(indexToRemove) {
		setTasks(tasks.filter((task, index) => index !== indexToRemove));
	}
	return (
		<div className="text-center container">
			<h1>TO DO LIST</h1>
			<button onClick={getTodos}>Get</button>
			<button onClick={createTodos}>Create</button>
			<button onClick={() => updateTodos([])}>Upgrade</button>
			<button onClick={deleteTodos}>Delete</button>
			<input
				className={taskExists ? "warning" : " "}
				type="text"
				placeholder="New Task"
				onChange={newTaskChange}
				onKeyDown={addNewOne}
				value={newTask}
			/>
			<ul className="tasks">
				{tasks.map((task, index) => (
					<li
						key={index}
						className={
							"list " + (task === newTask ? "warningToo" : " ")
						}>
						<span>{task}</span>
						<button
							className="delete"
							onClick={() => {
								deleteTask(index);
							}}>
							x
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Home;
