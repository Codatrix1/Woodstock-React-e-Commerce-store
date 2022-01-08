import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  h3 {
    color: red;
  }
  .article {
    p {
      background: green;
      color: white;
    }
  }
`;

const Testing = () => {
  return (
    <Wrapper>
      <h3>hello world</h3>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
        aspernatur repudiandae a porro expedita dolor nostrum, magnam vel ea
        recusandae repellendus distinctio eaque quae esse reprehenderit corporis
        itaque iure adipisci.
      </p>
      <button>click me</button>
      <div className="article">
        <p>this is the article</p>
      </div>
    </Wrapper>
  );
};

export default Testing;
