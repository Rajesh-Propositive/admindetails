import React, { useState } from "react";
import Ticker from "react-ticker";
import PageVisibility from "react-page-visibility";
import TickerHome from "./TickerHome";

const MoveStuffAround = () => {
  const [pageIsVisible, setPageIsVisible] = useState(true);

  const handleVisibilityChange = (isVisible) => {
    setPageIsVisible(isVisible);
  };
  return (
    <PageVisibility onChange={handleVisibilityChange}>
      {pageIsVisible && (
        <Ticker>
          {({ index }) => (
            <>
              <TickerHome />
              {/* <h1>This is the Headline of element #{index}!</h1>
                <img src="https://www.freelogodesign.org/file/app/client/thumb/35655591-d8b9-4462-9caf-b0a1a3ab2baf_200x200.png" alt=""/> */}
            </>
          )}
        </Ticker>
      )}
    </PageVisibility>
  );
};

export default MoveStuffAround;
