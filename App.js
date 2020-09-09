import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'; // حاوية الصفحات
import { createStackNavigator } from '@react-navigation/stack'; // دالة إنشاء روابط الصفحات
import Home from './src/screens/Home'; // الصفحة الرئيسية
import Offres from './src/screens/Offres'; // صفحة العروض
import Intro from './src/screens/Intro'; // صفحة البداية
import Specialities from './src/screens/Specialities'; // صفحة التخصصات
import Results from './src/screens/Results'; // صفحة النتائج
import Entreprise from './src/screens/Entreprise' // صفحة عرض معلومات الشركة


const Stack = createStackNavigator(); // متغير يحمل خصائص دالة إنشاء الروابط

const App = ()=>{
  return (
    <NavigationContainer> 
      <Stack.Navigator>
          {/* صفحة البداية بإعدادات لإخفاء رأس الصفحة */}
      <Stack.Screen name="Intro" component={Intro} options={{headerShown: false}} />
      {/* الصفحة الرئيسية بإعداد العنوان الرئيسي للصفحة و إخفاء زر الرجوع للخلف */}
        <Stack.Screen name="Home" component={Home} options={{title: "Choisissez votre niveau", headerLeft:null}} />
        <Stack.Screen name="Specialities" component={Specialities} />
        <Stack.Screen name="Offres" component={Offres} />
        {/* صفحة النتائج بإعداد العنوان */}
        <Stack.Screen name="Results" component={Results} options={{title: "Résultats"}} />
        {/* صفحة عرض معلومات الشركة بإعداد العنوان حسب البيانات المرسلة للصفحة */}
        <Stack.Screen name="Entreprise" component={Entreprise} options={({ route }) => ({ title: route.params.Name })} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App