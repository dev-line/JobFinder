// نقوم باستدعاء المكبات التي سنتعملها لإنشاء الصفحة

import React, { useEffect, useRef, useState } from "react";
// React: تسمح لنا بانشاء دالة تعيد لنا كود ذو واجهة رسومية
// useEffect : دالة تشتغل أصناء تحميل الصفحة لغرض القيام بعمليات فبل ظهور الصفحة
// useRef : تسمح لنا بالحصول على قيم معينة لعنصر ما
// useState : هي عنصر لإدارة الحالة يمكننا تعديل قيمته للحصول على نتائج مختلفة في نفس الصفحة
import {
  View, // عنصر من عناصر الواجهة نستعمله لتقسيم الصفحة لعدة أجزاء و يكون كحاوية لعدة عناصر أخرى
  Text, // لطباعة نص معين
  StyleSheet, // مكتبة تسمح لنا باضافة ستايل و جماليات على الصفحة
  Image, // لإضافة صورة
  Dimensions, // تسمح لنا بالوصول الى ابعاد الشاشة
  ImageBackground, // حاوية عناصر لكن بخلفية صورة
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
// ScrollView : حاوية عناصر بشريط تمرير إما أفقي أو عمودي
// TouchableOpacity : عبارة عن زر يمكن أن يحوي مجموعة من العناصر بداخله
import { AsyncStorage } from "react-native"; // تسمح لنا بحفظ بيانات داخل التطبيق
import { SafeAreaView } from "react-native-safe-area-context"; // مساحة العرض الأمنة وظيفتها ابعاد المحتوى عن الشريط العلوي للهاتف

const { width, height } = Dimensions.get("window"); //نأخذ أبعاد الهاتف {الطول و العرض}

export default function Intro({ navigation }) { // الدالة الرئيسية للصفحة  مصدرة باسمها الإفتراضي مع ملحق للتصفح
  const [Display, setDisplay] = useState(false); // عنصر إدارة الحالة لإدارة ظهور أو إخفاء الصفحة
  useEffect(() => { // الشرح فوق
    AsyncStorage.getItem("Used").then((res) => { // نقوم بأخذ القيمة المخزنة داخل التطبيق Used
      if (res) { // جملة شرطية تقوم بالتأكد إذا ما كانت القيمة مخزنة أم لا
        navigation.push("Home");// إذا كانت مخزنة نقوم بالتوجه مباشرة للصفحة الرئيسية
      } else {
        setDisplay(true); // إذا كانت غير مخزنة يقوم بتغيير حالة الإظهار الى true
      }
    });
  }, []);
  const scroll = useRef(0); // نقوم باعداد شريط التمرير بالقيمة 0
  const SaveData = () => { // دالة تقوم بحفظ قيمة الاستعمال في التطبيق
    AsyncStorage.setItem("Used", "True"); // حفظ قيمة الإستعمال
    navigation.push("Home"); // نقوم بالتوجه الى الصفحة الرئيسية
  };

  const Slide1 = () => { // صفحة الترحيب الأولى
    return ( 
      <ImageBackground // الشرح فوق
        source={require("../Images/internet.jpg")} // مسار الصورة
        resizeMode="stretch" // لإضهار الصورة في الحاوية كاملة
        style={Styles.Content} // الستايل الخاص بالحاوية
      >
        {/* لإضافة تأثر الضباب للصورة */}
        <View style={Styles.Smouth}></View> 
        <Image style={Styles.Img} source={require("../Images/BG/Bg01.jpg")} />
        <View style={Styles.TxtContainer}>
          <Text style={{ ...Styles.Title }}>Bienvenue</Text>
          <Text style={{ ...Styles.SubText }}>
            Vous avez terminé vos études et vous êtes à la recherche d’un
            emploi?
          </Text>
        </View>
        {/* <Text style={Styles.SubText}>
        Un swipe suiffit pour postuler à l'offre d'emploi de vos réves
        </Text> */}
        <View style={Styles.BtnContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={Styles.Button}
            onPress={() => {
              scroll.current.scrollTo({ x: width }); // تمرير الى الصفحة التالية عند الضغط
            }}
          >
            <Text style={Styles.BtnText}>Suivant</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  };
  const Slide2 = () => { // صفحة الترحيب الثانية
    return (
      <ImageBackground
        source={require("../Images/internet.jpg")}
        resizeMode="stretch"
        style={Styles.Content}
      >
        <View style={Styles.Smouth}></View>
        <Image style={Styles.Img} source={require("../Images/BG/Bg02.jpg")} />
        <View style={Styles.TxtContainer}>
          <Text style={{ ...Styles.Title }}>Allons-y</Text>
          <Text style={Styles.SubText}>
            Un swipe suiffit pour postuler à l'offre d'emploi de vos réves
          </Text>
        </View>
        <View style={Styles.BtnContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={Styles.Button}
            onPress={() => {
              SaveData(); // إستدعاء دالة الحفظ المعرفة مسبقا
            }}
          >
            <Text style={Styles.BtnText}>Commencer</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  };

  const Styles = StyleSheet.create({ // الستايل
    Container: { // الحاوية الرئيسية
      width, // العرض الكامل للشاشة
      display: Display ? "flex" : "none", // جملة شرطية للإظهار أو إخفاء الصفحة حسب الحالة المعرفة مسبقا
    },
    Content: { // المحتوى
      width, // العرض الكامل للشاشة
      alignItems: "center", // وضع المحتور في المنتصف
      padding: 50, // قيمة الهوامش الداخلية
    },
    Img: { // الصورة
      width: 250, // عرض الصورة 250 بكسل
      height: "40%", // طول الصورة
      borderTopLeftRadius: 75, // درجة إنحدار الإطار الجهة اليسرى العلوية
      borderTopRightRadius: 300, // درجة إنحدار الإطار الجهة اليمنى العلوية
      borderBottomLeftRadius: 300, // درجة إنحدار الإطار الجهة اليسرى السفلية
      borderBottomRightRadius: 300, // درجة إنحدار الإطار الجهة اليمنى السفلية
      margin: 50,
    },

    Title: {
      fontSize: 28, // حجم النص
      width: 350, // عرض النص في الصافحة
      fontWeight: "bold", //خشونة النص
      padding: 25, // الهوامش الداخلية للنص
      textAlign: "center", // محاذات النص الى المنتصف
      color: "white", // لون النص أبيض
    },
    SubText: {
      fontSize: 18, //حجم النص
      textAlign: "center", // محاذات النص الى المنتصف
      color: "white", // لون النص أبيض
    },
    Button: { // الزر
      width: 150, // العرض
      height: 50, // الطول
      alignItems: "center", //  محاذات المحتوى الى المنتصف عموديا
      justifyContent: "center",  //  محاذات المحتوى الى المنتصف أفقيا
      backgroundColor: "#4630eb", // لون الخلفية
      borderRadius: 25, // إنحدار الإطار من جميع الجوانب
    },
    TxtContainer: { // حاوية النص
      height: "40%", // الطول
      color: "white", // لون النص
    },
    BtnContainer: { // حاوية الزر
      width, // العرض
      height: "20%", // الطول
      alignItems: "flex-end", // المحاداة إلى أقصى اليسار
      paddingRight: 10, // الهامش الداخلي الأيمن
    },
    BtnText: { // نص الزر
      textAlign: "center", // المحاذات إلى المنتصف 
      color: "white", // لون النص أبيض
      fontSize: 16, // حجم النص
    },
    Smouth: { // مؤثر الضباب للصورة الخلفية
      position: "absolute", // الوضعية حرة
      top : 0, // الوضعية أعلى
      width, // العرض كامل
      height, // الطول كامل
      backgroundColor: "black", // لون الخلفية أسود
      opacity: 0.5, // الشفافية نصف شفاف
    },
  });

  return (
    <SafeAreaView style={Styles.Container}>
      <ScrollView
   // شريط التمرير أفقي
        horizontal={true}
        showsHorizontalScrollIndicator={false} // إخفاء مؤشر التمرير
        pagingEnabled={true} // التصفح حسب الصفحة
        ref={scroll} // قيمة شريط التمرير المعرفة مسبقا
      >
        {/* الصفحة الأولى */}
        <Slide1 /> 
        {/* الصفحة الثانية */}
        <Slide2 />
      </ScrollView>
    </SafeAreaView>
  );
}
