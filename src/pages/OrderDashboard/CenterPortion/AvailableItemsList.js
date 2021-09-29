import React from "react";
import VariantSelectorModal from "../../../components/common/Modals/VariantSelectorModal";
import NoDataContainer from "../../../components/common/NoDataContainer";
import { CURRENCY } from "../../../contants";
import { RootUrl } from "../../../redux/types";

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
  variantsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  subvariantsContainer: {
    padding: "2px 5px",
    cursor: "cell",
    textAlign: "center",
  },
  paragraph: {
    textTransform: "uppercase",
  },
};
const AvailableItemsList = ({ items, onItemClick, onVariantClick }) => {
  const [variantsItem, setVariantsItem] = React.useState();

  const handleVariantClick = (variant, item) => {
    // delete item.variants;
    onVariantClick({
      ...item,
      ...variant,
      isVariant: true,
      itemName: `${item.itemName} ${variant.itemName}`,
    });
  };
  const renderItemCard = (item, index) => {
    if (item?.variants && item.variants.length > 0) {
      return (
        <div
          style={{ ...styles.itemcard, cursor: "pointer" }}
          onClick={() => setVariantsItem(item)}
        >
          <div class="card border shadow-none ">
            <img
              class="card-img-top"
              style={styles.image}
              src={`${RootUrl}/${item.itemImage}`}
              alt="Card image cap"
            />
            <div style={styles.body}>
              <h6 class="card-title mb-0">{item.itemName}</h6>
              <p class="card-text" onClick={() => setVariantsItem(item)}>
                Variants
              </p>
              {/* {item.variants?.map((variant, varindex) => {
                  return (
                    <div
                      style={styles.subvariantsContainer}
                      className="order-item-card"
                      onClick={() => {
                        handleVariantClick(variant, item, varindex, index);
                      }}
                    >
                      <p class="card-text" style={styles.paragraph}>
                        {variant.itemName} {CURRENCY}
                        {variant.itemPrice}
                      </p>
                    </div>
                  );
                })} */}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        style={styles.itemcard}
        onClick={() => {
          onItemClick(item);
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
              Price : {CURRENCY}
              {item.itemPrice}
            </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div style={styles.container}>
      <VariantSelectorModal
        open={Boolean(variantsItem)}
        onClose={() => setVariantsItem()}
        title={variantsItem?.itemName}
        variants={variantsItem?.variants || []}
        onVariantClick={(variant) => handleVariantClick(variant, variantsItem)}
      />

      {items.length === 0 && (
        <NoDataContainer
          title="No Items Available"
          subTitle=" Please add some items"
        />
      )}
      {items.map((item, index) => renderItemCard(item, index))}
    </div>
  );
};

export default AvailableItemsList;
