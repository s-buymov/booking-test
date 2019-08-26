class BookingPage {
  constructor() {
    this.cityInput = element(by.id("ss"));
    this.calendar = element(by.className("xp__dates-inner xp__dates__checkin"));
    this.getDateElementByAttribute = attr =>
      element(by.css('td[data-date="' + attr + '"]'));
    this.startSearchButton = element(by.buttonText("Search"));
    this.hotels = element.all(by.css(".sr_item"));
    this.hotelsAddress = element.all(by.css(".sr_card_address_line .bui-link"));
  }

  async setCity(city) {
    await this.cityInput.sendKeys(city);
  }

  async setDates() {
    await this.calendar.click();
    const today = new Date();
    const endDateMs = new Date().setDate(new Date().getDate() + 7);
    const endDate = new Date(endDateMs);
    const todayDateAttr = this.getDateAttributeValue(today);
    await this.getDateElementByAttribute(todayDateAttr).click();
    const endDateAttr = this.getDateAttributeValue(endDate);
    await this.getDateElementByAttribute(endDateAttr).click();
  }
  
  getDateAttributeValue(date) {
    return date.toISOString().slice(0, 10);
  }

  async startSearch() {
    await this.startSearchButton.click();
  }

  async isFoundHotels() {
    return await this.hotels.isPresent();
  }

  getHotelsWithCityAddress(city) {
    return this.hotelsAddress.filter(function(elem) {
      return elem.getText().then(function(text) {
        return text.includes(city);
      });
    });
  }

  async checkAllHotelsHasCityInAddress(city) {
    const allHotelsCount = await this.hotelsAddress.count();
    const filteredHotelsCount = await this.getHotelsWithCityAddress(city).count();
    return allHotelsCount === filteredHotelsCount;
  }
}

module.exports = BookingPage;
