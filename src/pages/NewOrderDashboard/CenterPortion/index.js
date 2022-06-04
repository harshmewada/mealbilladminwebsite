import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { pushItemToActiveOrder } from "../../../redux/action/orderActions";
import RightPortion from "../RightPortion";
import AvailableItemsList from "./AvailableItemsList";
import HotKeySelector from "./HotKeySelector";
import ItemCategorySelector from "./ItemCategorySelector";
import KeyboardInputs from "./KeyboardInputs";
import SearchItemSelector from "./SearchItemSelector";

const styles = {
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: "97%",
    width: "100%",
    padding: "10px",
    paddingLeft: 0,
    backgroundColor: "white",
    boxShadow: "0px 2px 4px rgb(31 30 47 / 10%)",
    overflow: "hidden",
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: "10px",
    height: "97%",
    paddingTop: 0,
    paddingBottom: 0,
    overflow: "hidden",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
};

const CenterPortion = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  const [searchItemQuery, setSearchItemQuery] = React.useState();

  const { allItems } = useSelector((state) => state.order);

  const getFilteredCategoryItems = () => {
    if (searchItemQuery) {
      return allItems.filter((item) => {
        return item.itemName
          .toLowerCase()
          .includes(searchItemQuery.toLowerCase());
      });
    }
    if (selectedCategory === "all") {
      return allItems;
    } else {
      return allItems.filter((item) => {
        return item.categoryName === selectedCategory;
      });
    }
  };

  const handleCategoryTypeFilter = (typeId) => {
    setSelectedCategory(typeId);
  };

  const handleSearch = (value) => {
    setSearchItemQuery(value);
  };

  const handleItemClick = (item, isVariant) => {
    // dispatch(pushItemToActiveOrder({ item, isVariant }));
  };
  const handleVariantClick = (item) => {
    handleItemClick(item, true);
  };
  // console.log("all items", allItems);
  return (
    <div style={styles.root}>
      <KeyboardInputs />
      {/* <HotKeySelector
        handleClick={(data) => handleItemClick(data)}
        items={allItems.filter((item) => item.hotKey)}
      /> */}
      <div style={styles.container}>
        <div style={styles.row}>
          <ItemCategorySelector
            selected={selectedCategory}
            setSelected={handleCategoryTypeFilter}
          />
          <SearchItemSelector
            searchQuery={searchItemQuery}
            handleSearch={handleSearch}
          />
        </div>
        <AvailableItemsList
          items={getFilteredCategoryItems()}
          onItemClick={handleItemClick}
          onVariantClick={handleVariantClick}
        />
      </div>
      <RightPortion />
    </div>
  );
};

export default CenterPortion;
