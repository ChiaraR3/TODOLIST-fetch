import React from "react";
import PropTypes from "prop-types";

const TaskList = ({ task, newTask, deleteTask, index }) => {
	console.log(newTask);
	return (
		<li
			key={index}
			className={"list " + task.label === newTask ? "warningToo" : ""}>
			<span>{task} </span>
			<button
				className="delete"
				onClick={() => {
					deleteTask(index);
				}}>
				x
			</button>
		</li>
	);
};

TaskList.propTypes = {
	newTask: PropTypes.string,
	task: PropTypes.string,
	deleteTask: PropTypes.func,
	index: PropTypes.number
};
export default TaskList;
