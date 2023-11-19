import axios from "axios";
export const addItemHandler = (item) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        item: item,
      },
    });
  };
};

export const removeItemHandler = (id) => {
  return (dispatch) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: {
        id: id,
      },
    });
  };
};

export const clearCartHandler = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_CART",
    });
  };
};

export const placeOrderHandler = (callback) => {
  return async (dispatch, getState) => {
    try {
      const { auth, cart } = getState();
      if (!auth.idToken) {
        return callback({
          error: true,
          data: {
            error: "Please login to place the order",
          },
        });
      }

      const response = await axios.post(
        `https://react-guide-2023-6dd0d-default-rtdb.firebaseio.com/orders/${auth.localId}.json?auth=${auth.idToken}`,
        {
          ...cart,
        }
      );

      dispatch({
        type: "CLEAR_CART",
      });

      callback({ error: false, data: response.data });
    } catch (error) {
      console.error("Order placement error:", error);
      callback({
        error: true,
        data: {
          message:
            "Error occurred while placing the order. Please try again later.",
        },
      });
    }
  };
};
