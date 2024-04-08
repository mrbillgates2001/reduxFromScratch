// Get all posts
fetch('http://localhost:3000/todos')
  .then(response => response.json())
  .then(todos => console.log(todos));

// Create a new post
fetch('http://localhost:3000/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'New Post',
    body: 'This is the body of the new post',
  }),
});

// Update a post
fetch('http://localhost:3000/todos/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Updated Post',
    body: 'This is the updated body of the post',
  }),
});

// Delete a post
fetch('http://localhost:3000/todos/1', {
  method: 'DELETE',
});
