import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useDispatch, useSelector } from "react-redux";
import { pushItemToActiveOrder } from "../../../redux/action/orderActions";

const ListItemSelector = ({ allItems, clearCount, handleSearchAndAddItem }) => {
  const [selectValues, setSelectedValues] = React.useState([]);
  const textField = React.useRef();

  React.useEffect(() => {
    setSelectedValues([]);
  }, [clearCount]);
  return (
    <table class="table table-sm mb-0 ordertable">
      <tbody>
        <tr>
          {/*  <th scope="row">{index + 1}</th> */}
          <td>Search item here : </td>
          <td>{/* {Curreny} {item.itemPrice} */}</td>
          <td>
            <React.Fragment>
              <Typeahead
                //   {...props}
                ref={textField}
                id="rendering-example"
                options={allItems || []}
                placeholder="Search Item By Name and hotkeys"
                labelKey="itemName"
                filterBy={["itemName", "hotKey"]}
                selected={selectValues}
                emptyLabel
                dropup={true}
                flip={true}
                onChange={(selected) => handleSearchAndAddItem(selected)}
                //   autoFocus={true}
                selectHintOnEnter
                renderMenuItemChildren={(child) => <div>{child.itemName}</div>}
                //   renderInput={(data) => <input {...data} />}
              />
            </React.Fragment>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ListItemSelector;

// import React from "react";
// import { Typeahead } from "react-bootstrap-typeahead";
// import "react-bootstrap-typeahead/css/Typeahead.css";
// import { useDispatch, useSelector } from "react-redux";
// import { pushItemToActiveOrder } from "../../../redux/action/orderActions";

// const ListItemSelector = () => {
//   const [selectValues, setSelectedValues] = React.useState([]);
//   const textField = React.useRef();
//   const dispatch = useDispatch();

//   const { activeOrderIndex, selectedOrderTypeId, allItems } = useSelector(
//     (state) => state.order
//   );

//   const handleAddItem = (selected) => {
//     if (selected.length > 0) {
//       const item = selected[0];

//       if (activeOrderIndex || activeOrderIndex === 0) {
//         if (selectedOrderTypeId === 0) {
//           if (activeOrderIndex || activeOrderIndex === 0) {
//             dispatch(pushItemToActiveOrder(item, selectedOrderTypeId));
//           } else {
//             alert("No Tables Active");
//           }
//         } else {
//           dispatch(pushItemToActiveOrder(item, selectedOrderTypeId));
//         }
//         setSelectedValues([]);
//       } else {
//         alert("No Active Order");
//       }
//     } else {
//       setSelectedValues([]);
//     }
//   };

//   return (
//     <table class="table table-sm mb-0 ordertable">
//       <tbody>
//         <tr>
//           {/*  <th scope="row">{index + 1}</th> */}
//           <td>Search item here : </td>
//           <td>{/* {Curreny} {item.itemPrice} */}</td>
//           <td>
//             <React.Fragment>
//               <Typeahead
//                 //   {...props}
//                 ref={textField}
//                 id="rendering-example"
//                 options={allItems || []}
//                 placeholder="Search Item By Name and hotkeys"
//                 labelKey="itemName"
//                 filterBy={["itemName", "hotKey"]}
//                 selected={selectValues}
//                 emptyLabel
//                 dropup={true}
//                 flip={true}
//                 onChange={(selected) => handleAddItem(selected)}
//                 //   autoFocus={true}
//                 selectHintOnEnter
//                 renderMenuItemChildren={(child) => <div>{child.itemName}</div>}
//                 //   renderInput={(data) => <input {...data} />}
//               />
//             </React.Fragment>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   );
// };

// export default ListItemSelector;
