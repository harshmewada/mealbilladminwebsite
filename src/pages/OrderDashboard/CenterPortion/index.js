import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activateTable,
  pushItemToActiveTable,
} from "../../../redux/action/orderActions";
import AvailableItemsList from "./AvailableItemsList";
import ItemCategorySelector from "./ItemCategorySelector";
import SearchItemSelector from "./SearchItemSelector";

const CenterPortion = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  const [searchItemQuery, setSearchItemQuery] = React.useState();

  const { allItems, activeTables, activeTable } = useSelector(
    (state) => state.order
  );

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
        return item.categoryId == selectedCategory;
      });
    }
  };

  const handleCategoryTypeFilter = (typeId) => {
    setSelectedCategory(typeId);
  };

  const handleSearch = (value) => {
    setSearchItemQuery(value);
  };

  const handleItemClick = (item, index) => {
    if (activeTable || activeTable === 0) {
      dispatch(pushItemToActiveTable(item, index));
    } else {
      alert("No Tables Active");
    }
  };

  return (
    <div class="col-md-6" style={{ padding: " 6px " }}>
      <div class="card">
        <div class="card-body" style={{ padding: "10px" }}>
          <div class="row">
            <ItemCategorySelector
              selected={selectedCategory}
              setSelected={handleCategoryTypeFilter}
            />
            <SearchItemSelector
              searchQuery={searchItemQuery}
              handleSearch={handleSearch}
            />
            <AvailableItemsList
              items={getFilteredCategoryItems()}
              onItemClick={handleItemClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterPortion;
