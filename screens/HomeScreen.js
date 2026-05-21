import React, {
  useEffect,
  useState,
  useMemo,
} from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from "react-native";

// IMPORTAR API
import {
  getCountries,
} from "../services/api";


// ==========================
// COMPONENTE PRINCIPAL
// ==========================

export default function HomeScreen({
  navigation,
}) {

  // ==========================
  // STATES
  // ==========================

  const [countries, setCountries] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);


  // ==========================
  // CARGAR PAÍSES
  // ==========================

  useEffect(() => {

    const fetchCountries =
      async () => {

        try {

          setLoading(true);

          setError(null);

          const data =
            await getCountries();

          setCountries(data);

        } catch (err) {

          console.log(err);

          setError(
            "No se pudieron cargar los países"
          );

        } finally {

          setLoading(false);
        }
      };

    fetchCountries();

  }, []);


  // ==========================
  // FILTRAR PAÍSES
  // ==========================

  const filteredCountries =
    useMemo(() => {

      return countries.filter(
        (country) => {

          const commonName =
            country?.name?.common ||
            "";

          const officialName =
            country?.name?.official ||
            "";

          const spanishName =
            country?.translations?.spa
              ?.common || "";

          const searchText =
            search.toLowerCase();

          return (

            commonName
              .toLowerCase()
              .includes(
                searchText
              ) ||

            officialName
              .toLowerCase()
              .includes(
                searchText
              ) ||

            spanishName
              .toLowerCase()
              .includes(
                searchText
              )
          );
        }
      );

    }, [search, countries]);


  // ==========================
  // LOADING
  // ==========================

  if (loading) {

    return (

      <View style={styles.center}>

        <ActivityIndicator
          size="large"
          color="#C9A84C"
        />

        <Text style={styles.loadingText}>
          Cargando países...
        </Text>

      </View>
    );
  }


  // ==========================
  // ERROR
  // ==========================

  if (error) {

    return (

      <View style={styles.center}>

        <Text style={styles.errorText}>
          {error}
        </Text>

      </View>
    );
  }


  // ==========================
  // ITEM PAÍS
  // ==========================

  const renderCountry = ({
    item,
  }) => {

    return (

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => {

          navigation.navigate(
            "DetailsScreen",
            {
              country: item,
            }
          );
        }}
      >

        {/* BANDERA */}

        <Text style={styles.flag}>
          {item.flag || "🏳️"}
        </Text>


        {/* INFO */}

        <View style={styles.info}>

          <Text
            style={styles.name}
            numberOfLines={1}
          >
            {item.name.common}
          </Text>

          <Text
            style={styles.region}
          >
            {item.region || "—"}
          </Text>

        </View>

      </TouchableOpacity>
    );
  };


  // ==========================
  // UI
  // ==========================

  return (

    <View style={styles.container}>

      {/* TÍTULO */}

      <Text style={styles.title}>
        🌍 Países del Mundo
      </Text>


      {/* CONTADOR */}

      <Text style={styles.count}>
        {filteredCountries.length} países
      </Text>


      {/* BUSCADOR */}

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar país..."
        placeholderTextColor="#777"
        selectionColor="#C9A84C"
        cursorColor="#C9A84C"
        value={search}
        onChangeText={setSearch}
      />


      {/* LISTA */}

      <FlatList
        data={filteredCountries}
        keyExtractor={(
          item,
          index
        ) =>
          item?.cca3
            ? item.cca3
            : index.toString()
        }
        renderItem={renderCountry}
        showsVerticalScrollIndicator={
          false
        }
        initialNumToRender={15}
        maxToRenderPerBatch={15}
        windowSize={10}
        removeClippedSubviews={
          false
        }
        keyboardShouldPersistTaps="handled"
        ItemSeparatorComponent={() => (
          <View
            style={{ height: 2 }}
          />
        )}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      />

    </View>
  );
}


// ==========================
// ESTILOS
// ==========================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#09090D",
    paddingHorizontal: 16,
    paddingTop: 55,
  },

  title: {
    color: "#F0EBE0",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 6,
    textAlign: "center",
  },

  count: {
    color: "#6B6B86",
    textAlign: "center",
    marginBottom: 15,
  },

  searchInput: {
    backgroundColor: "#111118",
    borderWidth: 1,
    borderColor: "#252535",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: "#fff",
    marginBottom: 15,
    fontSize: 15,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor:
      "rgba(17,17,24,0.92)",

    borderWidth: 1,
    borderColor: "#252535",

    borderRadius: 16,

    padding: 14,

    marginBottom: 12,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.25,

    shadowRadius: 6,

    elevation: 5,
  },

  flag: {
    fontSize: 34,
    marginRight: 14,
  },

  info: {
    flex: 1,
  },

  name: {
    color: "#F0EBE0",
    fontSize: 17,
    fontWeight: "700",
  },

  region: {
    color: "#6B6B86",
    fontSize: 13,
    marginTop: 4,
  },

  center: {
    flex: 1,
    backgroundColor: "#09090D",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  loadingText: {
    color: "#C9A84C",
    marginTop: 12,
    fontSize: 14,
  },

  errorText: {
    color: "#F87171",
    fontSize: 14,
    textAlign: "center",
  },

});