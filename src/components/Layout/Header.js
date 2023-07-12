import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping ,faHouse} from '@fortawesome/free-solid-svg-icons'


const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const icon_s= {
    height:"4.5rem",
    width:"4.5rem",
    lineHeight:"4.5rem",
    fontSize:"2rem",
    background:"rgb(236 236 236)",
    color:"#130f40",
    borderRadius:".5rem",
    marginLeft:".3rem",
    cursor:"pointer",
    textAlign:"center",
  };
  const logo={
    background:"#3a825a", /* fallback for old browsers */
    background:"-webkit-linear-gradient(to right, #3a825a, #6ed449)", /* Chrome 10-25, Safari 5.1-6 */
    background:"linear-gradient(to right, #3a825a, #6ed449)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    "-webkit-background-clip": "text",
    "background-clip": "text",
    "color": "transparent",
    fontFamily:" Playfair Display",
    marginTop:"29px",
    
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01" style={{height:"64px"}}>
            <Link to="/" className="navbar-brand">
               <h1 style={logo}>Scan&eat</h1> 
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <div style={{display:"flex"}}>
              <li className="nav-item" style={{"marginTop":"20px"}}>
                <NavLink to="/home" className="nav-link" style={icon_s} >
                <FontAwesomeIcon icon={faHouse} style={{fontSize:"large"}} />
                </NavLink>
              </li>
              <li className="nav-item" style={{"marginTop":"20px"}}>
                <NavLink to="/cart" className="nav-link" style={icon_s}>
                <Badge count={cart?.reduce((total, item) => total + item.quantity, 0)} showZero offset={[10, -5]}>
                  <FontAwesomeIcon icon={faCartShopping} fa-10x style={{fontSize:"large"}}/>            
                        </Badge>
                </NavLink>
              </li>
              </div>
              <div className="fas-fa-search"></div>
              <li className="nav-item dropdown" style={{"marginTop":"26px"}}>
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li >
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li >
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth?.user ? (
                <>
                  <li className="nav-item" style={{"marginTop":"27px"}}>
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item" style={{"marginTop":"27px"}}>
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown" style={{"marginTop":"27px"}}>
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
 {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        > 
                          Dashboard
                        </NavLink>
                      </li>
                      <li >
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              
             
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
