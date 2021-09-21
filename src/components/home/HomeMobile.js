import { makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
// import HomeMob from "./HomeMob";
import MoveStuffAround from "./MoveStuffAround";

const useStyles = makeStyles((theme) => ({
  cateImg: {
    maxWidth: "100%"
  },
  eachcate: {
    marginBottom: "10px"
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
function HomeMobile() {
  const classes = useStyles();
  return (
    <div>
      <MoveStuffAround />
      {/* {shopcate.map((cate) => (
        <div className={classes.eachcate} key={cate.img}>
          <Link to={`/category/${cate.query}`}>
            <img className={classes.cateImg} src={cate.img} alt={cate.query} />
          </Link>
        </div>
      ))} */}
    </div>
  );
}

export default HomeMobile;
