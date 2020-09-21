import React, { Component } from 'react';
import List from './List';
import ListFilter from './ListFilter';
import styles from './list.module.css';

export default class Todo extends Component {
	state = {
		input: ""
	}

	setInput = (event) => {
		this.setState({input: event.target.value})
	}
	
	submit = (e) => {
		if(e.which === 13){
			this.props.add(this.state.input);
			e.target.value = ""
			this.setState({input: e.target.value})
		}
	}

	render() {
		return (
			<div className={styles.Todo}>
				<h1 className={styles.Title}>To-Do List</h1>
				<button
					className={styles.ButtonSort}
					onClick={this.props.sort}>SORT</button>
				<button
					className={styles.ButtonSort}
					onClick={this.props.filterCompleted}>DONE</button>
				<button
					className={styles.ButtonSort}
					onClick={this.props.filterNotCompleted}>NOT DONE</button>
				<button
					className={styles.ButtonSort}
					onClick={this.props.allList}>ALL LIST</button>
				<input 
					className={styles.Input}
					onChange={(event) => this.setInput(event)} 
					type="text"
					onKeyPress={(e) => this.submit(e)}>
				</input>
				
				{this.props.filtered ? 
					this.props.filter.map((filter) => (
					<ListFilter 
					key={filter.id}
					filter={filter}
					remove={this.props.remove}
					editToggle={this.props.editToggle}
					done={this.props.done}
					toggleCompleted={this.props.toggleCompleted}
					/>
					))
				: 
				this.props.todo.map((todo) =>(
				<List 
					key={todo.id}
					todo={todo}
					remove={this.props.remove}
					editToggle={this.props.editToggle}
					done={this.props.done}
					toggleCompleted={this.props.toggleCompleted}
					/>
					))
				}
			</div>
		)
	}
}