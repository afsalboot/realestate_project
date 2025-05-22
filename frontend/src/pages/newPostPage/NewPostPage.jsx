import React, { useRef, useState } from 'react'
import './newpostpage.scss'
import { Editor } from '@tinymce/tinymce-react';
import {tokenRequest} from '../../lib/apiRequest';
import { useNavigate } from 'react-router';





const NewPostPage = () => {

    const navigate = useNavigate()
    
    const [value,setValue] = useState("")
    const [images,setImages] = useState([])
    const [error,setError] = useState("")

    const handleSumbit = async (e)=>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const inputs = Object.fromEntries(formData)

        try {
            const res = await tokenRequest.post("/posts/add",{
                postData: {
                    title: inputs.title,
                    price: parseInt(inputs.price),
                    address: inputs.address,
                    city: inputs.city,
                    bedroom: parseInt(inputs.bedroom),
                    bathroom: parseInt(inputs.bathroom),
                    type: inputs.type,
                    property: inputs.property,
                    latitude: inputs.latitude,
                    longitude: inputs.longitude,
                    images: images,
                },

                postDetails:{
                    desc: value,
                    utilities: inputs.utilities,
                    pet: inputs.pet,
                    income: inputs.income,
                    size: parseInt(inputs.size),
                    school: parseInt(inputs.school),
                    bus: parseInt(inputs.bus),
                    restaurant: parseInt(inputs.restaurant),
                }
            },{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
    });
    navigate('/' + res.data.id)
        } catch (err) {
            console.log(err.message);
            setError(err.message)
        }
    }

//     const handleSumbit = async (e) => {
//   e.preventDefault();

//   const formData = new FormData();

//   // Append form inputs
//   formData.append("title", e.target.title.value);
//   formData.append("price", e.target.price.value);
//   formData.append("address", e.target.address.value);
//   formData.append("city", e.target.city.value);
//   formData.append("bedroom", e.target.bedroom.value);
//   formData.append("bathroom", e.target.bathroom.value);
//   formData.append("latitude", e.target.latitude.value);
//   formData.append("longitude", e.target.longitude.value);
//   formData.append("type", e.target.type.value);
//   formData.append("property", e.target.property.value);
//   formData.append("utilities", e.target.utilities.value);
//   formData.append("pet", e.target.pet.value);
//   formData.append("income", e.target.income.value);
//   formData.append("size", e.target.size.value);
//   formData.append("school", e.target.school.value);
//   formData.append("bus", e.target.bus.value);
//   formData.append("restaurant", e.target.restaurant.value);
//   formData.append("desc", value); // TinyMCE value

//   // Append each image file
//   const files = e.target.image.files;
//   for (let i = 0; i < files.length; i++) {
//     formData.append("images", files[i]);
//   }

//   try {
//     const res = await tokenRequest.post("/posts/add", formData);
//     navigate('/' + res.data.id);
//   } catch (err) {
//     console.log(err);
//     setError(err.response?.data?.message || err.message);
//   }
// };




  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSumbit} >
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
               <Editor
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
                />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>
            <div className="item">
              <label htmlFor="image">Upload Photo(Max-4)</label>
              <input id="image" name="image" type="file" onChange={(e) => { const files = Array.from(e.target.files);
                 const imageUrls = files.map(file => URL.createObjectURL(file)); setImages(imageUrls);
                  }} multiple />
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