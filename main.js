const prompt = require("prompt-sync")();
const { createStore, applyMiddleware } = require("redux");
const thunkMiddleware = require("redux-thunk").thunk;

const axios = require("axios");

const FETCH_TODOS_REQUEST = "FETCH_TODOS_REQUEST";
const FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS";
const FETCH_TODOS_ERROR = "FETCH_TODOS_ERROR";
const CREATE_TODO = "CREATE_TODO";
const UPDATE_TODO = "UPDATE_TODO";
const DELETE_TODO = "DELETE_TODO";

const fetchTODOSRequest = () => ({
	type: FETCH_TODOS_REQUEST,
});

const fetchTODOSSuccess = (TODOS) => ({
	type: FETCH_TODOS_SUCCESS,
	payload: TODOS,
});

const fetchTODOSError = (error) => ({
	type: FETCH_TODOS_ERROR,
	payload: error,
});

const createUser = (TODOS) => ({
	type: CREATE_TODO,
	payload: TODOS,
});

const updateUser = (updatedTODO) => ({
	type: UPDATE_TODO,
	payload: updatedTODO,
});

const deleteUser = (todoId) => ({
	type: DELETE_TODO,
	payload: todoId,
});

const fetchTODOS = () => {
	return function (dispatch) {
		dispatch(fetchTODOSRequest());
		axios
			.get("http://localhost:3000/todos")
			.then((res) => {
				const data = res.data;
				dispatch(fetchTODOSSuccess(data));
				dispayTodos(data);
			})
			.catch((err) => {
				dispatch(fetchTODOSError(err.message));
			});
	};
};



const initialState = {
	loading: false,
	TODOS: [],
	error: "",
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_TODOS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_TODOS_SUCCESS:
			return {
				loading: false,
				TODOS: action.payload,
				error: "",
			};
		case FETCH_TODOS_ERROR:
			return {
				loading: false,
				TODOS: [],
				error: action.payload,
			};

		case CREATE_TODO:
			return {
				...state,
				users: [...state.users, action.payload],
			};
		case UPDATE_TODO:
			return {
				...state,
				TODOS: state.TODOS.map((TODO) =>
					TODO.id === action.payload.id ? action.payload : TODO
				),
			};
		case DELETE_TODO:
			return {
				...state,
				TODOS: state.TODOS.filter((TODO) => TODO.id !== action.payload),
			};
		default:
			return state;
	}
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
console.log("Initial state: ", store.getState());
store.subscribe(() => console.log("Updated state: ", store.getState()));
store.dispatch(fetchTODOS());



// // Get all posts
// fetch('http://localhost:3000/todos')
//   .then(response => response.json())
//   .then(todos => console.log(todos));

// // Create a new post
// fetch('http://localhost:3000/todos', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     title: 'New Post',
//     body: 'This is the body of the new post',
//   }),
// });

// // Update a post
// fetch('http://localhost:3000/todos/1', {
//   method: 'PUT',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     title: 'Updated Post',
//     body: 'This is the updated body of the post',
//   }),
// });

// // Delete a post
// fetch('http://localhost:3000/todos/1', {
//   method: 'DELETE',
// });
