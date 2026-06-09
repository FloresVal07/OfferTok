import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Seller Storefront Grid Placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Profiles often use light mode for better text readability
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { color: '#000000', fontSize: 18 }
});