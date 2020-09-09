import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native"; // تم تعريفها في صفحة البداية
import { TouchableOpacity } from "react-native-gesture-handler";// تم تعريفها في صفحة البداية
import ImageBackground from "react-native/Libraries/Image/ImageBackground";// تم تعريفها في صفحة البداية
import { Levels, Specialities } from "../Api/OffresList.json"; // إستوراد جدول المستويات و التخصصات من قاعدة البيانات

const { width, height } = Dimensions.get("window");// تم تعريفها في صفحة البداية
export default function Home({ navigation }) {//الدالة الرئيسية للصفحة  مصدرة باسمها الإفتراضي مع ملحق للتصفح
  const Cards = () => { // دالة للإضهار المستويات في بطاقات
    return Levels.map((Level, id) => { // دالة الخريطة للولوج إلى قيم المستويات
      // Level : القيمة النصية للمستوى
      // id: ترتيب المستوى في الجدول
      var icon = "" // الأيقونة الخاصة بالمستوى
      switch (Level) { // الجملة الشرطية للحصول على أيقونة المستوى
        case "Bac": icon = Icons.Bac; // إذا كلنت الاقيمة النصية للمستوى == بكالوريا نأخذ الصورة الموافقة لها من قائمة الصور المعرفة أسفل الصفحة
          break; // للخروج من الشرط
      case "Licence": icon = Icons.Licence //
      break;
      case "Master": icon = Icons.Master
      break;
        default: icon = Icons.Empty // إذا لم تتوفر الشروط الساببقة نغين الصورة البديلة
          break;
      }
      return ( // الواجهة المعادة من الدالة
        <TouchableOpacity
          style={styles.Card}
          key={id} // المفتاح يأخذ من ترتيب المستوى في الجدول ليكون فريد غير مستعمل من قبل
          onPress={() => {
            Submit(Level); // إستدعاء الدالة للبحث عن التخصصات المتوفرة حسب المستوى
          }}
        >
          <Image source={icon} style={{width: 100, height: 100}}/>
          <Text style={styles.Title}>{Level}</Text>
        </TouchableOpacity>
      );
    });
  };
  const Submit = (Level) => { // الدالة الخاصة بالبحث عن التخصصات
    if (Level == "Bac") { // إذا كانت القيمة النصية للمستوى المحدد هي بكالوريا
      const List = Specialities.filter((data) => data.Level == Level); //  نفوم بالبحث عن التخصصات المتوفرة 
      return List.map(Spec => { // نتصفخ قائمة التخصصات باستعمال دالة الخريطة
        navigation.navigate("Offres", { Spec: Spec.Tree, Level }); // نقوم بالذهاب الى الصفحة الخاصة بالعروض المتوفرة بالاعدادات الخاصة بالمستوى و التخصصات
      });
    }
     // أما إذا لم يتوفر الشرط السابق 
    return navigation.navigate("Specialities", { Level }); // ننتقل الى صفحة التخصصات مباشرة حسب القيمة النصية للمستوى
  };
  return (
    // لإضهار الصفحة كاملة
    <View style={styles.container}>
      <ImageBackground
        style={styles.Img}
        imageStyle={{
          borderRadius: 20,
          borderBottomRightRadius: 150,
        }}
        source={require("../Images/BG/Select.jpg")}
      ></ImageBackground>
      <View style={styles.center}>
        {/* إستدعاء الدالة الخاصة بعرض المستويات */}
        {Cards()}
        </View>
    </View>
  );
}
// الستايل الخاص بالبرنامج
const styles = StyleSheet.create({
  container: {
    flex: 1, // عدد الأعمدة في الصفحة هي 1
    width,
    height,
    backgroundColor: "white",
  },
  Img: {
    width,
    height: height / 2,
    paddingTop: 50,
    position: "relative", // الوضعية نسبية لإستقبال عناصر بوضعية حرة
  },
  title: {
    width,
    fontSize: 30,
    alignItems: "center",
    textAlign: "center",
    color: "rgb(30,30,30)",
  },
  Card: {
    width: 150,
    height: 150,
    margin: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    // الضل الخاص بكل بطاقة مستوى
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    
    elevation: 2,
// نهاية كود الضل
  },
  Title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "gray"
  },
  center: {
    width,
    height: height/2,
    position: "absolute",
    top: height / 2.4,
    borderRadius: 15,
    backgroundColor: "white",
    flexDirection: "row", // اضهار البطاثات على شكل جدول أعمدة
    flexWrap: "wrap", // عودة الى السطر عند الوصول الى أقصى حد لعرض الجهاز
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    
    elevation: 4,
  },
});

//قائمة الأيقانات حسب المستوى

const Icons = {
  Empty: require("../Images/empty.png"),
  Bac: require('../Images/Bac.png'),
  Licence: require('../Images/Licence.png'),
  Master: require('../Images/Master.png')
}