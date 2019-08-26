const BookingPageClass = require("./bookingPO");
const booking = new BookingPageClass();

describe("Booking site test", () => {
  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get("https://www.booking.com");
    await booking.setCity("New York");
    await booking.setDates();
    await booking.startSearch();
  });

  it("To check whether there is at least 1 result ", () => {
    expect(booking.isFoundHotels()).toBe(true);
    
  });


  it("To check all results are from New York ", () => {
    
    expect(booking.checkAllHotelsHasCityInAddress('New York')).toBe(true);
  });
 
});
