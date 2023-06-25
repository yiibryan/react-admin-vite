import styled from "styled-components";

export const Logo = styled.img`
  height: 50px;
  pointer-events: none;
  
  @media (prefers-reduced-motion: no-preference) {
    animation: App-logo-spin infinite 20s linear;
  }
  
  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  background-color: rgba(255,255,255,0.3);
  display: flex;
  justify-content: space-between;
  color: white;
  z-index: 2;
  padding: 10px 20px;
  
  .user-info{
    padding-top: 8px;
  }
`
