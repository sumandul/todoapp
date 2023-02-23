import "./App.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, deleteUser, updateUsername } from "./features/Users";
import DatePicker from "react-datepicker";
import Moment from "react-moment";
import { v4 as uuidv4 } from "uuid";
import "react-datepicker/dist/react-datepicker.css";
import { json } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());

  const userList = useSelector((state) => state.users.value);
  console.log(userList);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [item, setItems] = useState();
  const [post, setPost] = useState({
    name: "",
    username: "",
  });
  const [newUsername, setNewUsername] = useState();
  const edit = (id) => {
    setOpen(true);
    const data = userList.find((dd, i) => i === id);
    setNewUsername(data);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setPost({ ...post, [e.target.name]: value });
  };
  const createPost = () => {
    if (open) {
      dispatch(
        updateUsername({
          id: newUsername.id,
          name: post.name,
          username: post.username,
        })
      );
    }

    dispatch(
      addUser({
        id: uuidv4(),
        name: post.name,
        username: post.username,
        startDate,
      })
    );
  };

  return (
    <div className="App">
      <div className="inner-box">
        <div>
          <div className=" app-inner">
            {open ? (
              <div className="addUser">
                <div>
                  <input
                    defaultValue={newUsername?.name}
                    className="input-text"
                    required
                    name="name"
                    type="text"
                    placeholder="Name..."
                    onChange={handleChange}
                  />
                </div>

                <div className=" mt-4">
                  <textarea
                    defaultValue={newUsername?.username}
                    required
                    cols={5}
                    rows={10}
                    name="username"
                    type="text"
                    className="input-text"
                    placeholder="Username..."
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div>
                   
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>

                <div>
                  <button onClick={createPost}> update</button>
                </div>
              </div>
            ) : (
              <div className="addUser">
                <div>
                  <input
                    className="input-text"
                    type="text"
                    name="name"
                    placeholder="Name..."
                    onChange={handleChange}
                  />
                </div>

                <div className=" mt-4">
                  <textarea
                    cols={5}
                    name="username"
                    rows={10}
                    type="text"
                    className="input-text"
                    placeholder="Username..."
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div>
                   
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>

                <div>
                  <button onClick={createPost}> Add User</button>
                </div>
              </div>
            )}
          </div>

          <div>
            <table className="box">
              <thead>
                <tr>
                  <th>Title </th>
                  <th>Descrption</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td>{data.name}</td>
                      <td>{data.username}</td>
                      <td>
                        <Moment format="  Do MMMM, YYYY  ">
                          {data.startDate}
                        </Moment>
                      </td>
                      <td>
                        {" "}
                        <button
                          onClick={() => {
                            setOpen(true);
                            dispatch(deleteUser({ id: data?.id }));
                          }}
                        >
                          Delete User
                        </button>
                        <button onClick={() => edit(i)}>
                          {" "}
                          Update Username
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <div className="displayUsers">
        {userList?.map((user) => {
          return (
            <div>
              <h1> {user.name}</h1>
              <h1> {user.username}</h1>
              <input
                type="text"
                placeholder="New Username..."
                className="py-3"
                onChange={(event) => {
                  setNewUsername(event.target.value);
                }}
              />
              <button
                onClick={() => {
                  dispatch(
                    updateUsername({ id: user?.id, username: newUsername })
                  );
                }}
              >
                {" "}
                Update Username
              </button>
              <button
                onClick={() => {
                  dispatch(deleteUser({ id: user?.id }));
                }}
              >
                Delete User
              </button>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}

export default App;
