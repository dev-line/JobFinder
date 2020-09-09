import React,{useEffect} from 'react'
import { Text,StyleSheet, Dimensions } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

const { width, height } = Dimensions.get("window");

export default function Offres({ route, navigation }) {
  const { Level, Spec } = route.params // الإعدادات المرسلة إلى الصفحة (المستوى,التخصص) 
  const GetOffers = ()=>{ // دالة للحصول رجعية لقائمة الأعمال المتوفرة في هذا التخصص
    return Spec.map((spc,index)=>{ // دالة الخريطة للحصول على قائمة الأعمال المتوفرة
      return <TouchableOpacity style={styles.Card} key={index} onPress={()=>{Submit(spc,Level)}}>
      <Text style={styles.Title}>{spc}</Text>
    </TouchableOpacity>
    })
  }
  const Submit = (Spec, Level) => { // دالة البحث حسب المستوى و التخصص
    navigation.navigate("Results", { Spec, Level }); // الإنتقال لصفحة النتائج بالاعدادات المذكورة سابقا
  };
  return (// إضهار الصفحة كاملة
    <ScrollView>
      <GetOffers/>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
  },
  Img: {
    width,
    height: height / 2,
    paddingTop: 50,
    position: 'relative' // الوضعية نسبية لإستقبال عناصر بوضعية حرة
  },
  title: {
    width: 200,
    fontSize: 30,
    alignItems: "center",
    margin: 20,
    textAlign: "center",
    position:"absolute",
    color: "blue",
    top: "70%",
    left: -10
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
    textAlign: "center"
  },
  Link:{
    color: "blue",fontSize: 18, 
    textDecorationLine:"underline"
  },
  left:{
    alignItems: "flex-end", marginRight: 20
  },
  center:{
    margin: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});
