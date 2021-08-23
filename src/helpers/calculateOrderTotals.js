const calculateOrderTotals = (
  activeOrder,
  cgst,
  sgst,
  otherCharges,
  discount
) => {
  let itemsTotal = 0;
  let cgstCharges = 0;

  let sgstCharges = 0;
  let grandTotal = 0;
  let grandTotalWithoutDiscount = 0;

  let tablePrice = 0;
  let taxTotal = 0;

  if (activeOrder?.items) {
    activeOrder?.items.forEach((item) => {
      itemsTotal += item.itemTotal;
    });

    cgstCharges = (itemsTotal * cgst) / 100;

    sgstCharges = (itemsTotal * sgst) / 100;
    tablePrice = activeOrder.tablePrice;
  }
  grandTotal =
    itemsTotal +
    cgstCharges +
    sgstCharges +
    tablePrice +
    parseFloat(otherCharges || 0) -
    parseFloat(discount || 0);

  grandTotalWithoutDiscount =
    itemsTotal +
    cgstCharges +
    sgstCharges +
    tablePrice +
    parseFloat(otherCharges || 0);

  taxTotal = parseFloat(cgstCharges + sgstCharges);
  return {
    itemsTotal,
    cgstCharges,
    sgstCharges,
    otherCharges,
    taxTotal,
    discount,
    tablePrice,
    refId: activeOrder?.refId,
    grandTotal: Math.ceil(grandTotal),
    grandTotalWithoutDiscount: grandTotalWithoutDiscount.toFixed(2),
    cgst,
    sgst,
  };
};
export default calculateOrderTotals;
