import React, { useState } from 'react'
import './searchBar.scss'
import {assets} from '../../assets/assets'
import {Link} from 'react-router'

const type = ["buy","rent"]

const SearchBar = () => {
    const [query,setQuery] = useState({
        type:"buy",
        location:"",
        minPrice:0,
        maxPrice:0,
    })

    const switchType = (val) =>{
        setQuery(prev=>({ ...prev, type: val }))
    };

    const handleChange =(e)=> {
      setQuery(prev=>({ ...prev, [e.target.name] : e.target.value }))
    }

  return (
    <div className='searchBar'>
      <div className="type">
        {type.map((type)=>(
            <button 
            key={type} 
            onClick={()=>switchType(type)} 
            className={query.type === type ? "active" : ""}>
                {type}
            </button>
        ))}
        <form>
           <input type="text" name='location' placeholder='City Location' onChange={handleChange} /> 
           <input type="number" name='minPrice' min={0} max={10000000} placeholder='Min Price' onChange={handleChange} /> 
           <input type="number" name='maxPrice' min={0} max={10000000} placeholder='Max Price' onChange={handleChange} /> 
           <Link to={`/list?`}>
           <button className='search-btn'>
            <img src={assets.search} alt="" />
           </button>
           </Link>
        </form>
      </div>
      
    </div>
  )
}

export default SearchBar
