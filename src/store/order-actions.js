import { orderActions, packagesActions } from "./index";

export const getInitialData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const [responseGeo, responseVAT, responsePackages] = await Promise.all([
        fetch("https://ipapi.co/json/"),
        fetch("https://run.mocky.io/v3/208cbd1e-0d11-4b3e-b54e-5f17a2b46012"),
        fetch("https://run.mocky.io/v3/d6338d9d-a4ce-4054-9781-c0f0cfe2392d"),
      ]);

      if (!responseGeo.ok || !responseVAT.ok || !responsePackages.ok) {
        throw new Error("Error loading the data.");
      }
      const locationData = await responseGeo.json();
      const currency = locationData.currency;
      const vatData = await responseVAT.json();
      const packageData = await responsePackages.json();

      const { countryCode, rate } = vatData.find(
        (country) => locationData.country.toLowerCase() === country.countryCode
      );
      return { packageData, countryCode, rate, currency };
    };

    const { packageData, countryCode, rate, currency } = await fetchData();
    dispatch(
      orderActions.initializeData({
        countryCode: countryCode,
        rate: rate,
        currency: currency,
      })
    );
    dispatch(packagesActions.loadPackages(packageData));
  };
};
