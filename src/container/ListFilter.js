import React, {Component} from 'react';
import './list.css';
import styles from './list.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


export default class ListFilter extends Component {
	state = {
			value: this.props.filter.text,
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
		const { filter } = this.props;
			
		return(
			<div>
			    <ul className={styles.Ul}>
					{!filter.edit ? (
							<li 
								className={styles.List}
								key={filter.id}>
								<span 
									className={styles.Span}
									onClick={() => this.props.remove(filter.id)}>
									<FontAwesomeIcon icon="trash"/>
								</span>
								<span 
									className={styles.SpanEdit}
									onClick={() => this.props.editToggle(filter.id)}>
									<FontAwesomeIcon icon="edit"/>
								</span>
								<span
									className={(filter.completed) ? styles.completed : styles.notCompleted}
									onClick={() => this.props.toggleCompleted(filter.id)}>
									{filter.text}
								</span>
							</li>
						) : (
					
							<li
								className={styles.List}>
								<input 
									className={styles.InputEdit}
									value={this.state.value} 
									onChange={(e) => this.changeValue(e, filter.id)}
									onKeyPress={(e) => this.submitEdit(e, filter.id)}/>
								<span 
									className={styles.SpanCancel}
									onClick={() => this.props.editToggle(filter.id)} >X</span>
							</li>
						)}
            </ul>
			</div>
		)
	}
}
