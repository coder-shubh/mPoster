import LottieView from "lottie-react-native";
import React from "react";
import { View, ActivityIndicator, Modal, Text, StyleSheet } from "react-native";
const LoaderAnimation = require('../assets/animation_lmzwwr3b.json');

export default function ModalPopup({ modalVisible }) {

    return (
        <View>
            <Modal transparent={true} visible={modalVisible}>
                <View style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <LottieView style={styles.animate} source={LoaderAnimation} autoPlay loop
                colorFilters={[
                    {
                        keypath: "asdf",
                        color: "#30853A",
                    }
                ]} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    Modalcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },

    loadingText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    modalContainer: {
        backgroundColor: 'transparent',
        //padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
        top:'40%'
    },
    modal: {
        backgroundColor: 'rgba(0,0,0,.3)',
        padding: 20,
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        height:'100%',
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        color: '#272727',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#272727',
    },
    animate: {
        width: 70,
        height: 70,
        backgroundColor: 'transparent',
        top: 30,
        color: '#30853A',
        tintColor: '#30853A',
        overlayColor: '#30853A',
    }
    


})
