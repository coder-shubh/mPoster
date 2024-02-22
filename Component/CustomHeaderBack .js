import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/AntDesign';
import { Colors } from "../utils/Colors";

const CustomHeaderBack = () => {

    const nav = useNavigation();
    return (
        <SafeAreaView style={{ backgroundColor: Colors.primaryTheme }}>
            <MaterialIcons name='leftcircle' size={40} color={Colors.Iris}  onPress={() => { nav.goBack() }} />
        </SafeAreaView>
    );
};

export default CustomHeaderBack;