import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

function AdminEditProducts() {
    const {id} =useParams();
    const[edited,setEdited]=useState({})
    useEffect(()=>{
        axios.get(`http://localhost:3000/products/${id}`)
        .then(res=>setEdited(res.data))
        .catch(err=>console.error(err))
    },[id])
    const handleEdit=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:3000/products/${id}`,edited)
        .then(()=>alert("product added successfully "))
        .catch(err=>console.error(err))
    }
  return (
    <div>
    <form onSubmit={handleEdit}>
        <label >Name</label>
         <input type="text" value={edited.name} onChange={(e)=>setEdited({...edited,name:e.target.value})}/>
        <label >Description</label>
         <input type="text" />
        <label >Price</label>
         <input type="text" />
        <label >Stock</label>
         <input type="text" />
        <label >Image</label>
         <input type="text" />
       <button type='submit'></button>
    </form>
    </div>
  )
}

export default AdminEditProducts
