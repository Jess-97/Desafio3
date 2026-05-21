

  // ==========================
// IMPORTACIONES
// ==========================

import React, {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  Animated,
  Easing,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Linking,
  Platform,
} from "react-native";

import MapView, {
  Marker,
} from "react-native-maps";


// ==========================
// API KEY
// ==========================

const OWM_API_KEY =
  "516a2ba70f6ec7564f2876500319b1a2";


// ==========================
// COLORES
// ==========================

const GOLD = "#C9A84C";

const BG = "#09090D";
const BORDER = "#252535";

const TEXT = "#F0EBE0";
const MUTED = "#6B6B86";


// ==========================
// FUNCIONES AUXILIARES
// ==========================

const fmt = (n) =>
  n !== undefined && n !== null
    ? Number(n).toLocaleString("es-ES")
    : "—";

const tempColor = (t) => {

  if (t === null) {
    return "#94A3B8";
  }

  if (t < 5) {
    return "#60A5FA";
  }

  if (t < 20) {
    return "#34D399";
  }

  if (t < 30) {
    return "#FBBF24";
  }

  return "#F87171";
};


// ==========================
// COMPONENTE PRINCIPAL
// ==========================

export default function DetailsScreen({
  route,
}) {

  const country =
    route?.params?.country;

  if (!country) {

    return (

      <View style={styles.center}>

        <Text style={styles.errorText}>
          No se recibieron datos del país
        </Text>

      </View>
    );
  }

  // ==========================
  // DATOS
  // ==========================

  const name =
    country?.name?.common ?? "—";

  const capital =
    country?.capital?.[0] ?? null;

  const lat =
    country?.capitalInfo?.latlng?.[0] ??
    null;

  const lng =
    country?.capitalInfo?.latlng?.[1] ??
    null;

  const population =
    country?.population ?? null;

  const region =
    country?.region ?? "—";

  const subregion =
    country?.subregion ?? "";

  const languages =
    country?.languages
      ? Object.values(
          country.languages
        )
      : [];

  const flagEmoji =
    country?.flag ?? "🏳️";


  // ==========================
  // STATES
  // ==========================

  const [weather, setWeather] =
    useState(null);

  const [wLoading, setWLoading] =
    useState(false);

  const [wError, setWError] =
    useState(null);


  // ==========================
  // ANIMACIONES
  // ==========================

  const fadeAnim = useRef(
    new Animated.Value(0)
  ).current;

  const slideAnim = useRef(
    new Animated.Value(50)
  ).current;

  const pulseAnim = useRef(
    new Animated.Value(1)
  ).current;


  // ==========================
  // EFECTOS
  // ==========================

  useEffect(() => {

    Animated.parallel([

      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 650,
          easing:
            Easing.out(
              Easing.ease
            ),
          useNativeDriver: true,
        }
      ),

      Animated.timing(
        slideAnim,
        {
          toValue: 0,
          duration: 650,
          easing:
            Easing.out(
              Easing.ease
            ),
          useNativeDriver: true,
        }
      ),

    ]).start();

    const pulse = () => {

      Animated.sequence([

        Animated.timing(
          pulseAnim,
          {
            toValue: 1.08,
            duration: 1800,
            easing:
              Easing.inOut(
                Easing.ease
              ),
            useNativeDriver: true,
          }
        ),

        Animated.timing(
          pulseAnim,
          {
            toValue: 1,
            duration: 1800,
            easing:
              Easing.inOut(
                Easing.ease
              ),
            useNativeDriver: true,
          }
        ),

      ]).start(() => pulse());
    };

    pulse();

  }, []);


  // ==========================
  // CLIMA
  // ==========================

  useEffect(() => {

    const loadWeather =
      async () => {

        if (!capital) {

          setWError(
            "No hay capital registrada para este país."
          );

          return;
        }

        setWLoading(true);

        setWError(null);

        try {

          const url =
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            encodeURIComponent(
              capital
            ) +
            "&appid=" +
            OWM_API_KEY +
            "&units=metric&lang=es";

          const res =
            await fetch(url);

          if (!res.ok) {

            throw new Error(
              "HTTP " +
                res.status
            );
          }

          const data =
            await res.json();

          setWeather(data);

        } catch (error) {

          console.log(error);

          setWError(
            "No se pudo obtener el clima."
          );

        } finally {

          setWLoading(false);
        }
      };

    loadWeather();

  }, [capital]);


  // ==========================
  // GOOGLE MAPS
  // ==========================

  const openGoogleMaps = () => {

    if (
      lat === null ||
      lng === null
    ) {
      return;
    }

    Linking.openURL(
      "https://www.google.com/maps?q=" +
        lat +
        "," +
        lng
    );
  };


  // ==========================
  // RENDER CLIMA
  // ==========================

  const renderWeather = () => {

    if (wLoading) {

      return (

        <View style={styles.center}>

          <ActivityIndicator
            size="large"
            color={GOLD}
          />

          <Text style={styles.muteText}>
            Consultando clima...
          </Text>

        </View>
      );
    }

    if (wError) {

      return (

        <View style={styles.center}>

          <Text style={styles.errorText}>
            {wError}
          </Text>

        </View>
      );
    }

    if (!weather) {
      return null;
    }

    const temp =
      weather?.main?.temp ?? null;

    const feels =
      weather?.main?.feels_like ??
      null;

    const humidity =
      weather?.main?.humidity ??
      null;

    const wind =
      weather?.wind?.speed ?? null;

    const desc =
      weather?.weather?.[0]
        ?.description || "";

    return (

      <View style={styles.weatherWrap}>

        <View
          style={[
            styles.tempBox,
            {
              borderColor:
                tempColor(temp),
            },
          ]}
        >

          <Text
            style={[
              styles.tempNum,
              {
                color:
                  tempColor(temp),
              },
            ]}
          >
            {temp !== null
              ? Math.round(temp) +
                "°"
              : "—"}
          </Text>

          <Text style={styles.tempDesc}>
            {desc
              ? desc
                  .charAt(0)
                  .toUpperCase() +
                desc.slice(1)
              : "Sin descripción"}
          </Text>

        </View>

        <View style={styles.wRow}>

          <WStat
            icon="💧"
            label="Humedad"
            value={
              humidity !== null
                ? humidity + "%"
                : "—"
            }
          />

          <WStat
            icon="💨"
            label="Viento"
            value={
              wind !== null
                ? wind + " m/s"
                : "—"
            }
          />

          <WStat
            icon="🌡️"
            label="Sensación"
            value={
              feels !== null
                ? Math.round(
                    feels
                  ) + "°C"
                : "—"
            }
          />

        </View>

      </View>
    );
  };


  // ==========================
  // UI
  // ==========================

  return (

    <View style={styles.root}>

      <ScrollView
        contentContainerStyle={
          styles.scroll
        }
        showsVerticalScrollIndicator={
          false
        }
      >

        {/* HERO */}

        <Animated.View
          style={[
            styles.hero,
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY:
                    slideAnim,
                },
              ],
            },
          ]}
        >

          <Animated.Text
            style={[
              styles.flag,
              {
                transform: [
                  {
                    scale:
                      pulseAnim,
                  },
                ],
              },
            ]}
          >
            {flagEmoji}
          </Animated.Text>

          <Text
            style={styles.countryName}
          >
            {name}
          </Text>

          <Text
            style={styles.capitalLabel}
          >
            {capital
              ? "✦ " +
                capital +
                " ✦"
              : "Sin capital"}
          </Text>

          <Text
            style={styles.regionLabel}
          >
            {region}
            {subregion
              ? " · " +
                subregion
              : ""}
          </Text>

        </Animated.View>


        {/* INFO */}

        <View style={styles.infoCard}>

          <Text style={styles.infoTitle}>
            Información
          </Text>

          <Text style={styles.infoText}>
            👥 Población:{" "}
            {fmt(population)}
          </Text>

          <Text style={styles.infoText}>
            🌎 Región: {region}
          </Text>

          <Text style={styles.infoText}>
            🗣️ Idiomas:{" "}
            {languages.length > 0
              ? languages.join(", ")
              : "—"}
          </Text>

        </View>


        {/* CLIMA */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Clima actual
          </Text>

          {renderWeather()}

        </View>


        {/* MAPA */}

        {lat !== null &&
          lng !== null && (

          <View style={styles.section}>

            <Text style={styles.sectionTitle}>
              Ubicación
            </Text>

            <MapView
              style={styles.map}

              initialRegion={{
                latitude: lat,
                longitude: lng,

                latitudeDelta: 8,
                longitudeDelta: 8,
              }}
            >

              <Marker
                coordinate={{
                  latitude: lat,
                  longitude: lng,
                }}

                title={capital || name}

                description={name}
              />

            </MapView>

          </View>

        )}


        {/* BOTÓN */}

        {lat !== null &&
          lng !== null && (

          <TouchableOpacity
            style={styles.mapBtn}
            activeOpacity={0.8}
            onPress={openGoogleMaps}
          >

            <Text style={styles.mapBtnText}>
              📍 Abrir en Google Maps
            </Text>

          </TouchableOpacity>

        )}

      </ScrollView>

    </View>
  );
}


// ==========================
// COMPONENTE
// ==========================

function WStat({
  icon,
  label,
  value,
}) {

  return (

    <View style={styles.wStat}>

      <Text
        style={{ fontSize: 20 }}
      >
        {icon}
      </Text>

      <Text style={styles.wStatVal}>
        {value}
      </Text>

      <Text style={styles.wStatLbl}>
        {label}
      </Text>

    </View>
  );
}


// ==========================
// ESTILOS
// ==========================

const styles = StyleSheet.create({

  root: {
    flex: 1,
    backgroundColor: "#09090D",
  },

  scroll: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 35,
  },

  hero: {
    alignItems: "center",

    backgroundColor: "#111118",

    borderRadius: 24,

    paddingVertical: 28,
    paddingHorizontal: 20,

    marginBottom: 22,

    borderWidth: 1,

    borderColor: "#1F1F2A",
  },

  flag: {
    fontSize: 74,
    marginBottom: 10,
  },

  countryName: {
    fontFamily:
      Platform.OS === "ios"
        ? "Georgia"
        : "serif",

    fontSize: 30,

    fontWeight: "800",

    color: "#F8F8F8",

    textAlign: "center",
  },

  capitalLabel: {
    marginTop: 10,

    color: "#D4AF37",

    fontSize: 13,

    fontWeight: "700",

    backgroundColor:
      "rgba(212,175,55,0.10)",

    paddingHorizontal: 14,
    paddingVertical: 6,

    borderRadius: 999,
  },

  regionLabel: {
    marginTop: 8,

    color: "#7C7C98",

    fontSize: 12,
  },

  section: {
    marginBottom: 22,
  },

  sectionTitle: {
    color: "#D4AF37",

    fontSize: 18,

    fontWeight: "800",

    marginBottom: 12,
  },

  infoCard: {
    backgroundColor: "#12131A",

    borderRadius: 24,

    padding: 20,

    marginBottom: 24,

    borderWidth: 1,

    borderColor:
      "rgba(212,175,55,0.18)",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 6,
    },

    shadowOpacity: 0.28,

    shadowRadius: 10,

    elevation: 6,
  },

  infoTitle: {
    color: "#FFD166",

    fontSize: 18,

    fontWeight: "800",

    marginBottom: 16,

    letterSpacing: 0.5,
  },

  infoText: {
    color: "#F5F5F5",

    fontSize: 14,

    marginBottom: 12,

    lineHeight: 22,

    backgroundColor:
      "rgba(255,255,255,0.03)",

    paddingVertical: 10,

    paddingHorizontal: 12,

    borderRadius: 14,

    borderWidth: 1,

    borderColor:
      "rgba(255,255,255,0.04)",
  },

  weatherWrap: {
    gap: 10,
  },

  tempBox: {
    borderWidth: 1.5,

    borderRadius: 18,

    padding: 20,

    alignItems: "center",

    backgroundColor: "#111118",
  },

  tempNum: {
    fontSize: 58,

    fontWeight: "800",

    letterSpacing: -2,
  },

  tempDesc: {
    color: TEXT,

    fontSize: 14,

    marginTop: 4,
  },

  wRow: {
    flexDirection: "row",

    gap: 8,
  },

  wStat: {
    flex: 1,

    backgroundColor: "#111118",

    borderRadius: 14,

    borderWidth: 1,

    borderColor: BORDER,

    paddingVertical: 14,

    alignItems: "center",
  },

  wStatVal: {
    color: TEXT,

    fontSize: 15,

    fontWeight: "700",
  },

  wStatLbl: {
    color: MUTED,

    fontSize: 10,
  },

  map: {
    width: "100%",

    height: 230,

    borderRadius: 18,

    borderWidth: 1,

    borderColor: "#252535",

    overflow: "hidden",
  },

  mapBtn: {
    backgroundColor: "#D4AF37",

    borderRadius: 18,

    paddingVertical: 15,

    alignItems: "center",

    marginTop: 5,
  },

  mapBtnText: {
    color: "#09090D",

    fontWeight: "800",

    fontSize: 15,
  },

  center: {
    justifyContent: "center",

    alignItems: "center",

    padding: 20,
  },

  muteText: {
    color: MUTED,

    marginTop: 8,

    textAlign: "center",
  },

  errorText: {
    color: "#F87171",

    textAlign: "center",
  },

});