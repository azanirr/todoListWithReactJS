import React, {Component} from 'react';
import './list.css';
import styles from './list.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


export default class List extends Component {
	state = {
			value: this.props.todo.text,
		}

		
		changeValue = (e, id) => {
			if(id){
			this.setState({
				value: e.target.value
			})
		}
		}
		
		submitEdit = (e, id) => {
			if(e.which === 13){
				this.props.done(id, this.state.value)
			}
		}
	
	render(){
		const { todo } = this.props;
			
		return(
			<div>
			    <ul className={styles.Ul}>
					{!todo.edit ? (
							<li 
								className={styles.List}
								key={todo.id}>
								<span 
									className={styles.Span}
									onClick={() => this.props.remove(todo.id)}>
									<FontAwesomeIcon icon="trash"/>
								</span>
								<span 
									className={styles.SpanEdit}
									onClick={() => this.props.editToggle(todo.id)}>
									<FontAwesomeIcon icon="edit"/>
								</span>
								<span
									className={(todo.completed) ? styles.completed : styles.notCompleted}
									onClick={() => this.props.toggleCompleted(todo.id)}>
									{todo.text}
								</span>
							</li>
						) : (
					
							<li
								className={styles.List}>
								<input 
									className={styles.InputEdit}
									value={this.state.value} 
									onChange={(e) => this.changeValue(e, todo.id)}
									onKeyPress={(e) => this.submitEdit(e, todo.id)}/>
								<span 
									className={styles.SpanCancel}
									onClick={() => this.props.editToggle(todo.id)} >X</span>
							</li>
						)}
            </ul>
			</div>
		)
	}
}
