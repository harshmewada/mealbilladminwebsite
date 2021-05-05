import React from "react";
import NoDataContainer from "../../../components/common/NoDataContainer";
import { Curreny, RootUrl } from "../../../redux/types";

const styles = {
  root: { height: "100%", overflowY: "auto", overflowX: "hidden" },
  container: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",

    width: "100%",
    flexWrap: "wrap",
    // height: "100%",
    overflowY: "auto",
  },
  itemcard: {
    width: "20%",
    padding: "0% 1%",
    height: 150,
    cursor: "cell",
    userSelect: "none",
  },
  image: {
    height: 80,
  },
  body: {
    padding: "2px 5px",
    textAlign: "center",
  },
};
const AvailableItemsList = ({ items, onItemClick }) => {
  return (
    <div style={styles.container}>
      {items.length === 0 && (
        <NoDataContainer
          title="No Items Available"
          subTitle=" Please add some items"
        />
      )}
      {items.map((item, index) => {
        return (
          <div
            style={styles.itemcard}
            onClick={() => {
              onItemClick(item, index);
            }}
          >
            <div class="card border shadow-none order-item-card">
              <img
                class="card-img-top"
                style={styles.image}
                src={`${RootUrl}/${item.itemImage}`}
                alt="Card image cap"
              />
              <div style={styles.body}>
                <h6 class="card-title mb-0">{item.itemName}</h6>
                <p class="card-text">
                  Price : {Curreny}
                  {item.itemPrice}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AvailableItemsList;
