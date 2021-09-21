import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
// import HomeDeals from "./HomeDeals";
// import HomeDeskTopCate from "./HomeDeskTopCate";
// import HomeFeature from "./HomeFeature";
import MoveStuffAround from "./MoveStuffAround";
const useStyles = makeStyles((theme) => ({
  homecar: {
    zIndex: -1,
    marginBottom: "-150px"
    // maskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))"
  },
  main: {
    background: "#EAEDED"
  }
}));
const shopcate = [
  {
    img:
      "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2020/Holiday/GiftGuide/Karu_mHero_GG1_v4_en_US._SX1242_CB417119888_.jpg",
    query: "shoes"
  },
  {
    img:
      "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Karu/2020/May/Hero/Karu_mHero_PC_v2_en_US._SX1242_CB431272285_.jpg",
    query: "shoes"
  },
  {
    img:
      "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Karu/2020/May/Hero/Karu_mHero_Beauty_en_US._SX1242_CB432580417_.jpg",
    query: "face Cream"
  },
  {
    img:
      "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Karu/2020/May/Hero/Karu_mHero_Home_v2_en_US._SX1242_CB431436858_.jpg",
    query: "shirts"
  }
];
const itemCate = [
  {
    img: "https://i.imgur.com/XWgbdID.jpg",
    query: "face Cream"
  },
  {
    img: "https://i.imgur.com/PYw4aHc.jpg",
    query: "shirts"
  },
  {
    img: "https://i.imgur.com/BCclJrA.jpg",
    query: "shoes"
  },
  {
    img: "https://i.imgur.com/XWgbdID.jpg",
    query: "meckup"
  }
  // {
  //   img: "https://i.imgur.com/PYw4aHc.jpg",
  //   query: "brush"
  // },
  // {
  //   img: "https://i.imgur.com/BCclJrA.jpg",
  //   query: "foundation"
  // }
];
function HomeDesktop() {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <div className={classes.homecar}>
        <Carousel
          style={{ maxHight: "200px" }}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
        >
          {shopcate.map((cate) => (
            <div key={cate.img}>
              <Link to={`/category/${cate.query}`}>
                <img src={cate.img} alt={cate.query} />
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
      <Grid
        container
        spacing={1.5}
        style={{
          background: "#EAEDED",
          margin: "0 auto",
          justifyContent: "center",
          alignContent: "center"
        }}
      >
        {itemCate.map((list) => (
          <HomeDeskTopCate key={list.img} list={list} />
        ))}
      </Grid>
      <HomeFeature />
      <HomeDeals />
      <MoveStuffAround />
    </div>
  );
}

export default HomeDesktop;
