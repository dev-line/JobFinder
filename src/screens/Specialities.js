import React from "react";
import { Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Specialities } from "../Api/OffresList.json";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function Specilities({ route, navigation }) {
  const { Level } = route.params; // الإعدادات المرسلة إلى الصفحة (المستوى)
  const GetSpec = () => { // دالة البحث عن التخصصات المتوفرة حسب المستوى
    const List = Specialities.filter((data) => data.Level == Level); // عملية الفرز حسب إسم المستوى
    return List.map((Spec, index) => { // دالة الخريكة لقائمة الفرز السابقة الخاصة بالتخصصات
      return ( // عرض قائمة التخصصات
        <TouchableOpacity
          style={styles.Card}
          key={index}
          onPress={() => {
            Submit(Spec.Tree, Level); //إستدعاء دالة الإنتقال حسب قائمة الأعمال و المستوى
          }}
        >
          <Text style={styles.Title}>{Spec.Name}</Text>
        </TouchableOpacity>
      );
    });
  };
  const Submit = (Spec, Level) => { // دالة الإنتقال 
    if(Spec.length == 1){ // إذا كان عدد الأعمال يساوي 1
    navigation.navigate("Results", { Spec: Spec[0], Level })} // ننتقل مباشرة إلى قائمة النتائج الخاصة بنتائج العمل
    else{ // إذا لم يتحقق الشرط 
    navigation.navigate("Offres", { Spec, Level }); // ننتقل إلى صفحة العروض
    }
  };
  // عرض الصفحة كاملة
  return <ScrollView style={styles.container}>
    {/* استدعاء دالة عرض التخصصات */}
    {GetSpec()}
    </ScrollView>;
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: "white",
  },
  Img: {
    width,
    height: height / 2,
    paddingTop: 50,
    position: "relative",
  },
  Card: {
    width,
    height: 80,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    
    elevation: 1,
  },
  Title: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  left: {
    alignItems: "flex-end",
    marginRight: 20,
  },
  center: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
