import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import globalStyles from "./Styles/globalStyles";
import { Colors } from "../utils/Colors";
import UserAvatar from 'react-native-user-avatar';


export default function CardTouchLayout({ title, press,src }) {
    const styles = globalStyles();
    return (
        <TouchableOpacity style={styles.CardTouchLayout} onPress={press}>
            <View style={styles.AvatarImage}>
                <UserAvatar size={70} src={src} />
            </View>
            <Text style={[styles.buttonText, { color: Colors.Iris, textAlignVertical: "center", left: '40%', fontSize: 18 }]}>{title}</Text>
        </TouchableOpacity>
    )
}