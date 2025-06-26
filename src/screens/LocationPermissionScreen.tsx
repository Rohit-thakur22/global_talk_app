import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
  Platform,
} from 'react-native';
import {
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

const LocationPermissionScreen = ({navigation}: {navigation: any}) => {
  const [loading, setLoading] = useState(false);

  const handleAllowLocation = async () => {
    setLoading(true);
    try {
      let permission;
      if (Platform.OS === 'ios') {
        permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
      } else {
        permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      }
      const result = await request(permission);
      navigation.replace('LoginScreen');
      if (result === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          _position => {
            setLoading(false);
            navigation.replace('LoginScreen');
          },
          error => {
            setLoading(false);
            Alert.alert('Location Error', error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else if (result === RESULTS.BLOCKED) {
        setLoading(false);
        Alert.alert(
          'Permission Blocked',
          'Please enable location permission in settings.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: () => openSettings()},
          ],
        );
      } else {
        setLoading(false);
        Alert.alert(
          'Permission Denied',
          'Location permission is required to use this app.',
        );
      }
    } catch (e) {
      setLoading(false);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Location Permission</Text>
        <Image
          source={require('../assets/location.png')}
          style={styles.illustration}
        />
        <Text style={styles.description}>
          We need your location access to work this app properly.
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.allowBtn}
          onPress={handleAllowLocation}
          disabled={loading}>
          <Text style={styles.allowText}>
            {loading ? 'Please wait...' : 'Allow Location'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.note}>
          Note: You can change the permission whenever you want
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  logo: {width: '100%', resizeMode: 'contain', marginBottom: 16},
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  illustration: {
    width: '100%',
    // height: 200,
    resizeMode: 'contain',
  },
  description: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
  btnContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  allowBtn: {
    backgroundColor: '#F37D35',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    width: '100%',
  },
  allowText: {color: '#fff', fontWeight: 'bold', fontSize: 16},
  note: {fontSize: 12, color: '#000', textAlign: 'center'},
});

export default LocationPermissionScreen;
