import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import CartButtons from "./CartButtons";
import { FaTimes } from "react-icons/fa";
import { links } from "../utils/constants";
import { useProductsContext } from "../context/products_context";
import { useUserContext } from "../context/user_context";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useProductsContext();

  return (
    <SidebarContainer>
      <aside
        className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}
      >
        {/*Sidebar Header */}
        <div className="sidebar-header">
          <img src={logo} alt="woodstock" className="logo" />
          <button type="button" className="close-btn">
            <FaTimes onClick={closeSidebar} />
          </button>
        </div>
        {/*Menu Items w/ Checkout*/}
        <ul className="links">
          {links.map((link) => {
            const { id, text, url } = link;
            return (
              <li key={id}>
                <Link to={url} onClick={closeSidebar}>
                  {text}
                </Link>
              </li>
            );
          })}
          <li>
            <Link to="/checkout" onClick={closeSidebar}>
              checkout
            </Link>
          </li>
        </ul>
        {/*Buttons*/}
        <CartButtons />
      </aside>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  text-align: center;
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }
  .close-btn {
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: var(--clr-primary-5);
    transition: var(--transition);
    cursor: pointer;
    color: var(--clr-red-dark);
    margin-top: 0.2rem;
  }
  .close-btn:hover {
    color: var(--clr-red-light);
  }
  .logo {
    justify-self: center;
    height: 45px;
  }
  img {
    width: 188px;
  }
  .links {
    margin-bottom: 2rem;
  }
  .links a {
    display: block;
    text-align: left;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    color: var(--clr-grey-3);
    transition: var(--transition);
    letter-spacing: var(--spacing);
  }

  .links a:hover {
    padding: 1rem 1.5rem;
    padding-left: 2rem;
    background: var(--clr-grey-10);
    color: var(--clr-grey-2);
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--clr-white);
    transition: var(--transition);
    transform: translate(-100%);
    z-index: -1;
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }
  .cart-btn-wrapper {
    margin: 2rem auto;
  }
  @media screen and (min-width: 992px) {
    .sidebar {
      display: none;
    }
  }
`;

export default Sidebar;