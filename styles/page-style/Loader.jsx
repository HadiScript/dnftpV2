import React from "react";
import styled from "styled-components";
const Screen = styled.div``;
const Balls = styled.div`
  display: flex;
  position: absolute;

  transform: translate(-50%, -50%);

  .ball {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: #8364e2;
    margin: 0 6px 0 0;
    animation: oscillate 0.7s ease-in forwards infinite;
  }

  .one {
    animation-delay: 0.5s;
  }
  .two {
    animation-delay: 1s;
  }
  .three {
    animation-delay: 2s;
  }

  @keyframes oscillate {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(20px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const Loader = () => {
  return (
    <Screen>
      <Balls>
        <div className="ball one"></div>
        <div className="ball two"></div>
        <div className="ball three"></div>
      </Balls>
    </Screen>
  );
};

export default Loader;
