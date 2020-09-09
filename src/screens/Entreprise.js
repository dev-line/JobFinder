import React, { useEffect, useState } from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Entreprises, Offers } from "../Api/OffresList.json";
import Icon from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");

export default function Entreprise({ route, navigation }) {
  const { Name, Logo } = route.params;
  const [Entr, setEntr] = useState({});
  const GetEnreprise = () => {
    return Entreprises.map((entr) => {
      entr.Name == Name ? setEntr(entr) : null;
    });
  };
  const GetOffers = () => {
    const Emplois = Offers.map((data) => {
      const res = data.Emplois;
      return res.map((emp) => {
        return emp.Entreprises.map((ent, id) => {
          return ent.Name == Name ? (
            <View key={id} style={Styles.Offers}>
              <Text style={Styles.Text}>
                <Text style={Styles.SubText}>Offer: </Text> {emp.Postes}
              </Text>
              <Text style={Styles.Text}>
                <Text style={Styles.SubText}>Niveau: </Text> {data.Level}
              </Text>
              <Text style={Styles.Text}>
                <Text style={Styles.SubText}>Salaire: </Text> {ent.Salary}
              </Text>
            </View>
          ) : null;
        });
      });
    });
    return Emplois;
  };
  useEffect(() => {
    GetEnreprise();
    GetOffers();
  }, []);
  return (
    <View style={Styles.Container}>
      <ScrollView>
        <Image source={Logo} style={Styles.Img} resizeMode="stretch" />
        <View style={Styles.Content}>
          <Text style={Styles.SubTitle}>Informations</Text>
          <View style={Styles.Element}>
            <Icon name="phone" size={20} color="gray" style={Styles.Icon} />
            <Text style={Styles.Text}>{Entr.Number}</Text>
          </View>
          <View style={Styles.Element}>
            <Icon name="inbox" size={20} color="gray" style={Styles.Icon} />
            <Text style={Styles.Text}>{Entr.Email}</Text>
          </View>
          <View style={Styles.Element}>
            <Icon name="map" size={20} color="gray" style={Styles.Icon} />
            <Text style={Styles.Text}>{Entr.Address}</Text>
          </View>
          <Text style={Styles.SubTitle}>Offres disponibles</Text>
          <GetOffers />
        </View>
      </ScrollView>
    </View>
  );
}

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
    width,
    height,
    position: "relative",
  },

  Img: {
    width,
    height: 250
  },
  Content: {
    flex: 1,
    top: -20,
    width,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 2,
  },
  Offers: {
    width,
    padding: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    marginBottom: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 2,
  },

  Element: {
    flexDirection: "row",
    height: 60,
    padding: 20,
    alignItems: "center",
    backgroundColor: "white",
    borderBottomColor: "rgba(17,17,17,0.1)",
    borderBottomWidth: 0.3,
  },
  Icon: {
    padding: 10,
  },
  Text: {
    fontSize: 15,
    paddingRight: 30,
  },
  SubText: {
    fontSize: 18,
  },
  SubTitle: {
    fontSize: 20,
    padding: 10,
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 2,

  },
});
