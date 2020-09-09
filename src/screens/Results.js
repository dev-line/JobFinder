import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList, // عنصر لعرض قائمة البيانات
  Text,
  Image,
  StyleSheet,
  Dimensions
} from "react-native";
const { width, height } = Dimensions.get("window");

import { TouchableOpacity } from "react-native-gesture-handler";
import { Offers } from "../Api/OffresList.json"; // إسنتةراد جدول العروض من قاعدة البيانات
export default function Results({ route, navigation }) {
  const { Level, Spec } = route.params;
  const [OffersList, setOffersList] = useState([]); // عنصر إدارة الحالة يتغير حسب نتائج البحث
  const GetOffers = () => { // دالة لفرز المؤسسات المتوفرة حسب الإعدادات المرسلة مسبقا
    const List01 = Offers.filter((data) => data.Level == Level); // تعريف ثابت من نوع قائمة يقوم بفرز النتئج حسب المستوى
    const List02 = List01[0].Emplois.filter((data) => data.Postes == Spec); // تعريف ثابت يقوم بفرز قائمة النتائج حسب اسم العرض
    List02.map((data) => { // دالة الخريطة لإضافة النتائج الى عنصر ادارة حالة النتائج
      // تقوم هذه الدالة باضافة قائمة الشركات التي تبحث عن عمال بالمواصفات المدخلة 
      setOffersList([...OffersList, ...data.Entreprises]);
    });
  };
  useEffect(() => { // تقوم هذه الدالة باستدعاء دالة فرز عروض العمل أثناء تحميل الصفحة
    GetOffers();
  }, []);
  const GetInfo = (Name,Logo) => { // دالة لتوجيه المستخدم إلى صفحة معلومات الشركة حسب بإعدادات الإسم و الشعار
    navigation.navigate("Entreprise", { Name,Logo });
  };
  const RenderList = ({ item }) => { // دالة لعرض قائمة النتائج 
    const Logo = GetLogo().find(data=>item.Name == data.Name).Logo // متغير للحصول على شعار الشركة من قائمة الشعارات المعرفة أسفل الصفحة
   return <TouchableOpacity
      style={style.container}
      onPress={() => {
        GetInfo(item.Name, Logo);
      }}
    >
      <Image source={Logo} style={style.img} resizeMode="cover" />
      <View style={style.column}>
    <Text style={style.text}>{Spec.length > 35?`${Spec.substr(0,35)}...`:Spec}</Text>
        <View style={style.row}>
          <View style={style.col}>
            <Text style={style.title}>{item.Name.length > 20?`${item.Name.substr(0,20)}...`:item.Name}</Text>
          </View>
          <View style={style.col}>
            <Text style={style.text}>{item.Salary} DA</Text>
          </View>
        </View>
    <Text style={style.text}>{Level}</Text>
      </View>
    </TouchableOpacity>;
  };
  return ( // كالة العرض الرئيسية لكامل الصفحة
    <SafeAreaView style={style.Content}>
      {OffersList.length>0?(// إذا كان عدد العروض أكبر من الصف 
        <FlatList // يتم عرض قائمة النتائج
        data={OffersList} // استيراد قائمة النتائج من عنصصر ادارة احالة
        renderItem={RenderList} // استدعاء الدالة المسؤولة عن عرض المءسسات المعرفة مسبقا
        keyExtractor={(item, index) => `Offer${index}`} // المفتاح الخاص بكا عنصر من القائمة
      />
      ):
      // إذا لم يتحقق الشرط يتم عرض شاشة عدم وجود نتائج
      (<View style={style.NoResult}> 
        <Image style={style.NoData} source={require('../Images/NoData.png')} />
        <Text style={style.NoDataText}>Il n’y a pas de résultats.</Text>
      </View>)}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({

  container: {
    padding: 10,
    marginBottom: 10,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    
    elevation: 1,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  title: {
    fontSize: 18,
    
  },
  text:{
    color: "gray"
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 15,
  },
  col: {
    width: "52%",
    justifyContent: "center",
  },
  NoResult:{
    width,height,
    alignItems: "center",
    backgroundColor:"white"
  },
  NoData:{
    width,
    height: "40%"
  },
  NoDataText:{
    fontSize: 30,
    color: "gray"
  }
});

// قائمة شعارات الشركات
const GetLogo  = ()=>{
  return [
  {
    "Name": "GIPLAIT Laiterie Aures",
    "Logo": require("../Images/BG/empty.png")
  },
  {
    "Name": "Kia Motors",
    "Logo": require("../Images/BG/KiaMotors.png")
  },
  {
    "Name": "Toyota",
    "Logo": require("../Images/BG/Toyota.jpg")
  },
  {
    "Name": "Renault",
    "Logo": require("../Images/BG/Renault.jpg")
  },
  {
    "Name": "Algerie télécome",
    "Logo": require("../Images/BG/AlgérieTélécom.jpg")
  },
  {
    "Name": "Banque Badr",
    "Logo": require("../Images/BG/BanqueBadr.png")
  },
  {
    "Name": "Hotel salim",
    "Logo": require("../Images/BG/empty.png")
  },
  {
    "Name": "Clinique Ihssaniyet",
    "Logo": require("../Images/BG/empty.png")
  },
  {
    "Name": "Maison de la presse",
    "Logo": require("../Images/BG/empty.png")
  },
  {
    "Name": "Théatre",
    "Logo": require("../Images/BG/empty.png")
  },
  {
    "Name": "Centre Beauty Joelle",
    "Logo": require("../Images/BG/empty.png")
  },
  {
    "Name": "Condor",
    "Logo": require("../Images/BG/condor.png")
  },
  {
    "Name": "C.H.U",
    "Logo": require("../Images/BG/empty.png")
  },
  {
    "Name": "Clinique Zohor",
    "Logo": require("../Images/BG/empty.png")
  },
  {
    "Name": "Usine IRIS",
    "Logo": require("../Images/BG/Iris.jpg")
  },
  {
    "Name": "Usine ENIE",
    "Logo": require("../Images/BG/Enie.jpg")
  },
  {
    "Name": "Maternité Merieme Bouatoura",
    "Logo": require("../Images/BG/empty.png")
  },
  {
    "Name": "Sonelgaz",
    "Logo": require("../Images/BG/sonelgaz.png")
  },
  {
    "Name": "Direction de l'education",
    "Logo": require("../Images/BG/empty.png")
  },
  {
    "Name": "Algérienne des eaux",
    "Logo": require("../Images/BG/ADE.jpg")
  },
  {
    "Name": "Agence touristique",
    "Logo": require("../Images/BG/empty.png")
  },
  {
    "Name": "Clinique Mohammed Sadek",
    "Logo": require("../Images/BG/empty.png")
  }
]
}
