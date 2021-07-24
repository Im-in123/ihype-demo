import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./detail.css";
import { MOVIE_URL, ADD_TO_LIST_URL, CHECK_WATCHLIST_URL, } from '../urls';
import axios from "axios";
import { ReactVideo } from "reactjs-media";
import ReactPlayer from 'react-player'
import { store } from "../stateManagement/store";
import { axiosHandler, getToken } from "../helper";


const MovieDetail = (props) => {
  console.log("props::::", props)
  const [fetching, setFetching] = useState("true");
  const [detailData, setDetailData] = useState({});
  const [error, setError] = useState(false)

  // const popupRef = useRef()
  const [isShown, setIsShown] = useState(false)
  const [small, setSmall] = useState(false)
  const [trailer, setTrailer] = useState(false)

  const [watchfetch, setWatchFetch] = useState("false");
  const [watcherror, setWatcherror] = useState("false");
  const [finalwatch, setFinalwatch] = useState(false)

  const {state:{userDetail}} = useContext(store)
  useEffect(() =>{
      if(!userDetail.user.is_verified){
          window.location.href = "/verify";
        }
        if(!userDetail.is_verified){
          window.location.href = "/profile-update";
        }
  }, [])

  useEffect(() => {
    // prompt("Please use UC browser if you encounter videoplack errors. Thank you.")
    console.log(props)
    getMovieDetail(props)
   resize();
}, []);

const getMovieDetail = async (props) =>{
  const token = await getToken();
 const res = await axiosHandler({
    method:"get",
    url: MOVIE_URL+props.match.params.slug,
    token
  }).catch((e) => {
    console.log(e)
    setError(true)
  });

  if(res){
    setDetailData(res.data)
    setFetching(false)
    console.log(res.data)

    checkAddtoList(res.data)
  }

}

const handleToggleButtonClick = (e) => {  
  // if (isShown) return
  // resize ()
  const eli = document.getElementById('eli')
  console.log("eli:::::",eli)
  eli.classList.add("DetailBackground1");

  
   setIsShown(true)
  console.log("Set to true::::")
  // eli.classList.remove("DetailBackground");
 
}

const handleCloseButtonClick = (e) => {
  // resize()
  // eli.classList.add("DetailBackground");
     setIsShown(false)
    console.log("Set to false::::")
    // eli.classList.remove("DetailBackground1");


}
const handleTrailer = (e) => {
  // resize()
     setTrailer(true)
     handleToggleButtonClick()
    console.log("Set trailer to true::::")

}
const handleVideo = (e) => {
  // resize()
     setTrailer(false)
     handleToggleButtonClick()
    console.log("Set video to true::::")

}
const resize = (e) => {
  let currentHideNav = (window.innerWidth <= 760);
  console.log("width stuff::", currentHideNav)
  if (currentHideNav ===true){
    setSmall(true)
    
  }else{
    setSmall(false)

  }
}

const checkAddtoList =async (e)=>{

  setWatchFetch(true)
  const token = await getToken();
  console.log(" check watchlist triggered")
  const data= {"user_id": userDetail.user.id, "vid":e.id, "type":"movie"}
  console.log("check watchlist before data::::", data)
 const checkadd = await axiosHandler({
    method:"post",
    url: CHECK_WATCHLIST_URL,
    data:data,
    token
  }).catch((e) => {
    console.log("checkWatchlist error::::", e)
    setWatchFetch(true)
  });
  if (checkadd){
    console.log("checkWatchlist result::::",checkadd.data)
    const rr = checkadd.data['data']
    console.log("cccc::::",rr)
    if(rr =="exist-true"){
      setFinalwatch(true)
      setWatchFetch(false)
    }else{
     setWatchFetch(false)
     setFinalwatch(false)
    }
    
  }

}
  



const handleAddtoList =async (e)=>{
setWatchFetch(true)
const token = await getToken();
console.log("Add to List triggered")
const data= {"user_id": userDetail.user.id, "vid":detailData.id, "type":"movie"}
console.log("add to list before data::::", data)

 const res = await axiosHandler({
    method:"post",
    url:ADD_TO_LIST_URL,
    data:data,
    token
  }).catch((e) => {
    console.log(e)
    setWatcherror(true)
  });

  if (res){
    console.log("Handle add to list:::",res.data)
    setWatchFetch(false)
    const rr1  = res.data["data"]
    console.log("rr2:::::", rr1)
    if(rr1 ==="yah"){
      setFinalwatch(true)
    }else if(rr1==="not-yah") {
       setFinalwatch(false)
    }
  }

}

if (fetching){
  return(<div className="DetailContainer">
     {error ? (
          
            <h4 className="H4Group">Connection failed, try again!!!</h4>
     
         ) : (
          <h4 className="H4Group">Loading ...</h4>
             )}
      
      </div>
  )
}

  return (
    <>
    <div className="DetailContainer">
    {small ? (
       <div className="DetailBackground" id="eli">
       <img alt={detailData.title} src={detailData.background_small_screen} />
  </div>
    ):(
      
      <div className="DetailBackground" id="eli">
      <img alt={detailData.title} src={detailData.background_big_screen} />
   </div>

    )}
       
       
        {!isShown ? (<>
          <div className="DetailImageTitle">
            {/* <img alt={detailData.title} src="./images/play-icon-black.png" /> */}
            <p>{detailData.title}</p>
            
      </div> 
      <div className="DetailContentMeta">
          <div className="DetailControls">
                <button className="DetailPlayer"  onClick={handleVideo}>
                     <img src="/images/play-icon-black.png" alt="" />
                     <span>Play</span>

                </button>
                <button className="DetailTrailer"  onClick={handleTrailer}>
                      <img src="/images/play-icon-white.png" alt="" />
                      <span>Trailer</span>
               </button>
                <button className="DetailAddList" onClick={ ()=>{handleAddtoList() }}>

               { watchfetch ? (
               <p>...</p>
               ):(<>
               {finalwatch ?(
                 <img src="/images/done_white.svg" alt="finalwatch"/>
               ):(
                 <>
                 <span></span>
                <span></span>
                 </>
               )}

               
                </>

               )} </button>
               {/* <div className="DetailGroupWatch">
                    <div>
                        <img src="/images/group-icon.png" alt="" />
                    </div>
               </div> */}
          </div>  
          <div className="DetailSubtitle" >
                {detailData.subtitle}
          </div>
          <div className="DetailDescription">
         {detailData.description} 
          </div>
        
      </div>
      </>
       ) : (
       <>
  <div className="DetailVideo">
        {trailer? (<>
  <p>{detailData.title} - {detailData.subtitle}</p>
         
    { detailData.trailer ?(<>
        <button onClick={handleCloseButtonClick}>
        X Close trailer
        </button> 
    <video src={detailData.trailer} autoPlay={true} controls="controls" poster={detailData.cover} />
   </> ):(<>
      <button onClick={handleCloseButtonClick}>
      X Close 
      </button> 
         <p>Trailer Not available</p> 
   </>  )}
  </>  ) :(<>
     <p>{detailData.title} - {detailData.subtitle}</p>
     <button onClick={handleCloseButtonClick}>
  X Close Video 
  </button> 
          <video src={detailData.video} autoPlay={true} controls="controls" poster={detailData.cover}></video>
      
       </> )}
          </div>

          {/* <div className="DetailVideo">
            <p>react-player Package</p>
          <ReactPlayer url={detailData.video} playing={false} controls={true} light={true} playbackRate="1"  poster={detailData.cover}/>
          </div>  */}

          {/* <div>
            <p>reactjs-media Package</p>
         <ReactVideo
                src={detailData.video} 
                poster={detailData.cover}
                className="rjs"
            /> 
          </div> */}


       </>
         )}
    </div>
    </>
  );
 
};

const vv =props=>{

}
export default MovieDetail;





