import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import './todo.css'

function Todo() {
  const [task, setTask] = useState('');
  const [todo, setTodo] = useState([]);
  const [editId, setEditId] = useState(null);
  const [delTodo, setDelTodo] = useState([]);
  // const [warn, setWarn] = useState('');
  // const [suc, setSuc] = useState('');
  const addNotify = () => toast.success(`Task Added Successfully!`);
  const deleteNotify = () => toast.error(`Task Deleted Successfully!`);
  const editNotify = () => toast.info(`Task Edited Succesfully!`);
  const warnNotify = () => toast.warning(`For add the task first you have to write something...`);
  const waitNotify = () => toast(`You are in waiting line...`,{
    theme:'dark',
  });
  const compNotify = () => toast.success(`Task Completed!`);
  const penNotify = () => toast.success(`Task is Pending!`);
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(editId !== null){
      if(editId){
        setTodo([...todo, {
          text: task,
          id: editId,
        }])
      } else{
        setTodo([...todo,{
          text: task,
          id:editId,
        }])
      }
      setTask('');
      setEditId(null);
      {editNotify()}
    } else if(task === '' || (!task.trim())){
      {warnNotify()}
    } else if(!editId){
      setTodo([...todo, {
        text: task,
        id: Date.now(), 
      }]);
      setTask('');
      {addNotify()}
    } 
  }

  const handleEdit = (e, todoEdt) => {
    e.preventDefault();
    if(task === ''){
      setTask(todoEdt.text);
      setEditId(todoEdt.id);
      setTodo(todo.filter(item => item.id !== todoEdt.id));
    } else{
      {waitNotify()}
    }
  }

  const handleDelete = (e, todoDel) => {
    e.preventDefault();
    setTodo(todo.filter(item => item.id !== todoDel.id));
    {deleteNotify()}
  }

  const handleChecked = (e, todoCh) => {
    e.preventDefault();
    setDelTodo([...delTodo, {
        text: todoCh.text,
        id: todoCh.id,
    }]);
    setTodo(todo.filter(item => item.id !== todoCh.id));
    {compNotify()}
  }

  const handleUnChecked = (e, delTodoUCh) => {
    e.preventDefault(); 
    setTodo([...todo, {
        text: delTodoUCh.text,
        id: delTodoUCh.id,
    }]);
    setDelTodo(delTodo.filter(itm => itm.id !== delTodoUCh.id));
    {penNotify()}
  }

  return (
    <>
      <div className='main'>
        <div className='inp-box'>
          <h1>Todo App</h1>
          <label className='lb-inp'>Task
            <div key={editId}>
              <input type="text" className='inp' value={task.text || task} onChange={(e) => setTask(e.target.value)}/>
              <button className='btn' onClick={handleSubmit}>+</button>
            </div>
          </label>
        </div>

        <div className='dt-box'>
          <h2>Pending Tasks: {todo.length}</h2>
          <div className='card-side'>
            {todo.sort((a, b) => a.id - b.id).map((todo) => (
              <Card key={todo.id} className='card'>
                <Card.Body>
                  <Form>
                    {['checkbox'].map((type) => (
                      <div key={`inline-${type}`} className="mb-5">
                        <Form.Check
                          inline
                          name="group1"
                          type={type}
                          className='chk' 
                          onChange={(e) => handleChecked(e, todo)}
                          id={`inline-${type}-1`}
                        />
                      </div>
                    ))}
                  </Form>
                  <p className='cr-para'>{todo.id}</p>
                  <Card.Text className='inp cd-txt' readOnly>
                    {todo.text}
                  </Card.Text>
                  <Button variant="primary" className='edt-btn' onClick={(e) => handleEdit(e, todo)}>Edit</Button>
                  <Button variant="primary" className='del-btn' onClick={(e) => handleDelete(e, todo)}>Delete</Button>
                </Card.Body>
              </Card>
            ))}
          </div> 
        </div>

        <div className='dt-box'>
          <h2>Completed Tasks: {delTodo.length}</h2>
          <div className='card-side'>
            {delTodo.sort((a, b) => a.id - b.id).map((delTodo) => (
              <Card key={delTodo.id} className='card card-o'>
                <Card.Body>
                  <Form>
                    {['checkbox'].map((type) => (
                      <div key={`inline-${type}`} className="mb-5">
                        <Form.Check
                          inline
                          name="group1"
                          type={type}
                          className='chk' 
                          onChange={(e) => handleUnChecked(e, delTodo)}
                          id={`inline-${type}-1`}
                          checked
                        />
                      </div>
                    ))}
                  </Form>
                  <p className='cr-para'>{delTodo.id}</p>
                  <Card.Text className='inp cd-txt' readOnly>
                    {delTodo.text}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo