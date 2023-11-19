import { useDispatch, useSelector } from "react-redux";
import { checkIsLoggedIn } from "./actions/auth";
import AuthIndex from "./components/Auth";
import Subheader from "./components/Layout/Subheader";
import Header from "./components/Layout/header"; // Correct capitalization
import Products from "./components/Products/products";
import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [eventQueue, setEventQueue] = useState({
    id: "",
    type: "",
  });
  const authState = useSelector((state) => state.auth);
  const handleAddItem = (item) => {
    let items = [...cartItems];
    let index = items.findIndex((i) => i.id === item.id);
    if (index > -1) {
      items[index] = item;
    } else {
      items.push(item);
    }
    setCartItems([...items]);
  };

  const handleRemoveItem = (item) => {
    let items = [...cartItems];
    let index = items.findIndex((i) => i.id === item.id);
    if (items[index].quantity === 0) {
      items.splice(index, 1);
    } else {
      items[index] = item;
    }
    setCartItems([...items]);
  };

  const handleEvenTQueue = (id, type) => {
    console.log({ id, type });
    setEventQueue({
      id,
      type,
    });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkIsLoggedIn(() => {}));
  }, [dispatch]);
  return (
    <div>
      <Header
        count={cartItems.length}
        items={cartItems}
        onHandleEvent={handleEvenTQueue}
      />
      <Subheader />
      <Switch>
        {!authState.idToken && (
          <Route path="/:type(login|signup)" exact>
            <AuthIndex />
          </Route>
        )}
        <Redirect to="/" from="/login" />
        <Redirect to="/" from="/signup" />
        <Route path="/404" exact>
          <h1>Not Found!</h1>
        </Route>
        <Route path="/:category?" exact>
          {" "}
          {/* Specify the path here */}
          <Products
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            eventState={eventQueue}
          />
        </Route>
        <Redirect to="/404" />
      </Switch>
    </div>
  );
};

export default App;
