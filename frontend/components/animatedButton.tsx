import React, { useRef } from "react";
import { Image, Animated, Pressable, Text, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";

export function SimpleButton({ onPress, title, color, textColor}: { onPress:any, title:string, color:string, textColor:string}) {
    // The animation value (1 = 100% size)
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        // Vibrate!
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        // Shrink!
        Animated.spring(scaleValue, {
            toValue: 0.96,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        // Snap back!
        Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3, // Control the "bounciness"
        tension: 40,
        useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View
            style={[styles.container, { transform: [{ scale: scaleValue }]}]}
        >
            <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={onPress}
                style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: color, opacity: pressed? 0.9 : 1},
                ]}
            >
                <Text style={[styles.buttonText, {color: textColor}]}>{title}</Text>
            </Pressable>
        </Animated.View>
    );
}

export function IconedButton({ onPress, image, title, color, radius}: { onPress:any, image:any, title:string, color:string, radius:number}) {
    // The animation value (1 = 100% size)
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        // Vibrate!
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        // Shrink!
        Animated.spring(scaleValue, {
            toValue: 0.96,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        // Snap back!
        Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3, // Control the "bounciness"
        tension: 40,
        useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View
            style={[styles.container, { transform: [{ scale: scaleValue }]}]}
        >
            <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={onPress}
                style={({ pressed }) => [
                    styles.emptyButton,
                    { borderRadius: radius, borderWidth: 2, borderColor: color, opacity: pressed? 0.9 : 1},
                ]}
            >
                <Image source={image} style={{aspectRatio: 1/1 ,height: '50%'}}/>
                <Text style={[styles.buttonText, {color: color}]}>{title}</Text>
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
    },
    button: {
        width: "80%",
        paddingVertical: 15,
        borderRadius: 4, // Your squarish look
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },
    emptyButton: {
        width: "80%",
        paddingVertical: 15,
        borderRadius: 4, // Your squarish look
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'transparent',
        flexDirection: 'row',
        gap: 20
    },
    buttonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 1,
    },
});
