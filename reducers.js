const { createStore, combineReducers } = 'redux';


// reducers.js
const initialState = {
	posts: [],
};

const postReducer = (state = initialState, action) => {
	switch (action.type) {
		case "FETCH_POSTS":
			// Handle fetching posts from json-server
			return { ...state, posts: action.payload };
		case "CREATE_POST":
			// Handle creating a new post on json-server
			return { ...state, posts: [...state.posts, action.payload] };
		case "UPDATE_POST":
		// Handle updating a post on json-server
		// You will need to update the specific post in the state
		case "DELETE_POST":
			// Handle deleting a post on json-server
			return {
				...state,
				posts: state.posts.filter((post) => post.id !== action.payload),
			};
		default:
			return state;
	}
};

const rootReducer = combineReducers({
    posts: postReducer,
    // You can add more reducers here if needed
  });


const store = createStore(rootReducer);


// Dispatch an action to fetch posts from json-server
store.dispatch({ type: "FETCH_POSTS", payload: fetchedPosts });

// Dispatch an action to create a new post
store.dispatch({ type: "CREATE_POST", payload: newPost });

// Dispatch an action to update a post
store.dispatch({ type: "UPDATE_POST", payload: updatedPost });

// Dispatch an action to delete a post
store.dispatch({ type: "DELETE_POST", payload: postIdToDelete });

