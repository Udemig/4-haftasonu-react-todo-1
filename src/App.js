import React, { useState } from "react";

function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editButonunaBasildiMi, setEditButonunaBasildiMi] = useState(false);
  const [guncellenecekText, setGuncellenecekText] = useState("");
  const [guncellenecekTodo,setGuncellenecekTodo]=useState(null)

  const handleSubmit = (event) => {
    event.preventDefault();
    /* validation */
    if (todoText === "") {
      alert("Please type your todo!");
      return;
    }
    console.log(todoText);
    const newTodo = {
      id: new Date().getTime(),
      title: todoText,
      date: new Date(),
      hasDone: false,
    };
    console.log(newTodo);
    setTodos([...todos, newTodo]);
    setTodoText("");
  };

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos(filteredTodos);
  };
  const changeHasDone = (todo) => {
    /* 
      1. hangi todo'nun done ya da hasDone butonuna tıklandıysa
      o todo'nun hasDone isimli alanını true ise false; false ise true
      yapmam lazım.
      2. Mantık şöyle olmalı:
        a. todos isimli state tek tek dolaşılmalı.
        b. eğer güncellemek istediğim todo'yu bulursam hasDone isimli
        alanını 1. maddedeki gibi değiştirmeliyim.
        c. Eğer todos isimli diziyi dolaşırken aradığım todo dışında
        todo gelirse onu DEĞİŞTİRMEMELİYİM.
    */
    console.log(todo);
    let tempTodos = [];
    todos.map((item) => {
      if (item.id === todo.id) {
        let updatedTodo = {
          ...todo,
          hasDone: !todo.hasDone,
        };
        tempTodos.push(updatedTodo);
      } else {
        tempTodos.push(item);
      }
    });
    /* for(let i=0; i < todos.length; i++){
      if(todos[i].id === todo.id){
        let updatedTodo={
          ...todo,
          hasDone: !todo.hasDone
        }
        tempTodos.push(updatedTodo)
      }else{
        tempTodos.push(todos[i])
      }
    } */
    setTodos(tempTodos);
  };
  const todoGuncelle=(event)=>{
    event.preventDefault()
    console.log(guncellenecekTodo)
    if(guncellenecekText === ""){
      alert("TodoText can't be empty")
      return
    }
    let tempTodos=[]
    todos.map(item=>{
      if(item.id === guncellenecekTodo.id){
        let updatedTodo={
          ...guncellenecekTodo,
          title: guncellenecekText
        }
        tempTodos.push(updatedTodo)
      }else{
        tempTodos.push(item)
      }
    })
    setTodos(tempTodos)
    setEditButonunaBasildiMi(false)
  }
  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            value={todoText}
            onChange={(event) => {
              setTodoText(event.target.value);
            }}
            type="text"
            className="form-control"
            placeholder="Type your todo"
          />
          <button className="btn btn-primary w-25" type="submit">
            ADD
          </button>
        </div>
      </form>
      {editButonunaBasildiMi === true && (
        <form onSubmit={todoGuncelle}>
          <div className="input-group mb-3">
            <input
              value={guncellenecekText}
              onChange={(event) => setGuncellenecekText(event.target.value)}
              className="form-control"
              type={"text"}
            />
            <button
              onClick={() => {
                setEditButonunaBasildiMi(false);
              }}
              className="btn btn-danger w-25"
              type="button">
              Cancel
            </button>
            <button className="btn btn-info w-25" type="submit">
              Save
            </button>
          </div>
        </form>
      )}

      <div className="container">
        {todos.length === 0 ? (
          <p className="text-center">You don't have any todos yet.</p>
        ) : (
          <>
            {todos.map((item, index) => (
              <div
                key={index}
                style={{ borderBottom: "1px solid gray" }}
                className="d-flex justify-content-between align-items-center">
                <div>
                  <h1
                    style={{
                      textDecoration:
                        item.hasDone === true ? "line-through" : "none",
                    }}>
                    {item.title}{" "}
                  </h1>
                  <small>{new Date(item.date).toLocaleDateString()}</small>
                </div>
                <div>
                  <button
                    onClick={() => {
                      deleteTodo(item.id);
                    }}
                    className="btn btn-sm btn-danger">
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setEditButonunaBasildiMi(true);
                      setGuncellenecekText(item.title)
                      setGuncellenecekTodo(item)
                    }}
                    className="btn btn-sm btn-secondary">
                    Edit
                  </button>
                  <button
                    onClick={() => changeHasDone(item)}
                    className="btn btn-sm btn-success">
                    {item.hasDone === false ? "Done" : "Undone"}
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
