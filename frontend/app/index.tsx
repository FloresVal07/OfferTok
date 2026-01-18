import { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import * as Location from "expo-location";
// 1. Import your new custom button
import { IconedButton, SimpleButton } from '../components/animatedButton'; 
import  { CustomInput }  from "../components/submissionForm";

export default function HomeScreen() {
    const logoMap = [
        // Using require + as any bypasses the "Module not found" error
        { name: 'Email', img: require("../assets/images/mail.png") as any }, 
        { name: 'Apple', img: require("../assets/images/apple.png") as any },
        { name: 'Gmail', img: require("../assets/images/google.png") as any }
    ];

    const [step, setStep] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [zipInput, setZipInput] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    function stepDown(){
        if(step <= 0){return console.log("No Previous Pages To Step Towards")}
        setStep(step-1);
    }
    function stepForward(){
        //eventually when done fill this in
        //if(step >= max pages){return console.log("No Further Pages To Step Towards")}
        setStep(step+1);
    }

    const handleGPS = async () => {
        // 1. Request permission
        let { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
            alert('Permission to access location was denied. Please enter your zip code.');
            return;
        }

        // pos
        let location = await Location.getCurrentPositionAsync({});
        
        // coords
        console.log("Found you at:", location.coords.latitude, location.coords.longitude);
        stepForward();
    };

    {/**Welcome Page */}
    if (step === 0) {
        return (
            <View style={[styles.container, {gap: 75}]}>
                <Image
                    source={require('../assets/images/logoPlaceholder.png')}
                    style={{ aspectRatio: 1/1 , width: '100%'}}
                /> 
                <Text style={[styles.text, { fontSize: 50, width: '90%', textAlign: 'center'}]}>Welcome To OfferTok!</Text> 
                <SimpleButton title="Get Started" onPress={() => stepForward()} color="#F2F4F8" textColor="#000000"/>
            </View>
        );
    {/**Login Page*/}
    }else if(step === 1) {
        return (
            <View style={[styles.container, {gap: 60}]}>
                <Text style={[styles.text, { fontSize: 50, width: '100%', textAlign: 'center', fontWeight: '500'}]}>Login / Sign up</Text> 
                <Image
                    source={require('../assets/images/logoPlaceholderLong.png')}
                    style={{ width: '100%'}}
                /> 
                <View style={{width: '100%', gap:20}}>
                    {logoMap.map((item) => (
                        <IconedButton 
                        key={item.name} // Always add a unique key!
                        title={`Log in with ${item.name}`} 
                        image={item.img} // This passes the required image correctly
                        onPress={() => stepForward()} 
                        color="#0F62FE" 
                        radius={25}
                        />
                    ))}
                </View>
                <Text style={[styles.text, { fontSize: 16, width: '90%', textAlign: 'center', fontWeight: '300'}]}>By continuing you agree to OfferTok's Terms of Service and acknowledge the OfferTok Privacy Policy</Text> 
                <Text onPress={() => stepDown()} style={[styles.text, { fontSize: 16, width: '90%', textAlign: 'center'}]}>Cancel</Text> 
            </View>
        );
    {/**Email Query Page*/}
    }else if(step === 2){
        return (
            <View style={[styles.container, {gap: 35}]}>
                <Image
                    source={require('../assets/images/logoPlaceholderLong.png')}
                    style={{ width: '100%'}}
                /> 
                <View>
                    <View style={{ 
                        flexDirection: 'row', 
                        width: '90%', 
                        alignSelf: 'center', 
                        gap: 10 
                    }}>
                        {/* Each flex: 1 takes exactly half the row */}
                        <View style={{ flex: 1 }}>
                            <CustomInput 
                                label="First Name"
                                placeholder="John"
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <CustomInput 
                                label="Last Name"
                                placeholder="Doe"
                                value={lastName}
                                onChangeText={setLastName}
                            />
                        </View>
                    </View>
                    <CustomInput 
                        label="Email"
                        placeholder="Enter your email here"
                        value={emailInput}
                        onChangeText={setEmailInput}
                    />
                    <View style={{ 
                        flexDirection: 'row', 
                        width: '90%',           // This controls the total row width
                        alignItems: 'center',    // Keeps the eye vertically centered with the box
                        alignSelf: 'center'     // Centers the 90% row on the screen
                    }}>
                        <View style={{ flex: 1 }}> 
                            <CustomInput 
                                label="Password"
                                placeholder="Enter your password here"
                                value={passwordInput}
                                secureTextEntry={!passwordVisibility} // Negated for correct logic
                                onChangeText={setPasswordInput}
                                // Ensure CustomInput internal container is width: '100%'
                            />
                        </View>

                        <Pressable 
                            onPress={() => setPasswordVisibility(!passwordVisibility)}
                            style={{ paddingLeft: 10, paddingTop: 15 }} // Padding adjusts for the label height
                        >
                            <Image 
                                source={passwordVisibility ? require("../assets/images/open-eye.png") : require("../assets/images/closed-eye.png")}
                                style={{ width: 25, height: 25 }} // Always give images fixed dimensions
                                resizeMode="contain"
                            />
                        </Pressable>
                    </View>
                    <View>
                        <SimpleButton title="Submit" onPress={() => stepForward()} color="#0F62FE" textColor="#ffffff"/>
                    </View>
                </View>
                <Text style={[styles.text, { fontSize: 16, width: '90%', textAlign: 'center', fontWeight: '300'}]}>By continuing you agree to OfferTok's Terms of Service and acknowledge the OfferTok Privacy Policy</Text> 
                <Text onPress={() => stepDown()} style={[styles.text, { fontSize: 16, width: '90%', textAlign: 'center'}]}>Cancel</Text> 
            </View>
        );
    {/**Location Query Page */}
    }else if(step === 3){
        return(
            <View style={[styles.container, {gap: 40}]}>
                <Image source={require("../assets/images/locationBlack.png")}/>
                <Text style={[styles.text, { fontSize: 34, width: '90%', textAlign: 'center'}]}>Where would you like to discover deals from?</Text> 
                <IconedButton 
                    onPress={() => handleGPS()}
                    image={require("../assets/images/locationBlue.png")}
                    title="Use my location"
                    color="#0F62FE"
                    radius={25}/>
                <Text style={[styles.text, { fontSize: 34, width: '90%', textAlign: 'center'}]}>Or</Text>     
                <View style={{ 
                    flexDirection: 'row', 
                    width: '85%',          // Increased slightly for better look
                    alignItems: 'center', 
                    alignSelf: 'center', 
                    gap: 10                // Adds a clean space between input and button
                }}>
                    {/* This View takes up the majority of the space */}
                    <View style={{ flex: 1 }}>
                        <CustomInput
                            label=""
                            placeholder="Zipcode"
                            value={zipInput}
                            onChangeText={setZipInput}
                            keyboardType="number-pad" // Optimization for Zipcodes
                        />
                    </View>

                    {/* This View stays exactly at the size it needs to be */}
                    <View style={{ width: '30%' }}>
                        <SimpleButton 
                            title="Set" 
                            onPress={() => stepForward()} 
                            color="#F2F4F8" 
                            textColor="#000000"
                        />
                    </View>
                </View>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Text style={[styles.text, { fontSize: 50, width: '90%', textAlign: 'center'}]}>Access Granted!</Text> 
            <SimpleButton title="Go Back" onPress={() => stepDown()} color="#F2F4F8" textColor="#000000"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff', // Change to '#000' if you want a black screen
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});