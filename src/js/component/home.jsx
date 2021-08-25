import React, { useEffect, useState } from "react";

//include images into your bundle

//create your first component
const Home = () => {
	const [tasks, setTasks] = useState(["Task", "Task 2"]);
	const [newTask, setNewTask] = useState("");
	const [taskExists, setTaskExists] = useState(false);

	async function CreateTodos() {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ChiaraR3",
			{
				headers: {
					"Content-Type": "application/json"
				},
				method: "POST",
				body: JSON.stringify([])
			}
		);
		//let responseJson = await response.json();
	}
    async function getToDo(){
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ChiaraR3",
			{
				headers: {
					"Content-Type": "application/json"
				}
			}) 
		let responseJson = await response.json()
		console.log(responseJson)
	}
	async function upDateTodo (){
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ChiaraR3",
			{ 
			method: "PUT",
			body: JSON.stringify(todos),
			headers: {
			  "Content-Type": "application/json"
			}
		  })
		  .then(resp => {
			  console.log(resp.ok); // will be true if the response is successfull
			  console.log(resp.status); // the status code = 200 or code = 400 etc.
			  console.log(resp.text()); // will try return the exact result as string
			  return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
		  })
		  .then(data => {
			  //here is were your code should start after the fetch finishes
			  console.log(data); //this will print on the console the exact object received from the server
		  })
		  .catch(error => {
			  //error handling
			  console.log(error);
		  });
	}

	function newTaskChange(event) {
		setNewTask(event.target.value);
	}

	function addNewOne(event) {
		if (event.key === "Enter") {
			setTasks([...tasks, newTask]);
			setNewTask("");
		}
	}

	useEffect(() => {
		let position = tasks.findIndex(task => task === newTask);
		if (position === -1) {
			setTaskExists(false);
		} else {
			setTaskExists(true);
		}
	}, [newTask]);

	function validateInput(event) {
		let positiondos = tasks.findIndex(task => newTask === " ");
		if (positiondos === "") {
			alert("The to do cannot be empty");
		}
	}

	function deleteTask(indexToRemove) {
		setTasks(tasks.filter((task, index) => index !== indexToRemove));
	}

	return (
		<div className="text-center container">
			TO DO LIST
			<input
				type="text"
				placeholder="New Task"
				onChange={newTaskChange}
				onKeyDown={addNewOne}
				value={newTask}
			/>
			<ul className="tasks">
				{tasks.map((task, index) => (
					<li className="list" key={index}>
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
