import logo from './logo.svg';
import './App.css';
import {useState , useEffect} from 'react'
import axios from 'axios'

function App() {

  const [item,setItem]=useState("")
  const [list,setList]=useState([])
  const [isupdate,setupdate] = useState('')
  const [newitem,setnewitemtext] = useState("")

  const add =async (e)=>{
    e.preventDefault();
    try{
   const res=await axios.post('http://localhost:3000/items',{item:item ,createdAt:new Date().getHours})
   setList(prev=>[...prev,res.data]);
   setItem("")
    }catch(err){
      console.log(err)
    }
  }
  const update =async (e)=>{
    e.preventDefault();
    try{
   const res=await axios.put(`http://localhost:3000/items/${isupdate}`,{item:newitem})
   const updateditemindex=list.findIndex(item=>item._id===isupdate)
   const updateditem=list[updateditemindex].item=newitem
   setupdate('')
   setnewitemtext('')
    }catch(err){
      console.log(err)
    }
  }
const deleteitems =async(id) =>{
  try{
    const res=await axios.delete(`http://localhost:3000/items/${id}`)
    const newitem= list.filter(item=>item._id!=id)
    setList(newitem)
    console.log(res.data)
  }catch(err){
    console.log(err)
  }
}

  useEffect(() => {
    const getallitem =async ()=>{
    try{
    const res=await axios.get('http://localhost:3000/items')
   setList(res.data);
   console.log(list)
    }catch(err){console.log(err)}
  }
  getallitem();
  }, [])
  

  const updaterender =() =>{
   return <form className='update-form' onSubmit={e=>update(e)}>
      <input type='text' className='update-input' onChange={(e)=>setnewitemtext(e.target.value)} value={newitem}></input>
      <button className='update-button' type='submit'>update</button>
    </form>
  } 
  return (
  <div className="App">
    <form className="form" onSubmit={e=>{add(e)}}>
      <input type="text" placeholder="Add todo item" onChange={e=>{setItem(e.target.value)}} value={item}></input>
      <button type="submit">Add</button>
    </form>
    <div className="todo-listitems">
      {list.map(items=>(
        <div className="todo-items">
        {
        isupdate===items._id?updaterender():<>
          <p className="itemcontent">{items.item}</p>
        <button className="update" onClick={()=>{setupdate(items._id)}}>update</button>
        <button className="delete" onClick={()=>deleteitems(items._id)}>delete</button>
        <p>{items.createdAt?items.createdAt:" "}</p>
        </>}
      </div>
      ))}
    </div>
  </div>
  );
}

export default App;
