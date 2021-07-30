import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { MOVIE_URL, LOCAL_CHECK } from '../urls';
import { store } from "../stateManagement/store";
import { axiosHandler, getToken } from "../helper";
import ReactPaginate from "react-paginate";
import {currentPageMovieAction} from "../stateManagement/actions";
import "./movies.css";


const Movies = props =>{
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState(false)
    const [moviesList, setMoviesList] = useState()
    let recommends = [];
    let newones= [];
    let trending= [];
    const [recommendedList, setRecommendedList] = useState(true)
    const [newList, setNewList] = useState(true)
    const [trendingList, setTrendingList] = useState(true)
    const [reload, setReload] = useState(true)
    // const [currentPage, setCurrentPage] =useState(1)
     const [otherList, setOtherList] =useState("")
     const {state:{userDetail}, dispatch} = useContext(store)

    

    const {state:{currentPageMovie}} = useContext(store)
    useEffect(() =>{
        if(!userDetail.user.is_verified){
            window.location.href = "/verify";
          }
          if(!userDetail.is_verified){
            window.location.href = "/profile-update";
          }
    }, [])

    useEffect(() =>{
        let extra = `?page=${currentPageMovie}`;
        getMoviesContent(extra)
     }, [reload, currentPageMovie])

   
     const getMoviesContent =async (extra="") =>{
         setFetching(true)
        const token = await getToken();
        const res = await axiosHandler({
           method:"get",
           url: MOVIE_URL+ extra,
           token
         }).catch((e) => {
           console.log("Error in Movies::::",e);
               setError(true)
         });
   
         if(res){
            setOtherList(res.data)
           setMoviesList(res.data.results)
               
           console.log("Movieslist Home::::", res.data.results);
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
                <div className="MoviesMain">
           <h4 className="H4Group"  >Connection failed!  &nbsp;&nbsp; <button onClick={() => setReload(!reload)} >  Retry</button></h4>
            </div>
               ) : (
                <div className="MoviesMain">
         <h4 id="loaderhome"> </h4>
            </div>
                   )}
            
            </>
        )
    }

    return (
        <div className="MoviesMain">
             <h4 className="H4GroupMaster">MOVIES</h4>
           <MoviesRecommended data={recommendedList}/>
        <MoviesNew data={newList}/>
        <MoviesTrending data={trendingList}/>

        <div>
{!fetching && (

<ReactPaginate 
pageCount={Math.ceil(otherList.count/10)}  
pageRangeDisplayed ={7} 
previousLabel={"← Previous"}
nextLabel={"Next →"}
onPageChange ={(e) => dispatch({type:currentPageMovieAction, payload:e.selected+1})}
marginPagesDisplayed={1}
previousLinkClassName={"pagination__link"}
nextLinkClassName={"pagination__link"}
containerClassName={'pagination'}
activeClassName={'active'}
// subContainerClassName={'pages pagination'}
forcePage={currentPageMovie - 1 }
/>
          )}
</div>
        </div>
    )
}

const MoviesRecommended =(props)=>{
    console.log("Recommended-movies props:::",props)
    if(props.data){
        if(props.data.length===0){
            return(
                <div className="H4Group">..</div>
            )
        }
    return(
        <div className="RecommendedMovies">
         <h4 className="H4Group">Recommended For You</h4>
         <div className="RecommendedMoviesContent">
         {props.data.map((item,key)=>
            <div className="RecommendedMoviesWrap" key={key}>
               <Link to={`/detail/`+ "movie/"+item.slug}>
            {/* <img src={item.cover} alt={item.title} /> */}
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
const MoviesNew = (props) =>{
    if(props.data){
        if(props.data.length===0){
            return(
                <div className="H4Group">..</div>
            )
        }
    return(
        <div className="NewMovies">
        <h4 className="H4Group">New to iHype+</h4>
                <div className="NewMoviesContent">
                {props.data.map((item,key)=>
                        <div className="NewMoviesWrap" key={key}>
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

const MoviesTrending = (props) =>{
    if(props.data){
        
        if(props.data.length===0){
            return(
                <div className="H4Group">..</div>
            )
        }
        return (
            <div className="TrendingMovies">
            <h4 className="H4Group">Trending</h4>
                    <div className="TrendingMoviesContent">

                         {props.data.map((item,key)=>
                        <div className="TrendingMoviesWrap" key={key}>
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





export default Movies;
