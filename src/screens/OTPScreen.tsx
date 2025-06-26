import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Image,
} from 'react-native';

const OTPScreen = ({route, navigation}: {route: any; navigation: any}) => {
  const {email, phone} = route.params || {};
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resent, setResent] = useState(false);

  const handleOTPChange = (value: string) => {
    if (/^\d{0,6}$/.test(value)) setOtp(value);
  };

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 2000);
    Alert.alert('OTP Resent', `A new OTP has been sent to ${email || phone}`);
  };

  const handleLogin = () => {
    if (otp.length !== 6) {
      Alert.alert('Validation Error', 'Please enter a valid 6-digit OTP.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.replace('SuccessScreen');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Enter OTP</Text>
        <Image
          source={require('../assets/login-image.png')}
          style={styles.loginImage}
        />
        <Text style={styles.subtitle}>
          An OTP is shared on{' '}
          <Text style={styles.email}>
            {email ? `${email}` : `+91 ${phone}`}
          </Text>
        </Text>
        <TextInput
          style={styles.otpInput}
          placeholder="------"
          value={otp}
          onChangeText={handleOTPChange}
          keyboardType="number-pad"
          maxLength={6}
          textAlign="center"
        />
        <TouchableOpacity
          onPress={handleResend}
          disabled={resent}
          style={styles.resendBtn}>
          <Text style={[styles.resendText, resent && {color: '#aaa'}]}>
            Resend OTP{' '}
          </Text>
            <Image
              source={require('../assets/icons/refresh.png')}
              style={styles.refreshIcon}
            />
        </TouchableOpacity>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginBtn, otp.length !== 6 && styles.disabledBtn]}
          onPress={handleLogin}
          disabled={otp.length !== 6 || isLoading}>
          <Text style={styles.loginText}>
            {isLoading ? 'Please wait...' : 'Log in →'}
          </Text>
        </TouchableOpacity>
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
  },
  logo: {
    width: '100%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  contentContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#222',
    textAlign: 'center',
    marginBottom: 24,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    fontSize: 24,
    letterSpacing: 16,
    backgroundColor: '#fafafa',
  },
  resendBtn: {
    alignSelf: 'center',
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendText: {color: '#000', fontWeight: '500', fontSize: 15},
  backBtn: {
    borderWidth: 1,
    borderColor: '#ff6600',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  backText: {color: '#ff6600', fontWeight: '500', fontSize: 16},
  loginBtn: {
    backgroundColor: '#ff6600',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  loginText: {color: '#fff', fontWeight: 'bold', fontSize: 16},
  disabledBtn: {backgroundColor: '#ccc'},
  loginImage: {
    width: '100%',
    height: 220,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  btnContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  email: {
    fontWeight: 'bold',
  },
  refreshIcon: {
    width: 16,
    height: 16,
    marginLeft: 2,
  },
});

export default OTPScreen;
