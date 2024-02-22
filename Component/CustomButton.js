import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../utils/Colors";
import globalStyles from "./Styles/globalStyles";

export default function CustomButton({ title, press }) {

    const styles = globalStyles();
    return (
        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={press}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}