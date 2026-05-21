// services/api.js

export const getCountries = async () => {

  try {

    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,translations,capital,population,region,subregion,languages,flag,capitalInfo,cca3"
    );

    if (!response.ok) {

      throw new Error(
        "Error al cargar países"
      );
    }

    const data =
      await response.json();

    // VALIDAR DATOS

    const validCountries =
      data.filter(
        (country) =>
          country &&
          country.name &&
          country.name.common
      );

    // ORDENAR

    const sorted =
      validCountries.sort(
        (a, b) =>
          a.name.common.localeCompare(
            b.name.common,
            "es",
            {
              sensitivity: "base",
            }
          )
      );

    return sorted;

  } catch (error) {

    console.log(error);

    throw error;
  }
};