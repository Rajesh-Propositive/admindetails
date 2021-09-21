// import React, { useState, useCallback, useEffect } from "react";
// import {
//   makeStyles,
//   Button,
//   Typography,
//   Slider,
//   Grid
// } from "@material-ui/core";
// // import Cropper from "react-cropper";
// // import "cropperjs/dist/cropper.css";
// import Cropper from "react-easy-crop";
// import { getCroppedImg } from "./canvasUtils";
// import ImgDialogs from "./ImgDialogs";
// import { styles } from "./styles";
// import Axios from "../axios";
// import { withStyles } from "@material-ui/core/styles";
// import { Link, useHistory, useLocation, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import { addtoBasket } from "../actions/cartActions";

// function UploadOne({ classes }) {
//   const { id } = useParams();
//   const history = useHistory();
//   const [product, setProduct] = useState({});
//   const [imageSrc, setImageSrc] = useState(null);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
//   const [croppedImage, setCroppedImage] = useState(null);
//   const [zoom, setZoom] = useState(1);
//   const [Quantity, setQuantity] = useState(1);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const dispatch = useDispatch();
//   const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//   }, []);

//   const showCroppedImage = useCallback(async () => {
//     try {
//       const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
//       console.log("donee", { croppedImage });
//       setCroppedImage(croppedImage);
//       window.localStorage.setItem("croppedImage", JSON.stringify(croppedImage));
//       history.push(`/mockup/${id}`);
//     } catch (e) {
//       console.error(e);
//     }
//   }, [imageSrc, croppedAreaPixels]);

//   useEffect(() => {
//     Axios.get(`/products/get/${id}`).then((response) => {
//       setProduct(response.data);
//       console.log(response.data);
//     });
//   }, [id]);
//   const onFileChange = async (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];
//       let imageDataUrl = await readFile(file);

//       setImageSrc(imageDataUrl);
//     }
//   };
//   const onClose = useCallback(() => {
//     setCroppedImage(null);
//   }, []);

//   const onCanel = () => {
//     setImageSrc(null);
//   };
//   const mockImg = product.mockImage;

//   const capture = useCallback(async (id) => {
//     const imageSource = croppedImage;
//     const blob = await fetch(imageSource).then((res) => res.blob());
//     const file = new File([blob], "my_image.png", {
//       type: "image/png",
//       lastModified: new Date()
//     });
//     setCroppedImage(file);
//     dispatch(
//       addtoBasket({
//         product: product._id,
//         ItemName: product.modelName,
//         image: product.image,
//         mockImage: product.mockImage,
//         UnitPrice: product.unitPrice,
//         userImage: croppedImage,
//         Quantity
//       })
//     );
//     history.push(`/cart/${id}`);
//   });
//   const addToBasketHandler = (id) => {
//     const imageSource = croppedImage;
//     const blob = fetch(imageSource).then((res) => res.blob());
//     const file = new File([blob], "my_image.png", {
//       type: "image/png",
//       lastModified: new Date()
//     });
//     setCroppedImage(file);
//     dispatch(
//       addtoBasket({
//         product: product._id,
//         ItemName: product.modelName,
//         image: product.image,
//         mockImage: product.mockImage,
//         UnitPrice: product.unitPrice,
//         cropedPixel: croppedImage,
//         Quantity
//       })
//     );
//     history.push(`/cart/${id}`);
//   };
//   function AddingCart() {
//     return (
//       <>
//         <Grid item xs={6}>
//           <img
//             className={classes.pImage}
//             src={product.image}
//             alt="productImage"
//           />
//         </Grid>

//         <Grid item xs={6}>
//           <Typography style={{ color: "black" }} variant="h5" gutterBottom>
//             {product.modelName} Case
//           </Typography>
//           <Typography style={{ color: "black" }} variant="h6" gutterBottom>
//             Price: {product.unitPrice} ETB
//           </Typography>
//           <Button
//             onClick={capture}
//             style={{ background: "#FFCC33", width: "100%", padding: "15px" }}
//           >
//             Add to Cart{" "}
//           </Button>
//         </Grid>
//       </>
//     );
//   }
//   return (
//     <div>
//       {imageSrc ? (
//         <>
//           <div className={classes.cropContainer}>
//             <Cropper
//               image={imageSrc}
//               crop={crop}
//               zoom={zoom}
//               restrictPosition={false}
//               showGrid={false}
//               aspect={9 / 18.5}
//               onCropChange={setCrop}
//               onZoomChange={setZoom}
//               onCropComplete={onCropComplete}

//               // onInitialized={(instance) => {
//               //   setCropper(instance);
//               // }}
//             />
//           </div>
//           <div className={classes.controls}>
//             <div className={classes.sliderContainer}>
//               <Typography
//                 variant="overline"
//                 classes={{ root: classes.sliderLabel }}
//               >
//                 Zoom
//               </Typography>
//               <Slider
//                 value={zoom}
//                 min={1}
//                 max={3}
//                 step={0.1}
//                 aria-labelledby="Zoom"
//                 classes={{ container: classes.slider }}
//                 onChange={(e, zoom) => setZoom(zoom)}
//               />
//             </div>
//             <Button
//               onClick={showCroppedImage}
//               variant="contained"
//               color="primary"
//               classes={{ root: classes.cropButton }}
//             >
//               Crop
//             </Button>
//             <br />
//             <Button
//               onClick={onCanel}
//               variant="contained"
//               color="primary"
//               classes={{ root: classes.cancelButton }}
//             >
//               Cancel
//             </Button>
//           </div>
//           <ImgDialogs
//             img={croppedImage}
//             onClose={onClose}
//             mockImg={mockImg}
//             AddingCart={AddingCart}
//           />
//         </>
//       ) : (
//         <center>
//           <h1> Upload your Image</h1>
//           <label>
//             <img src="https://i.imgur.com/nhJ3Fw0.png" alt="upload" />
//             <input
//               className={classes.sorce}
//               type="file"
//               onChange={onFileChange}
//               accept="image/*"
//             />
//           </label>
//         </center>
//       )}
//     </div>
//   );
// }
// function readFile(file) {
//   return new Promise((resolve) => {
//     const reader = new FileReader();
//     reader.addEventListener("load", () => resolve(reader.result), false);
//     reader.readAsDataURL(file);
//   });
// }
// export default withStyles(styles)(UploadOne);
