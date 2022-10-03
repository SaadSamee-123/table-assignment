import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    setPosts(response.data);
  };

  const deletePost = async (id) => {
    const data = posts.filter((e) => e.id !== id);
    setPosts(data);
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    console.log(response);
  };

  const updatePost = async (data) => {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${data.id}`,
      data
    );
    console.log(response);
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p, i) => {
            return (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td>{p.title}</td>
                <td>{p.body}</td>
                <td>
                  <button
                    onClick={() => updatePost(p)}
                    type="button"
                    className="btn btn-primary mb-2"
                  >
                    Update
                  </button>
                  <br />
                  <button
                    onClick={() => deletePost(p.id)}
                    type="button"
                    className="btn btn-secondary"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
