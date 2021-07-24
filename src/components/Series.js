import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { SERIES_URL } from '../urls';
import { store } from "../stateManagement/store";

import "./series.css";

const Series = props =>{
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState(false)
    const [seriesList, setSeriesList] = useState()
    let recommends = [];
    let newones= [];
    let trending= [];
    const [recommendedList, setRecommendedList] = useState(true)
    const [newList, setNewList] = useState(true)
    const [trendingList, setTrendingList] = useState(true)
    

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
        getSeriesContent()
     }, [])
 
 
     const getSeriesContent = () =>{
        
         axios.get(SERIES_URL).then(
         res =>{
             setSeriesList(res.data)
            
             console.log("Serieslist Home::::", res.data);
             const g = res.data
             for (var i in g){
                const tags = g[i].tags;
                console.log("tags in here:::::", tags)
              for (var t in tags){
                console.log("inner tags:::", tags[t])
                if (tags[t].title=="Recommended"){
                    console.log("got a recommended::::")
                   // recommendedList.push[g[i]]
                  // setRecommendedList([g[i]].concat(recommendedList))
                // setRecommendedList(recommendedList => [...recommendedList, g[i]])
                  //setRecommendedList(recommendedList => recommendedList.concat(g[i]))
                  recommends = [...recommends, g[i]];
                  console.log("final data:::", g[i] )
                    console.log("THis is final recommended::::",recommends)
                }
                if (tags[t].title=="New"){
                    console.log("got a new::::")
                  newones = [...newones, g[i]];
                  console.log("final data:::", g[i] )
                    console.log("THis is final new::::", newones)
                }
            
                if (tags[t].title=="Trending"){
                    console.log("got a trending::::")
                  trending = [...trending, g[i]];
                  console.log("final data:::", g[i] )
                    console.log("THis is final trending::::", trending)
                }
                
             }
             console.log("recommends temp check:::", recommends)
            
            }
       
           
          
            //setRecommendedList(recommendedList => [...recommendedList, recommends])
            setRecommendedList(recommends)
            setNewList(newones)
            setTrendingList(trending)
    
            console.log("OG FINAL recommend::::::", recommendedList)
          setFetching(false)

         }
         ).catch(
             (err) =>{
             console.log("Error in Series::::",err);
             setError(true)
             }
         )
     }
  
     if (fetching){
         return(<>
            {error ? (
                <div className="SeriesMain">
                  <h4 className="H4Group">Connection failed, try again!!!</h4>
             </div>
                ) : (
                    <div className="SeriesMain">
                  <h4 className="H4Group">Loading ...</h4>
             </div>
                    )}
             
             </>
         )
     }
  
    
    return (
        <div className="SeriesMain">
        {error ? (    
                <div>Connection failed, try again!!</div>
            ) : (
                <>
                <h4 className="H4GroupMaster">SERIES / TV SHOWS</h4>
                <SeriesRecommended data={recommendedList}/>
             <SeriesNew data={newList}/>
             <Trending data={trendingList}/>
</>
                )}
       
        </div>
    )
}

const SeriesRecommended =(props)=>{
    console.log("Recommended-series props:::",props)
    if(props.data){
        if(props.data.length===0){
            return(
                <div className="H4Group">..</div>
            )
        }
    return(
        <div className="Recommended">
         <h4 className="H4Group">Recommended For You</h4>
         <div className="RecommendedContent">
         {props.data.map((item,key)=>
            <div className="RecommendedWrap" key={key}>
               <Link to={`/detail/`+ item.core_type + "/" + item.slug}>
                 <img src={item.cover} alt={item.title} />
               </Link>
            </div>
         )} 
        </div>
</div>
    )
         }else{
             return (
                 <div></div>
             )

         }
}
const SeriesNew = (props) =>{
    if(props.data){
        if(props.data.length===0){
            return(
                <div className="H4Group">..</div>
            )
        }
    return(
        <div className="New">
        <h4 className="H4Group">New to Astroworld+</h4>
                <div className="NewContent">
                {props.data.map((item,key)=>
                        <div className="NewWrap" key={key}>
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

const Trending = (props) =>{
    if(props.data){
        if(props.data.length===0){
            return(
                <div className="H4Group">..</div>
            )
        }
        return (
            <div className="Trending">
            <h4 className="H4Group">Trending</h4>
                    <div className="TrendingContent">

                         {props.data.map((item,key)=>
                        <div className="TrendingWrap" key={key}>
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





export default Series;

// for (var i in g){
//     const tags = g[i].tags;
//     console.log("tags in here:::::", tags)
//   for (var t in tags){
//     console.log("inner tags:::", tags[t])
//     if (tags[t].title=="Recommended"){
//         console.log("got a recommended::::")
//        // recommendedList.push[g[i]]
//       // setRecommendedList([g[i]].concat(recommendedList))
//     // setRecommendedList(recommendedList => [...recommendedList, g[i]])
//       //setRecommendedList(recommendedList => recommendedList.concat(g[i]))
//       recommends = [...recommends, g[i]];
//       console.log("final data:::", g[i] )
//         console.log("THis is final recommended::::",recommends)
//     }
//     if (tags[t].title=="New"){
//         console.log("got a new::::")
//       newones = [...newones, g[i]];
//       console.log("final data:::", g[i] )
//         console.log("THis is final new::::", newones)
//     }

//     if (tags[t].title=="Trending"){
//         console.log("got a trending::::")
//       trending = [...trending, g[i]];
//       console.log("final data:::", g[i] )
//         console.log("THis is final trending::::", trending)
//     }
//  }
//  console.log("recommends temp check:::", recommends)

// }