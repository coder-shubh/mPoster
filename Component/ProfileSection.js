import React from "react";
import { TouchableOpacity, Text } from "react-native";
import globalStyles from "./Styles/globalStyles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from "../utils/Colors";

export default function ProfileSection({title,press}) {
    const styles = globalStyles();

    return (
        <TouchableOpacity style={styles.profileSection} onPress={press} activeOpacity={0.8}>

            <Text style={[styles.title,{fontSize:16}]}>{title}</Text>

            <MaterialIcons name='arrow-forward-ios' size={24} color={Colors.Iris} />
        </TouchableOpacity>
    )
}