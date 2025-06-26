import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
} from 'react-native';

const LoginScreen = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleContinue = () => {
    if (!email && !phone) {
      Alert.alert(
        'Validation Error',
        'Please enter your email or phone number.',
      );
      return;
    }
    if (email && !validateEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }
    if (phone && phone.length < 8) {
      Alert.alert('Validation Error', 'Please enter a valid phone number.');
      return;
    }
    // Simulate API call and navigate to OTP
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('OTPScreen', {email, phone});
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Sign in or create account</Text>
      <Image
          source={require('../assets/login-image.png')}
          style={styles.loginImage}
        />
      <View style={styles.inputWrapper}>
        <Image source={require('../assets/icons/email.png')} style={styles.inputIcon} />
        <TextInput
          style={styles.inputField}
          placeholder="Enter your Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputWrapper}>
        <View style={styles.flagWrapper}>
          <Image source={require('../assets/icons/india.png')} style={styles.flagIcon} />
          <Text style={styles.countryCode}>+91</Text>
        </View>
        <TextInput
          style={[styles.inputField, { flex: 1, borderLeftWidth: 0 }]}
          placeholder="Enter your number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          maxLength={10}
        />
      </View>
      <TouchableOpacity
        style={[styles.continueBtn, !(email || phone) && styles.disabledBtn]}
        onPress={handleContinue}
        disabled={!(email || phone) || isLoading}>
        <Text style={styles.continueText}>
          {isLoading ? 'Please wait...' : 'Continue →'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.orText}>or</Text>
      <TouchableOpacity style={styles.socialBtn}>
        <Image
          source={require('../assets/icons/google.png')}
          style={styles.socialIcon}
        />
        <Text style={styles.socialText}>Continue with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialBtn}>
        <Image
          source={require('../assets/icons/facebook.png')}
          style={styles.socialIcon}
        />
        <Text style={styles.socialText}>Continue with Facebook</Text>
      </TouchableOpacity>
      <Text style={styles.termsText}>
        By Clicking on continue, you are agreeing to
        <Text style={styles.link}> Terms & Conditions </Text>
        and
        <Text style={styles.link}> Privacy Policy</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: 4,
    resizeMode: 'contain',
  },
  loginImage: {
    width: '100%',
    height: 220,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#faf8f6',
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: {
    width: 22,
    height: 22,
    marginRight: 8,
    tintColor: '#b0b0b0',
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    backgroundColor: 'transparent',
    borderLeftWidth: 0,
  },
  flagWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#e0e0e0',
    paddingRight: 8,
    marginRight: 8,
    height: 32,
  },
  flagIcon: {
    width: 22,
    height: 16,
    marginRight: 4,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
    paddingHorizontal: 8,
  },
  continueBtn: {
    backgroundColor: '#ff6600',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  continueText: {color: '#fff', fontWeight: 'bold', fontSize: 16},
  disabledBtn: {backgroundColor: '#ccc'},
  orText: {textAlign: 'center', color: '#888', marginVertical: 8},
  socialBtn: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    fontWeight: '500',
    backgroundColor: '#fafafa',
  },
  socialIcon: {width: 24, height: 24, marginRight: 12},
  socialText: {fontSize: 15, color: '#222'},
  termsText: {fontSize: 12, color: '#000', textAlign: 'center', marginTop: 16},
  link: {color: '#4646FF', textDecorationLine: 'underline'},
});

export default LoginScreen;
