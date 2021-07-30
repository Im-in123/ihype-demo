import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import "./watchlist.css";
import { WATCHLIST_URL, LOCAL_CHECK } from '../urls';
import { store } from "../stateManagement/store";
import { axiosHandler, getToken } from "../helper";
import ReactPaginate from "react-paginate";
import {currentPageWatchlistAction} from "../stateManagement/actions";




const Watchlist = (props)=>{
    const {state:{userDetail}, dispatch} = useContext(store)
    const [reload, setReload] = useState(true)
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState(false)
    const [watchList, setWatchList] = useState()
    let watchListVideo= [];
    const [currentPage, setCurrentPage] =useState(1)
     const [otherList, setOtherList] =useState("")
     const {state:{currentPageWatchlist}} = useContext(store)


    useEffect(() =>{
        if(!userDetail.user.is_verified){
          window.location.href = "/verify";
        }
        if(!userDetail.is_verified){
          window.location.href = "/profile-update";
        }
        }, [])


    useEffect(() =>{
        getWatchlistContent()
     }, [reload, currentPageWatchlist])


     const getWatchlistContent = async () =>{
        setFetching(true)
        const token = await getToken();
        let extra = `?keyword=gotgot ${token}&page=${currentPageWatchlist}`;
        const res = await axiosHandler({
           method:"get",
           url: WATCHLIST_URL+extra,
           token
         }).catch((e) => {
           console.log("Error in Watchlist::::",e);
           setError(true)
         });
   
         if(res){
            setOtherList(res.data)
           console.log("Watchlist Home:::::", res.data.results)
           setWatchList(res.data.results)
           const g = res.data.results
         
           console.log("Final::::", g)
           for (var b in g){
               console.log("vvvv11::::", g[b])
               const g1 = g[b]
               for (var c in g1){
                   if(c === "favorite_series"){
                       console.log("vvvv222:::::",g1[c])
                       const g2 = g1[c]
                       for(var d in g2){
                           console.log("vvvvv33", g2[d])
                           watchListVideo= [...watchListVideo, g2[d]]
                       }
                   }
                   if(c === "favorite_movie"){
                       console.log("vvvv222:::::",g1[c])
                       const g2 = g1[c]
                       for(var d in g2){
                           console.log("vvvvv33", g2[d])
                           watchListVideo= [...watchListVideo, g2[d]]
                       }
                   }
               }
           }
           setWatchList(watchListVideo)
           console.log("Here data:::::",watchListVideo)
           setFetching(false)
         }
   
    }

    if (fetching){
        return(<>
           {error ? (
                <div className="WatchlistMain">
              <h4 className="H4Group"  >Connection failed!  &nbsp;&nbsp; <button onClick={() => setReload(!reload)} >  Retry</button></h4>
            </div>
               ) : (
                <div className="WatchlistMain">
         <h4 id="loaderhome"> </h4>
            </div>
                   )}
            
            </>
        )
    }

    return (
        <div className="WatchlistMain">
             <h4 className="H4GroupMaster"></h4>
           <WatchResults data={watchList}/>

           <div>
{!fetching && (

<ReactPaginate 
pageCount={Math.ceil(otherList.count/10)}  
pageRangeDisplayed ={7} 
previousLabel={"← Previous"}
nextLabel={"Next →"}
onPageChange ={(e) => dispatch({type:currentPageWatchlistAction, payload:e.selected+1})}
marginPagesDisplayed={1}
previousLinkClassName={"pagination__link"}
nextLinkClassName={"pagination__link"}
containerClassName={'pagination'}
activeClassName={'active'}
forcePage={currentPageWatchlist - 1 }
/>
          )}
</div>
        </div>
    )


}


const WatchResults =(props)=>{
    console.log("Watchlist props:::",props)
    if(props.data){
        if(props.data.length===0){
            return(
                <div className="H4Group">Nothing yet.</div>
            )
        }
    return(
        <div className="Watch">
         <h4 className="H4GroupMaster">Watchlist</h4>
         <div className="WatchContent">
         {props.data.map((item,key)=>     <>
            <div className="WatchWrap" key={key}>
            <Link to={`/detail/`+ item.core_type + "/" + item.slug}>
            <img src={LOCAL_CHECK ? item.cover:item.cover_url} alt={item.title} />
            </Link>
            </div>
                                {/* <p>Remove</p> */}
     </>
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


export default Watchlist;