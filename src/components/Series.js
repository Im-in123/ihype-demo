import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { SERIES_URL, LOCAL_CHECK } from '../urls';
import { store } from "../stateManagement/store";
import ReactPaginate from "react-paginate";
import { axiosHandler, getToken } from "../helper";
import {currentPageSeriesAction} from "../stateManagement/actions";

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
    const [reload, setReload] = useState(true)
    // const [currentPage, setCurrentPage] =useState(1)
    const [otherList, setOtherList] =useState("")
    const {state:{currentPageSeries}, dispatch} = useContext(store)


    const {state:{userDetail}} = useContext(store)
    useEffect(() =>{
        if(!userDetail.user.is_verified){
          window.location.href = "/verify";
        }
        if(!userDetail.is_verified){
          window.location.href = "/profile-update";
        }
        }, [])


    useEffect(() =>{
        let extra = `?page=${currentPageSeries}`;
        getSeriesContent(extra)
     }, [reload, currentPageSeries])
    
       
 
     const getSeriesContent = async(extra="") =>{
         setFetching(true)
        const token = await getToken();
        const res = await axiosHandler({
           method:"get",
           url: SERIES_URL+extra,
           token
         }).catch((e) => {
           console.log("Error in Series::::",e);
           setError(true)

         });
   
         if(res){
             setOtherList(res.data)
            setSeriesList(res.data.results)
            
            console.log("Serieslist Home::::", res.data.results);
            const g = res.data.results
            for (var i in g){
               const tags = g[i].tags;
               console.log("tags in here:::::", tags)
             for (var t in tags){
               console.log("inner tags:::", tags[t])
               if (tags[t].title==="Recommended"){
                   console.log("got a recommended::::")
                recommends = [...recommends, g[i]];
                 console.log("final data:::", g[i] )
                   console.log("THis is final recommended::::",recommends)
               }
               if (tags[t].title==="New"){
                   console.log("got a new::::")
                 newones = [...newones, g[i]];
                 console.log("final data:::", g[i] )
                   console.log("THis is final new::::", newones)
               } 
           
               if (tags[t].title==="Trending"){
                   console.log("got a trending::::")
                 trending = [...trending, g[i]];
                 console.log("final data:::", g[i] )
                   console.log("THis is final trending::::", trending)
               }
               
            }
            console.log("recommends temp check:::", recommends)
           
           }
      
           setRecommendedList(recommends)
           setNewList(newones)
           setTrendingList(trending)
   
           console.log("OG FINAL recommend::::::", recommendedList)
         setFetching(false)

         }
       
     }
  
     if (fetching){
         return(<>
            {error ? (
                <div className="SeriesMain">
           <h4 className="H4Group"  >Connection failed!  &nbsp;&nbsp; <button onClick={() => setReload(!reload)} >  Retry</button></h4>
             </div>
                ) : (
                    <div className="SeriesMain">
         <h4 id="loaderhome"> </h4>
             </div>
                    )}
             
             </>
         )
     }
  
    
    return (
        <div className="SeriesMain">
        {error ? (    
           <h4 className="H4Group"  >Connection failed!  &nbsp;&nbsp; <button onClick={() => setReload(!reload)} >  Retry</button></h4>
           ) : (
                <>
                <h4 className="H4GroupMaster">SERIES / TV SHOWS</h4>
                <SeriesRecommended data={recommendedList}/>
             <SeriesNew data={newList}/>
             <Trending data={trendingList}/>
             <div>
{!fetching && (

<ReactPaginate 
pageCount={Math.ceil(otherList.count/10)}  
pageRangeDisplayed ={7} 
previousLabel={"← Previous"}
nextLabel={"Next →"}
onPageChange ={(e) => dispatch({type:currentPageSeriesAction, payload:e.selected+1})}
marginPagesDisplayed={1}
previousLinkClassName={"pagination__link"}
nextLinkClassName={"pagination__link"}
containerClassName={'pagination'}
activeClassName={'active'}
// subContainerClassName={'pages pagination'}
forcePage={currentPageSeries - 1 }
/>
          )}
</div>

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
               <img src={LOCAL_CHECK ? item.cover:item.cover_url} alt={item.title} />
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
        <h4 className="H4Group">New to iHype+</h4>
                <div className="NewContent">
                {props.data.map((item,key)=>
                        <div className="NewWrap" key={key}>
                           <Link to={`/detail/`+ item.core_type + "/" + item.slug}>
                           <img src={LOCAL_CHECK ? item.cover:item.cover_url} alt={item.title} />
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
                           <img src={LOCAL_CHECK ? item.cover:item.cover_url} alt={item.title} />
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
