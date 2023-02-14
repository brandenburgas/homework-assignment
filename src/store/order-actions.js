import { orderActions, packagesActions, localeActions } from "./index";

export const getInitialData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const responseGeo = await fetch("http://ipapi.co/json/");
      const responseVAT = await fetch(
        "https://run.mocky.io/v3/208cbd1e-0d11-4b3e-b54e-5f17a2b46012"
      );
      const responsePackages = await fetch(
        "https://run.mocky.io/v3/d6338d9d-a4ce-4054-9781-c0f0cfe2392d"
      );

      if (!responseGeo.ok || !responseVAT.ok || !responsePackages.ok) {
        throw new Error("Error loading the data.");
      }
      const locationData = await responseGeo.json();
      const currency = locationData.currency;
      const vatData = await responseVAT.json();
      const packageData = await responsePackages.json();

      let { countryCode, rate } = vatData.find(
        (country) => locationData.country.toLowerCase() === country.countryCode
      );

      if (!countryCode || !rate) {
        countryCode = "";
        rate = 0;
      }

      return { packageData, countryCode, rate, currency };
    };

    try {
      const {
        packageData,
        countryCode,
        rate,
        currency = "EUR",
      } = await fetchData();

      dispatch(
        orderActions.initializeData({
          countryCode: countryCode,
          rate: rate,
          currency: currency,
        })
      );

      dispatch(packagesActions.loadPackages(packageData));

      const userLocale = navigator.language ? navigator.language : "en-EU";
      dispatch(localeActions.getLocaleInfo(userLocale));
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendOrderData = (order) => {
  const sendData = async () => {
    const response = await fetch(
      "https://react-http-2156a-default-rtdb.europe-west1.firebasedatabase.app/cVhomework.json",
      {
        method: "POST",
        body: JSON.stringify(order),
      }
    );
    if (!response.ok) {
      throw new Error("Posting data has failed");
    }
  };

  try {
    sendData();
  } catch (error) {
    console.log(error);
  }
};
