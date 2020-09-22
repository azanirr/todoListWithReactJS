import React, {Component} from 'react';
import './App.css';
import Todo from './container/Todo';
import { v4 as uuidv4 } from 'uuid';
import './container/fontawesome';
import Image from './container/images';
import Particles from './container/Particles';

class App extends Component {
	state = {
		data: [
			{
			id: uuidv4(),
			text: 'azani',
			completed: false,
			date: new Date(),
			edit: false
			},
		],
		
		
		filter: [
			{
			id: uuidv4(),
			text: '',
			completed: false,
			date: new Date(),
			edit: false,
			},
		],
		filtered: false
	}

	componentDidMount() {
		const getData = JSON.parse(localStorage.getItem('todo'));
		this.setState({
			data: getData
		})
	}

	componentDidUpdate() {
		localStorage.setItem('todo', JSON.stringify(this.state.data));
	}

	compare = (a, b) => { 
    if( a.completed > b.completed){
        return -1;
    }
    if( a.completed < b.completed){
        return 1;
    }
    return 0;
}
	
	sort = () => {
    const sorted = this.state.data.sort(this.compare);
    this.setState({
		data: sorted
	})
}

	removeItem = (id) => {
		const newTodo = this.state.data.filter((todo) => todo.id !== id);
		this.setState({data: newTodo});
		console.log(newTodo)
	}


	addTodoHandler = (value) => {
	 		this.setState({
				data: [
				...this.state.data,
				{	
					id: uuidv4(),
					text: value,
					completed: false,
					date: new Date(),
				}
				]
			})
	}
	
	editToggle = (id) => {
		console.log('bisa')
		const newData = this.state.data;
		const todo = newData.find((todo) => todo.id === id);
		todo.edit = !todo.edit
		console.log(newData, "Newdata")
		console.log(todo, "todo")
		this.setState({
			data : newData,	
		})
	}
	
	doneEdit = (id, value) => {
		console.log('bisa')
		const newData = this.state.data;
		const todo = newData.find((todo) => todo.id === id);
		todo.edit = !todo.edit
		todo.text = value;
		console.log(todo.text)
		console.log(newData, 'new data', todo, 'todo')
		this.setState({
			data: newData	
		})
	}
	
	toggleCompleted = (id) =>{
		const newData = this.state.data;
		const todo = newData.find((todo) => todo.id === id);
		todo.completed = !todo.completed;
		console.log(newData)
		this.setState({
			data: newData
		})
	}
	
	filterCompleted = (id) => {
 		console.log('bisa dipencet');
    	let filterCompleted = this.state.data.filter(todo => ( todo.completed === true));
		this.setState({
			filter: filterCompleted,
			filtered: true
			
		})
    }
	
	filterNotCompleted = () => {
		console.log('bisa dipencet');
    	let filterNotCompleted = this.state.data.filter(todo => ( todo.completed === false));
		this.setState({
			filter: filterNotCompleted,
			filtered: true
		})
	}
	
	allList = () => {
		this.setState({
			filtered: false
		})
	}
	
	render(){
		  return (
			<div className="App">
				<Image />
				<Particles />
				<Todo 
					sort={this.sort}
					todo={this.state.data}
					add={this.addTodoHandler}
					remove={this.removeItem}
					editToggle={this.editToggle}
					done={this.doneEdit}
					toggleCompleted={this.toggleCompleted}
					filterCompleted={this.filterCompleted}
					filterNotCompleted={this.filterNotCompleted}
					filter={this.state.filter}
					filtered={this.state.filtered}
					allList={this.allList}
					/>
			</div>
		  );
		}
	}

export default App;
