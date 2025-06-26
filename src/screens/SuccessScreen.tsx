import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';

const SuccessScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>You have Successfully Logged in!</Text>
      <View style={styles.checkmarkContainer}>
        <Image
          source={{ uri: 'https://img.icons8.com/ios-filled/200/ffffff/checkmark.png' }}
          style={styles.checkmark}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: '500', color: '#222', marginBottom: 32, textAlign: 'center' },
  checkmarkContainer: { width: 180, height: 180, borderRadius: 90, backgroundColor: '#ff6600', justifyContent: 'center', alignItems: 'center' },
  checkmark: { width: 120, height: 120, tintColor: '#fff' },
});

export default SuccessScreen; 