import React, { useState, useCallback, useEffect } from "react";
import {
  makeStyles,
  Button,
  Typography,
  Slider,
  Grid
} from "@material-ui/core";
import Cropper from "react-easy-crop";
import Cookies from "js-cookie";
import { getCroppedImg } from "./canvasUtils";
import { styles } from "./styles";
import Axios from "../axios";
import { withStyles } from "@material-ui/core/styles";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from 'react-cookie';

function Uploader({ classes }) {
  const [cookies, setCookie] = useCookies(['crpImg']);
  const { id } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState({});
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const dispatch = useDispatch();
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      console.log("donee", { croppedImage });
      // Cookies.setItem("crpImg", croppedImage);
      setCroppedImage(croppedImage);
      setCookie('crpImg', JSON.stringify(croppedImage))
      // window.localStorage.setItem("croppedImage", JSON.stringify(croppedImage));
      history.push(`/mockup/${id}`);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, history, id]);

  useEffect(() => {
    Axios.get(`/products/get/${id}`).then((response) => {
      setProduct(response.data);
      console.log(response.data);
    });
  }, [id]);
  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      setImageSrc(imageDataUrl);
    }
  };
  const onCanel = () => {
    setImageSrc(null);
  };

  return (
    <div>
      {imageSrc ? (
        <>
          <div className={classes.cropContainer}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              restrictPosition={false}
              showGrid={false}
              aspect={9 / 18.5}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}

              // onInitialized={(instance) => {
              //   setCropper(instance);
              // }}
            />
          </div>
          <div className={classes.controls}>
            <div className={classes.sliderContainer}>
              <Typography
                variant="overline"
                classes={{ root: classes.sliderLabel }}
              >
                Zoom
              </Typography>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                classes={{ container: classes.slider }}
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </div>
            <Button
              onClick={showCroppedImage}
              variant="contained"
              color="primary"
              classes={{ root: classes.cropButton }}
            >
              Crop
            </Button>
            <br />
            <Button
              onClick={onCanel}
              variant="contained"
              color="primary"
              classes={{ root: classes.cancelButton }}
            >
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <center>
          <h1> Upload your Image</h1>
          <label>
            <img src="https://i.imgur.com/nhJ3Fw0.png" alt="upload" />
            <input
              className={classes.sorce}
              type="file"
              onChange={onFileChange}
              accept="image/*"
            />
          </label>
        </center>
      )}
    </div>
  );
}
function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export default withStyles(styles)(Uploader);
