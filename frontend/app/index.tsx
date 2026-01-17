import { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
// 1. Import your new custom button
import { IconedButton, SimpleButton } from '../components/animatedButton'; 

export default function HomeScreen() {
    const [step, setStep] = useState(0)
    
    if (step === 0) {
        return (
            <View style={[styles.container, {gap: 75}]}>
                <Image
                    source={require('../assets/images/logoPlaceholder.png')}
                    style={{ aspectRatio: 1/1 , width: '100%'}}
                /> 
                <Text style={[styles.text, { fontSize: 50, width: '90%', textAlign: 'center'}]}>Welcome To OfferTok!</Text> 
                <SimpleButton title="Get Started" onPress={() => setStep(1)} color="#F2F4F8"/>
            </View>
        );
    }

    if (step === 1) {
        return (
            <View style={[styles.container, {gap: 60}]}>
                <Text style={[styles.text, { fontSize: 50, width: '100%', textAlign: 'center', fontWeight: '500'}]}>Login / Sign up</Text> 
                <Image
                    source={require('../assets/images/logoPlaceholderLong.png')}
                    style={{ width: '100%'}}
                /> 
                <View style={{width: '100%', gap:20}}>
                    <IconedButton title="Log in with Email" url="email.png" onPress={() => setStep(2)} color="#0F62FE" radius={25}/>
                    <IconedButton title="Log in with Google" url="google.png" onPress={() => setStep(2)} color="#0F62FE" radius={25}/>
                    <IconedButton title="Log in with Apple" url="apple.png" onPress={() => setStep(2)} color="#0F62FE" radius={25}/>
                </View>
                <Text style={[styles.text, { fontSize: 16, width: '90%', textAlign: 'center', fontWeight: '300'}]}>By continuing you agree to OfferTok's Terms of Service and acknowledge the OfferTok Privacy Policy</Text> 
                <Text onPress={() => setStep(0)} style={[styles.text, { fontSize: 16, width: '90%', textAlign: 'center'}]}>Cancel</Text> 
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { fontSize: 50, width: '90%', textAlign: 'center'}]}>Access Granted!</Text> 
            <SimpleButton title="Go Back" onPress={() => setStep(1)} color="#F2F4F8"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Change to '#000' if you want a black screen
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});