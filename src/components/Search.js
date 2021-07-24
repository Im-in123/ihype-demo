import { render } from "@testing-library/react";
import React, { useState, useContext, useEffect } from "react";
import { VIDEO_URL } from "../urls";
import "./search.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { store } from "../stateManagement/store";


const Search = (props) =>{

    const [fetching, setFetching] = useState(true)
  const [resultList, setResultList] = useState(true)
  const [error, setError] = useState(false)
  const [search, setSearch] = useState("")
  const [searchb, setSearchb] = useState("")
  let videos = []
  let debouncer;

  const {state:{userDetail}, dispatch} = useContext(store)
useEffect(() =>{
  
  if(!userDetail.user.is_verified){
    window.location.href = "/verify";
  }
  if(!userDetail.is_verified){
    window.location.href = "/profile-update";
  }
}, [])

  useEffect(() =>{
    
     clearTimeout(debouncer);
      debouncer= setTimeout(() =>{
        let extra = `?keyword=${search}`;
        getSearchContent(extra)
      }, 1700)
    
  }, [search, searchb])

  const getSearchContent = (extra="") =>{
    setFetching(true)
   
    axios.get(VIDEO_URL + extra).then(
      res =>{
       
        console.log("Search results:::::::",res.data);

        const gg = res.data
        for (var q in gg){
          console.log("first object::::::",gg[q])
          const gg2 = gg[q]
         console.log("Videotype::::", gg2.videotype)
          if (gg2.videotype === "Movie"){
            const gg3 = gg2.movie
            console.log("movie array", gg2.movie)
            for(var e in gg3){
              videos= [...videos, gg3[e]];
              console.log("Movie found:::", gg3[e])
            }

          }else if (gg2.videotype === "Series"){
            const gg3 = gg2.series
            console.log("series array", gg2.series)
            for(var e in gg3){
              videos= [...videos, gg3[e]];
              console.log("Series found:::", gg3[e])
            }
          }else{
            console.log("Error uncategorized video found")
            alert("Error uncategorized video found")
           }
        }
        console.log("Final videos:::", videos)
        setResultList(videos)
        setFetching(false)

      }
      ).catch(
        (err) =>{
          console.log(err);
          setError(true)
        }
    )
  }

  if (error){
    return(
   
            <div className="MainSearch">
              <h4 className="H4Group">Connection failed, try again!!!</h4>
        </div>
          
    
    )
}
 
    return (
        <div className="MainSearch">
            <div className="wrapdiv">
            <div className="search">
                <div className="form1">
                <input type="text" className="searchTerm" placeholder="What are you looking for?" value={search}  onChange={e => setSearch(e.target.value)}/>
                <button className="searchButton" onClick={e => setSearchb(e.target.value)}>
                    <img src="/images/search-icon.svg"/>
                </button>
                </div>
                
            </div>
        </div>
        <div className="AppendResults">
        {fetching ? (
                 <div className="H4Group">
                 Loading...
             </div>
            ):(

              <ResultsDisplay data={resultList}/>

                )}
        </div>
          
        </div>
    );
}

const ResultsDisplay = (props) =>{
    
    if(props.data){
      if(props.data.length===0){
        console.log("length:::::", props)
        return(
            <div className="H4Group">Nothing was found!</div>
        )
    }
    return(
        <div className="Results">
        <h4 className="H4Group">Search results</h4>
                <div className="ResultsContent">
                {props.data.map((item,key)=>
                        <div className="ResultsWrap" key={key}>
                           <Link to={`/detail/`+ item.core_type + "/" + item.slug}>
                                 <img src={item.cover} alt={item.title} />
                            </Link>
                 </div>
         )} 
                </div>
        </div>
    )
                }else{
                    return(
                    <div></div>
                    )
                }
}

export default Search;