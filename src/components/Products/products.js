import React, { useState, useEffect, useCallback } from "react";
import ListItem from "./ListItems/ListItem";
import axios from "axios";
import Loader from "../UI/Loader";
import { useParams, useHistory, useLocation } from "react-router-dom";

function Products({ onAddItem, onRemoveItem, eventState }) {
  const [items, setItems] = useState([]);
  const [loader, setLoader] = useState(true);
  const params = useParams();
  const history = useHistory();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search).get("search");

  const handleAddItem = useCallback(
    (id) => {
      let data = [...items];
      let index = data.findIndex((i) => i.id === id);
      data[index].quantity += 1;
      setItems([...data]);
      onAddItem(data[index]);
    },
    [items, onAddItem]
  );

  const handleRemoveItem = useCallback(
    (id) => {
      let data = [...items];
      let index = data.findIndex((i) => i.id === id);
      if (data[index].quantity !== 0) {
        data[index].quantity -= 1;
        setItems([...data]);
        onRemoveItem(data[index]);
      }
    },
    [items, onRemoveItem]
  );

  useEffect(() => {
    async function fetchItems() {
      try {
        let slug = `items.json`;
        if (params.category) {
          slug = `items-${params.category}.json`;
        }
        if (queryParams) {
          slug += `?search=${queryParams}`;
        }
        const apiUrl = `https://react-guide-2023-6dd0d-default-rtdb.firebaseio.com/${slug}`;
        console.log("API URL:", apiUrl); // Log the formed URL for debugging

        const response = await axios.get(apiUrl);
        const data = response.data;

        const handleNotFound = () => {
          history.push("/404");
        };

        if (!data) {
          handleNotFound();
          return;
        }

        const transformedData = data.map((item, index) => ({
          ...item,
          quantity: 0,
          id: index,
        }));

        setItems(transformedData);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.error("Error fetching data:", error);
      }
    }

    fetchItems();

    return () => {
      setItems([]);
      setLoader(true);
    };
  }, [params.category, history, queryParams]);

  useEffect(() => {
    if (eventState.id > -1) {
      if (eventState.type === 1) {
        handleAddItem(eventState.id);
      } else if (eventState.type === -1) {
        handleRemoveItem(eventState.id);
      }
    }
  }, [eventState.id, eventState.type, handleAddItem, handleRemoveItem]);

  const updateItemTitle = async (itemId) => {
    console.log(`Item with id : ${itemId}`);
    try {
      let title = `Update title #Item - ${itemId}`;
      await axios.patch(
        `https://react-guide-2023-6dd0d-default-rtdb.firebaseio.com/items/${itemId}.json`,
        {
          title: title,
        }
      );
      let data = [...items];
      let index = data.findIndex((e) => e.id === itemId);
      data[index]["title"] = title;
      setItems(data);
    } catch (error) {
      console.log("Error Updating the data!");
    }
  };

  return (
    <>
      <div className="product-list">
        <div className="product-list--wrapper">
          {items.map((item) => (
            <ListItem
              onAdd={handleAddItem}
              onRemove={handleRemoveItem}
              key={item.id}
              data={item}
              updateItemTitle={updateItemTitle}
            />
          ))}
        </div>
      </div>
      {loader && <Loader />}
    </>
  );
}

export default Products;
