const itemsApi = {
  GET_RESTAURANT_ITEMS: `/api/restaurant/items`,

  GET_BRANCH_ITEMS: `/api/restaurant/items`,
  CREATE_ITEM: `/api/restaurant/items/create`,
  UPDATE_ITEM: `/api/restaurant/items/update`,

  UPDATE_ITEM_VARIANT: `/api/restaurant/items/variants`,
  UPDATE_ITEM_RAW_MATERIALS: `/api/restaurant/items/rawmaterials`,

  DELETE_ITEM: `/api/restaurant/items/delete`,

  IMPORT_ITEMS: `/api/restaurant/items/import`,

  BULK_UPLOAD_ITEMS: `/api/restaurant/items/bulkupload`,
};
export default itemsApi;
