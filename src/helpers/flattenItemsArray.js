const flattentItemsArray = (orderItems) => {
  let emptyItems = [];
  orderItems.forEach((element) => {
    if (element?.variants && element.variants.length > 0) {
      element.variants.forEach((variant) =>
        emptyItems.push({
          ...variant,
          itemName: `${element.itemName} ${variant.itemName}`,
          variantId: variant._id || variant.id,
          hotKey: element.hotKey,
        })
      );
      return;
    } else {
      emptyItems.push(element);
    }
  });
  return emptyItems;
};
export default flattentItemsArray;
