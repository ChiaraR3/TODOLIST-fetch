import React from "react";
import PropTypes from "prop-types";

const TaskList = ({ task, deleteTask, index }) => {
	return (
		<li key={index} className={"list"}>
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
	task: PropTypes.string,
	deleteTask: PropTypes.func,
	index: PropTypes.number
};
export default TaskList;
