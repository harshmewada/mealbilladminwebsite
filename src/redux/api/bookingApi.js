const bookingApi = {
  GET_ALL_BOOKINGS: `/api/restaurant/bookings`,
  CREATE_BOOKING: "/api/restaurant/bookings/create",
  UPDATE_BOOKING: "/api/restaurant/bookings/update",
  DELETE_BOOKING: `/api/restaurant/bookings/delete`,

  GET_OTP: `/api/restaurant/bookings/sendotp`,

  VERIFY_BOOKING: `/api/restaurant/bookings/verify`,
};
export default bookingApi;
