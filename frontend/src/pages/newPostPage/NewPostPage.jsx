import React, { useState } from 'react'
import './newpostpage.scss'
// import { Editor } from '@tinymce/tinymce-react';
import {tokenRequest} from '../../lib/apiRequest';
import { useNavigate } from 'react-router';





const NewPostPage = () => {
  
  const navigate = useNavigate()
  
  
  const [images,setImages] = useState([])
  const [error,setError] = useState("")
  const [data,setData] = useState({

    title: String,
    price: Number,
    address: String,
    city: String,
    bedroom: Number,
    bathroom: Number,
    latitude: String,
    longitude: String,
    utilities: String,
    pet: String,
    income: String,
    size: Number, 
    school: Number,
    bus: Number, 
    restaurant: Number, 
    type: String, 
    property: String,
    desc: String,
    

  })

  const handleFileChange =(e)=>{
    const files = Array.from(e.target.files);
    setImages(files);
  }

    

    const handleChange = (e) => {
      const {name,value} = e.target
      setData({
        ...data, [name]: value
      })
    }

    const handleSumbit = async (e)=>{
        e.preventDefault()

        const datas =  {...data,images}

        console.log('datas in add post', datas);

        try {
            const res = await tokenRequest.post("/posts/add",datas,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
    });
    // navigate('/' + res.data.id)
    console.log("data post page",data);
        } catch (err) {
            console.log(err.message);
            setError(err.message)
        }
    }

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSumbit} >
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" onChange={handleChange} />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" onChange={handleChange} />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <textarea className='editor' id='desc' onChange={handleChange} name='desc' />
               {/* <Editor
                    apiKey='zaoyzlvkr7cui159rz3y65croqj9f3jxv1oimnidkjixphye'
                    onChange={setValue} 
                    value={value}
                    init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                /> */}
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select onChange={handleChange} name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option  value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select onChange={handleChange} name="property">
                <option  value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select onChange={handleChange} name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select onChange={handleChange} name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input id="income" name="income" type="text" placeholder="Income Policy" onChange={handleChange} />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" onChange={handleChange} />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" onChange={handleChange} />
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input min={0} id="bus" name="bus" type="number" onChange={handleChange} />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" onChange={handleChange} />
            </div>
            <div className="item">
              <label htmlFor="image">Upload Photo(Max-4)</label>
              <input id="image" name="image" type="file" onChange={handleFileChange} multiple />
            </div>
            <div className="buttonContainer">
              <button className="sendButton">Add</button>
            {error && <span>{error}</span>}
            </div>
            
            
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images?.map((image,index)=>(
            <img src={image} key={index} alt="" />
        ))}
      </div>
    </div>
  )
}

export default NewPostPage