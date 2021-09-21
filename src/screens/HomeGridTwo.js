import React from "react";
import "./homeGrid.css";

function HomeGridTwo() {
  return (
    <div>
      <div className="column-80">
        <div className="column-row align-left">
          <div className="column-50">
            <header className="content-header content-header-large  align-left">
              <h1 style={{ textAlign: "left" }}>
                Medaf <u>CUSTOMIZED </u>Phone Cases
                <br />
              </h1>
            </header>{" "}
            <p>
              MEDAF take it a step further by allowing you to create a custom
              phone case with a picture!
            </p>
            <br />
            <img
              src="https://yegara.com/medaf/demo/img/red3.png"
              alt="arrow start your search here "
            />
            <br />
            <form
              id="form"
              className="form-full-width"
              method="POST"
              action="samsung.php"
            >
              <input name="cid" type="hidden" defaultValue={3516} />
              <div id="file-x" className="form-row">
                <div className="select-style">
                  <i className="fa fa-chevron-down" />
                  <input type="text" readOnly="readonly" />
                  <select
                    onchange="myFunction()"
                    id="form-type"
                    name="new_server"
                    style={{ height: "45px", fontFamily: "Arial, FontAwesome" }}
                  >
                    <option value>Select Model / ስልኮን ይምረጡ </option>
                    <option value={2}>Samsung / ሳምሰንግ</option>
                    <option value={3}>Apple / አፕል</option>
                    <option value={4}>Huawei / ሁዋዌ</option>
                    <option value={5}>Tecno / ቴክኖ</option>
                  </select>
                </div>
              </div>
              <center>
                {" "}
                <img
                  style={{ display: "none" }}
                  id="btnloading"
                  src="https://yegara.com/img/filters-load.gif"
                  alt="loading gif"
                  width="64px"
                  height="64px"
                />{" "}
              </center>
            </form>
            <br />
            <br />
            <i className="fas fa-shield-alt text-color-secondary" /> Permanent
            Printing
            <br />
            <br />
          </div>
          <div className="column-50">
            <img src="https://yegara.com/medaf/demo/img/wed5.png" alt="" />
          </div>
        </div>
      </div>
      <section className="content-row content-row-gray">
        <div className="container">
          <div className="column-row align-center">
            <div className="column-80">
              <div className="column-row ">
                <img src="https://yegara.com/medaf/demo/img/logos.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="content-row ">
        <div className="container">
          <div className="column-row align-center">
            <div className="column-80">
              <div className="column-row ">
                <div className="column-40">
                  <center>
                    {" "}
                    <img
                      src="https://yegara.com/medaf/demo/img/183503_197_156_107_145_6899_mockup.png"
                      alt=""
                      height={500}
                    />
                  </center>
                </div>
                <div className="column-60">
                  <br />
                  <h2>ወይም ዲዛይነሮቻችን ከሰሩት መካከል ይምረጡ </h2>
                  <p>
                    Ideal for those who want to take the first steps in the web
                    hosting industry, existing providers who want to consolidate
                    their existing clients under one account or web designers
                    who want to offer their clients an all-inclusive{" "}
                  </p>
                  <br />
                  <img
                    src="https://yegara.com/medaf/demo/img/custom-arrow.JPG"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeGridTwo;
