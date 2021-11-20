import { Link } from "react-router-dom";
import { VIDEO_URL, LOCAL_CHECK } from "../urls";
import "./home.css";
import React, { useState, useContext, useEffect } from "react";
import { store } from "../stateManagement/store";
import { axiosHandler, getToken } from "../helper";
import ReactPaginate from "react-paginate";
import { currentPageHomeAction } from "../stateManagement/actions";

const Home = (props) => {
  const {
    state: { userDetail },
    dispatch,
  } = useContext(store);
  console.log("userDetail::::::::::", userDetail);
  const [fetching, setFetching] = useState(true);
  const [VideoList, setVideoList] = useState(true);
  const [reload, setReload] = useState(true);
  //  const [currentPage, setCurrentPage] =useState(1)
  const [otherList, setOtherList] = useState("");
  const {
    state: { currentPageHome },
  } = useContext(store);

  const [error, setError] = useState(false);
  let recommends = [];
  let newones = [];
  let trending = [];

  let videos = [];

  const [recommendedList, setRecommendedList] = useState(true);
  const [newList, setNewList] = useState(true);
  const [trendingList, setTrendingList] = useState(true);

  useEffect(() => {
    if (!userDetail.user.is_verified) {
      window.location.href = "/verify";
    }
    if (!userDetail.is_verified) {
      window.location.href = "/profile-update";
    } else {
      let extra = `?page=${currentPageHome}`;
      getVideoContent(extra);
    }
  }, [reload, currentPageHome]);

  const getVideoContent = async (extra = "") => {
    setFetching(true);

    const token = await getToken();
    const res = await axiosHandler({
      method: "get",
      url: VIDEO_URL + extra,
      token,
    }).catch((e) => {
      console.log("Error in Home Videos::::", e);
      setError(true);
    });

    if (res) {
      setOtherList(res.data);
      setVideoList(res.data.results);

      console.log(" Home Video List::::", res.data);

      const gg = res.data.results;
      for (var q in gg) {
        // console.log("first object::::::",gg[q])
        const gg2 = gg[q];
        //  console.log("Videotype::::", gg2.videotype)
        if (gg2.videotype === "Movie") {
          const gg3 = gg2.movie;
          // console.log("movie array", gg2.movie)
          for (var e in gg3) {
            videos = [...videos, gg3[e]];
            // console.log("Movie found:::", gg3[e])
          }
        } else if (gg2.videotype === "Series") {
          const gg3 = gg2.series;
          // console.log("series array", gg2.series)
          for (var e in gg3) {
            videos = [...videos, gg3[e]];
            // console.log("Series found:::", gg3[e])
          }
        } else {
          console.log("Error uncategorized video found");
          alert("Error uncategorized video found");
        }
      }
      console.log("Video List:::", videos);

      const g = videos;
      for (var i in g) {
        const tags = g[i].tags;
        // console.log("tags in here:::::", tags)
        for (var t in tags) {
          // console.log("inner tags:::", tags[t])
          if (tags[t].title === "Recommended") {
            //setRecommendedList(recommendedList => recommendedList.concat(g[i]))
            recommends = [...recommends, g[i]];
          }
          if (tags[t].title === "New") {
            // console.log("got a new::::")
            newones = [...newones, g[i]];
          }

          if (tags[t].title === "Trending") {
            // console.log("got a trending::::")
            trending = [...trending, g[i]];
          }
        }
        console.log("recommends temp check:::", recommends);
      }

      setRecommendedList(recommends);
      setNewList(newones);
      setTrendingList(trending);

      console.log("OG FINAL recommend::::::", recommendedList);
      setFetching(false);
    }
  };

  if (fetching) {
    return (
      <>
        {error ? (
          <div className="TypesMain">
            <h4 className="H4Group">
              Connection failed! &nbsp;&nbsp;{" "}
              <button onClick={() => setReload(!reload)}> Retry</button>
            </h4>
          </div>
        ) : (
          <div className="TypesMain">
            <h4 id="loaderhome"> </h4>
          </div>
        )}
      </>
    );
  }
  // function handlePageClick({ selected: selectedPage }) {
  //   setCurrentPage(selectedPage);
  // }

  return (
    <div className="TypesMain">
      <h4 className="H4GroupMaster">MOVIES / TV SERIES</h4>
      {/* <Carousel />
      <Container /> */}
      <Recommended data={recommendedList} />
      <New data={newList} />
      <Trending data={trendingList} />

      <div>
        {!fetching && (
          <ReactPaginate
            pageCount={Math.ceil(otherList.count / 16)}
            pageRangeDisplayed={7}
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            onPageChange={(e) =>
              dispatch({ type: currentPageHomeAction, payload: e.selected + 1 })
            }
            marginPagesDisplayed={1}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            containerClassName={"pagination"}
            activeClassName={"active"}
            // subContainerClassName={'pages pagination'}
            forcePage={currentPageHome - 1}
          />
        )}
      </div>
    </div>
  );
};

const Carousel = (props) => {
  return (
    <div className="wrapper">
      <input checked type="radio" name="slider" id="slide1" />
      <input type="radio" name="slider" id="slide2" />
      <input type="radio" name="slider" id="slide3" />
      <input type="radio" name="slider" id="slide4" />
      <input type="radio" name="slider" id="slide5" />

      <div className="slider-wrapper">
        <div className="inner">
          <article>
            <div className="info top-left">
              <h3>Malacca</h3>
            </div>
            <img src="http://127.0.0.1:8000/static/1.jpg" />
          </article>

          <article>
            <div className="info bottom-left">
              <h3>Nubra Valley</h3>
            </div>
            <img src="http://127.0.0.1:8000/static/2.jpg" />
          </article>
        </div>
        {/* <!-- .inner --> */}
      </div>
      {/* <!-- .slider-wrapper --> */}

      <div className="slider-prev-next-control">
        <label htmlFor="slide1"></label>
        <label htmlFor="slide2"></label>
        <label htmlFor="slide3"></label>
        <label htmlFor="slide4"></label>
        <label htmlFor="slide5"></label>
      </div>
      {/* <!-- .slider-prev-next-control --> */}

      <div className="slider-dot-control">
        <label htmlFor="slide1"></label>
        <label htmlFor="slide2"></label>
        <label htmlFor="slide3"></label>
        <label htmlFor="slide4"></label>
        <label htmlFor="slide5"></label>
      </div>
      {/* <!-- .slider-dot-control --> */}
    </div>
  );
};

const Container = (props) => {
  return (
    <div className="Container">
      <div className="Wrap">
        <img src="/images/viewers-disney.png" alt="" />
        <video autoPlay={true} loop={true} playsInline={true}>
          <source src="/videos/1564674844-disney.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="Wrap">
        <img src="/images/viewers-pixar.png" alt="" />
        <video autoPlay={true} loop={true} playsInline={true}>
          <source src="/videos/1564676714-pixar.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="Wrap">
        <img src="/images/viewers-marvel.png" alt="" />
        <video autoPlay={true} loop={true} playsInline={true}>
          <source src="/videos/1564676115-marvel.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="Wrap">
        <img src="/images/viewers-starwars.png" alt="" />
        <video autoPlay={true} loop={true} playsInline={true}>
          <source src="/videos/1608229455-star-wars.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="Wrap">
        <img src="/images/viewers-national.png" alt="" />
        <video autoPlay={true} loop={true} playsInline={true}>
          <source
            src="/videos/1564676296-national-geographic.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
};

const Recommended = (props) => {
  console.log("Recommended-movies home:::", props);
  if (props.data) {
    if (props.data.length === 0) {
      return <div className="H4Group">..</div>;
    }
    return (
      <div className="Recommended">
        <h4 className="H4Group">Recommended For You</h4>
        <div className="RecommendedContent">
          {props.data.map((item, key) => (
            <div className="RecommendedWrap" key={key}>
              <Link to={`/detail/` + item.core_type + "/" + item.slug}>
                <img
                  src={LOCAL_CHECK ? item.cover : item.cover_url}
                  alt={item.title}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};
const New = (props) => {
  if (props.data) {
    if (props.data.length === 0) {
      return <div className="H4Group">..</div>;
    }
    return (
      <div className="New">
        <h4 className="H4Group">New to iHype+</h4>
        <div className="NewContent">
          {props.data.map((item, key) => (
            <div className="NewWrap" key={key}>
              <Link to={`/detail/` + item.core_type + "/" + item.slug}>
                <img
                  src={LOCAL_CHECK ? item.cover : item.cover_url}
                  alt={item.title}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

const Trending = (props) => {
  if (props.data) {
    if (props.data.length === 0) {
      return <div className="H4Group">..</div>;
    }
    return (
      <div className="Trending">
        <h4 className="H4Group">Trending</h4>
        <div className="TrendingContent">
          {props.data.map((item, key) => (
            <div className="TrendingWrap" key={key}>
              <Link to={`/detail/` + item.core_type + "/" + item.slug}>
                <img
                  src={LOCAL_CHECK ? item.cover : item.cover_url}
                  alt={item.title}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

const Original = (props) => {
  return (
    <div className="Original">
      <h4 className="H4Group">Originals</h4>
      <div className="OriginalContent">
        <div className="OriginalWrap"></div>
      </div>
    </div>
  );
};

export default Home;
