/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../actions/auth";
import Cart from "../Cart";
import SearchBox from "../UI/Search";

const Header = () => {
  const history = useHistory();
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <div className="nav-brand">
        <a to="#">
          <span>AmaKart</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-shopping-cart"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="6" cy="19" r="2" />
            <circle cx="17" cy="19" r="2" />
            <path d="M17 17h-11v-14h-2" />
            <path d="M6 5l14 1l-1 7h-13" />
          </svg>
        </a>
      </div>
      <div className="searchBox-container">
        <SearchBox />
      </div>
      {authState && authState.idToken ? (
        <div className="user-actions">
          <button
            title="User Profile"
            className="profile-btn"
            style={{
              width: "20px",
              height: "20px",
              background:
                "url(https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-squares-01/3/30-512.png) no-repeat center",
              gap: "4px",
              backgroundColor: "white",
            }}
          >
            <span className="material-icons"></span>
          </button>
          <button
            onClick={logoutHandler}
            title="Logout"
            className="signout-btn"
            style={{
              width: "20px",
              height: "20px",
              background:
                "url(https://www.svgrepo.com/show/358574/signout.svg) no-repeat center",
              backgroundSize: "cover",
              backgroundColor: "white",
            }}
          >
            <span className="material-icons"></span>
          </button>
        </div>
      ) : (
        <button className="login-btn" onClick={() => history.push("/login")}>
          Login
        </button>
      )}
      <div className="cart-container">
        <Cart />
      </div>
    </header>
  );
};

export default Header;
