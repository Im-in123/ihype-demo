import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./watchlist.css";
import { WATCHLIST_URL } from '../urls';
import { store } from "../stateManagement/store";



const Watchlist = (props)=>{
    const {state:{userDetail}} = useContext(store)

    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState(false)
    const [watchList, setWatchList] = useState()
    let watchListVideo= [];


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
     }, [])
 
     const getWatchlistContent = () =>{
        let extra = `?keyword=${userDetail.user.id}`;
        axios.get(WATCHLIST_URL+extra).then(
        res =>{
            console.log("Watchlist Home:::::", res.data)
            setWatchList(res.data)
            const g = res.data
          
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
        ).catch(
            (err) =>{
            console.log("Error in Watchlist::::",err);
            setError(true)
           
            }
        )
    }

    if (fetching){
        return(<>
           {error ? (
                <div className="WatchlistMain">
                  <h4 className="H4Group">Connection failed, try again!!!</h4>
            </div>
               ) : (
                <div className="WatchlistMain">
                <h4 className="H4Group">Loading ...</h4>
            </div>
                   )}
            
            </>
        )
    }

    return (
        <div className="WatchlistMain">
             <h4 className="H4GroupMaster"></h4>
           <WatchResults data={watchList}/>

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
            <img src={item.cover} alt={item.title} />
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