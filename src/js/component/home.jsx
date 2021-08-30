import React, { useEffect, useState } from "react";

//include images into your bundle

//create your first component
const Home = () => {
	const [tasks, setTasks] = useState([{ label: "dormir", done: false }]);
	const [newTask, setNewTask] = useState("");
	const [taskExists, setTaskExists] = useState(false);

	useEffect(() => {
		let position = tasks.findIndex(task => {
			return task.label === newTask;
		});

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

		let responseJson = await response.json();
		let tasks = responseJson;
		return tasks;
	}

	useEffect(() => {
		getTodos();
	}, []);

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

	useEffect(() => {
		updateTodos(tasks);
	}, [tasks]);

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
		createTodos();
		setTasks([]);
	}

	async function newTaskChange(event) {
		setNewTask(event.target.value);

		await getTodos();
	}

	function addNewOne(event) {
		if (event.key === "Enter") {
			let position = tasks.findIndex(task => task.label === newTask);
			if (position === -1) {
				setTasks([...tasks, { label: newTask, done: false }]);
				setNewTask("");
			}
		}
	}
	function deleteTask(indexToRemove) {
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
				className={taskExists ? "warning" : ""}
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
							"list " +
							(task.label === newTask ? "warningToo" : "")
						}>
						<span>{task.label}</span>
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
