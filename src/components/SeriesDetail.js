import React, { useState, useContext, useEffect,  useLayoutEffect} from "react";
import "./detail.css";
import { store } from "../stateManagement/store";
import { ADD_TO_LIST_URL, CHECK_WATCHLIST_URL, SERIES_URL, LOCAL_CHECK } from '../urls';
import { ReactVideo } from "reactjs-media";
import ReactPlayer from 'react-player'
import {currentSeriesVideoAction} from "../stateManagement/actions";
import {secondChangeAction} from "../stateManagement/actions";
import { axiosHandler, getToken } from "../helper";



const SeriesDetail = (props) => {
  const {state:{userDetail}} = useContext(store)
  const [reload, setReload] = useState(true)


  console.log("props::::", props)
  const [fetching, setFetching] = useState("true");
  const [error, setError] = useState(false)
  const [watchfetch, setWatchFetch] = useState("false");
  const [watcherror, setWatcherror] = useState("false");




  const [detailData, setDetailData] = useState({});
  const {state:{currentVideo}, dispatch} = useContext(store)
  console.log("Video_state_global:::",currentVideo)

  const {state:{secondChange}} = useContext(store)
  console.log("Second_change:::", secondChange)

  // const popupRef = useRef()



  const [isShown, setIsShown] = useState(false)
  const [small, setSmall] = useState(false)
  const [trailer, setTrailer] = useState(false)
  const [finalwatch, setFinalwatch] = useState(false)


    useEffect(() =>{
        if(!userDetail.user.is_verified){
            window.location.href = "/verify";
          }
          if(!userDetail.is_verified){
            window.location.href = "/profile-update";
          }
    }, [])


  useEffect(() => {
    console.log(props)
    console.log("url:::::", SERIES_URL+props.match.params.slug)   
    vb(props)
   
}, [reload]);

useEffect(() => {
  if(secondChange===false){
    return
  }else{
  handleVideo()
  }
}, [secondChange]);

useEffect(() => {
 
}, []);
 // prompt("Please use UC browser if you encounter videoplack errors. Thank you.")

 const vb = async (props)=>{
   setFetching(true)

   const token = await getToken();
   const result = await axiosHandler({
     method:"get",
     url:SERIES_URL+props.match.params.slug,
     token
   }).catch((e) => {
       console.log(e)
       setError(true)
   });
   if(result){
     setDetailData(result.data)
         
     console.log(result.data)
     const yo = result.data.season 
     for(var g in yo ){
      //  console.log("Yooooooooo:::::::", yo[g])
      if (yo[g].season_num ===1){
        // console.log("got it::::", yo[g].season_num)
        const yo1= yo[g].episodes
        for (var v in yo1){
          if (yo1[v].episode_num===1){
            // console.log("Got the first episode::::", yo1[v].episode_num)
            const yo2= yo1[v]
            // console.log("Got final episode:::",yo2)
            dispatch({type:currentSeriesVideoAction,payload:{"video":LOCAL_CHECK ? yo2.video:yo2.video_url,"cover":yo2.cover, "title":yo2.title, "season_num":yo2.season_num, "subtitle_file":yo2.subtitle_file}});
            console.log("starter episode:::::", currentVideo)

          }
        }
      }
     
     }
     checkAddtoList(result.data)
     setFetching(false)

   }
   
 
  resize();

 }
 

const handleToggleButtonClick = (e) => {  
  // if (isShown) return
  // resize ()
  const eli = document.getElementById('eli')
  eli.classList.add("DetailBackground1");
   setIsShown(true)
  console.log("Set to true::::")
  // eli.classList.remove("DetailBackground");
}

const handleCloseButtonClick = (e) => {
  // resize()
  // eli.classList.add("DetailBackground");
  dispatch({type:secondChangeAction,payload:false})
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
    const data= {"user_id": userDetail.user.id, "vid":e.id, "type":"series"}
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
      if(rr ==="exist-true"){
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
  const data= {"user_id": userDetail.user.id, "vid":detailData.id, "type":"series"}
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
  return (<div className="DetailContainer">
     {error ? (
           <h4 className="H4Group"  >Connection failed!  &nbsp;&nbsp; <button onClick={() => setReload(!reload)} >  Retry</button></h4>
         ) : (
         <h4 id="loaderdetail"></h4>

             )}

      </div>
  )
}

  return (
    <>
    <div className="DetailContainer">
    {small ? (
       <div className="DetailBackground" id="eli">
       {/* <img alt={detailData.title} src={detailData.background_small_screen} /> */}
       <img alt={detailData.title} src={LOCAL_CHECK ? detailData.background_small_screen : detailData.small_screen_url} />

  </div>
    ):(
      
      <div className="DetailBackground" id="eli">
      {/* <img alt={detailData.title} src={detailData.background_big_screen} /> */}
      <img alt={detailData.title} src={LOCAL_CHECK ? detailData.background_big_screen : detailData.big_screen_url} />

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
         {detailData.description} <br/> {detailData.other_info}
          </div>
          <div id="detailseason" className="DetailSeason">
            <Season data={detailData.season}/>
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
    <video src={LOCAL_CHECK ? detailData.trailer: detailData.trailer_url} autoPlay={true} controls="controls" poster={LOCAL_CHECK ? detailData.cover : detailData.cover_url} />
   </> ):(<>
      <button onClick={handleCloseButtonClick}>
      X Close 
      </button> 
         <p>Trailer Not available</p> 
   </>  )}
  </>  ) :(<>
        {currentVideo.video ? (<>
   <p>Season {currentVideo.season_num} - {currentVideo.title}</p>
   <button onClick={handleCloseButtonClick}>
X Close Video 
</button> 
        <video crossorigin="anonymous" autoPlay={true} controls="controls" 
        poster={LOCAL_CHECK ?
              detailData.cover && currentVideo.cover
                :
               detailData.cover_url && currentVideo.cover_url
            }
        >
        <track src={currentVideo.subtitle_file} label="English" srcLang="en-us" kind="subtitles"  default />
          <source src={LOCAL_CHECK ? currentVideo.video: currentVideo.video_url} type="video/mkv"/>
          <source src={LOCAL_CHECK ? currentVideo.video: currentVideo.video_url}  type="video/webm"/>
          <source src={LOCAL_CHECK ? currentVideo.video: currentVideo.video_url} type="video/ogg"/>
          <source src={LOCAL_CHECK ? currentVideo.video: currentVideo.video_url}  type="video/mp4"/>

        </video>
       </> ):(<>
        <p>Season {currentVideo.season_num} - {currentVideo.title}</p>
        <button onClick={handleCloseButtonClick}>
      X Close 
      </button> 
         <p>Video Not available</p> 
          </>
        )}
      
       </> )}
          </div>
         
          {/* <div>
            <p>reactjs-media Package</p>
         <ReactVideo
                src={detailData.video} 
                poster={detailData.cover}
                //you can pass in other props
            /> 
          </div> */}
       </>
         )}
    </div>
    </>
  );
 
};

const Season =(props)=>{
  const {state:{currentVideo}, dispatch} = useContext(store)
  const {state:{secondChange}} = useContext(store)

  useLayoutEffect(() => {
    try {
      const sid= currentVideo.scrollid
    console.log("sid::::", sid)
    const scrolli  = document.getElementById(sid)
    console.log("scrolli::::", scrolli)
    scrolli.scrollIntoView({behavior:'smooth'})
    // scrolli.scrollIntoView()({behavior:'smooth', block:'end'})
    scrolli.style= "color: red"; 

    // scrolli.style= "color: #fb2c2c"; 
      
    } catch (error) {
      console.log("scrolli error", error)
    }
  }, []);
  



  const Changeit=(video, cover, scrollid, season_num, subtitle_file)=>{
    dispatch({type:currentSeriesVideoAction,payload:{"video":video,"cover":cover, "title":scrollid, "scrollid":scrollid, "season_num":season_num, "subtitle_file":subtitle_file}});
    dispatch({type:secondChangeAction,payload:true})

  }
  if(props.data){
    
    
    console.log("season episodes:::::", props.data)
    if(props.data.length===0){
        return(
            <div className="H4Group">..</div>
        )
    }
  
    return (
      <div>
      {props.data.map((item,key)=>
        <div className key={key}>
       <p style={{textAlign:"left", color:"red", fontSize:'21px'}}>{item.title}</p>
       {item.episodes.map((ep,ekey)=>
        <div  id="getit" key={ekey}>
          <button id={ep.title} className="episode" onClick={()=> Changeit(LOCAL_CHECK ? ep.video:ep.video_url ,ep.cover, ep.title, ep.season_num, ep.subtitle_file)} > {ep.title}</button>
         </div>
     )}  <hr style={{color:'grey'}}></hr>
        </div>
        
     )} 
    
     </div>
  )

  }else{
    return (
      <div>...</div>
  )
  }
}
export default SeriesDetail;





