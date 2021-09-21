export const styles = (theme) => ({
  cropContainer: {
    position: "relative",
    width: "100%",
    height: 250,
    background: "#333",
    [theme.breakpoints.up("sm")]: {
      height: 400
    }
  },
  sorce: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    overflow: "hidden",
    cursor: "pointer",
    clip: "rect(0,0,0,0)",
    whiteSpace: "nowrap"
  },
  cancelButton: {
    background: "#f6f6f6",
    flexShrink: 0,
    marginLeft: 16,
    color: "black",
    borderRadius: "2px",
    height: "30px",
    border: "1px solid",
    marginTop: "10px",
    cursor: "pointer",
    borderColor: " #a88734 #9c7e31 #846a29"
  },
  cropButton: {
    flexShrink: 0,
    marginLeft: 16,
    background: "#f0c14b",
    borderRadius: "2px",
    height: "30px",
    border: "1px solid",
    marginTop: "10px",
    cursor: "pointer",
    borderColor: " #a88734 #9c7e31 #846a29"
  },
  controls: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "center"
    }
  },
  sliderContainer: {
    display: "flex",
    flex: "1",
    alignItems: "center"
  },
  sliderLabel: {
    [theme.breakpoints.down("xs")]: {
      minWidth: 65
    }
  },
  slider: {
    padding: "22px 0px",
    marginLeft: 16,
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "center",
      margin: "0 16px"
    }
  }
});
