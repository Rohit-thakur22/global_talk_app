import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {onboardingData} from '../data/onboardingData';

const {width} = Dimensions.get('window');

const OnboardingScreen = ({navigation, onFinish}: {navigation: any, onFinish?: () => void}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFinish = () => {
    if (onFinish) {
      onFinish();
    } else {
      navigation.replace('LoginScreen');
    }
  };

  return (
    <View style={styles.container}>
         <StatusBar barStyle="light-content" />
      <Swiper
        loop={false}
        index={currentIndex}
        onIndexChanged={setCurrentIndex}
        showsPagination={false}>
        {onboardingData.map((item, index) => (
          <View style={styles.slide} key={item.key || index}>
            {item.logoOnly ? (
              <View style={styles.logoOnlyWrap}>
                <Image
                  source={item.logo}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
            ) : (
              <>
                <View style={styles.logoWrap}>
                  <Image
                    source={require('../assets/logo.png')}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </View>
                <Image
                  source={item.image}
                  style={styles.image}
                  resizeMode="contain"
                />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </>
            )}
          </View>
        ))}
      </Swiper>
      {/* Custom Progress Bar */}
      {currentIndex > 0 && (
        <View style={styles.progressBar}>
          {onboardingData.slice(1).map((item, idx) => (
            <Image
              key={item.key || idx}
              source={item.icon}
              style={[
                styles.progressIcon,
                idx < currentIndex - 1 ? styles.iconFilled : styles.iconUnfilled,
              ]}
            />
          ))}
        </View>
      )}
      {/* Outlined Button at Bottom */}
      {onboardingData[currentIndex]?.isLast && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.outlinedButton}
            onPress={handleFinish}
          >
            <Text style={styles.outlinedButtonText}>Let's Get Started</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  slide: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
  },
  logoOnlyWrap: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  logoWrap: {},
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff6600',
    fontFamily: 'sans-serif',
  },
  image: {width: width * 0.8},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
    marginTop: 64,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 24,
    padding: 6,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  progressIcon: {width: 24, height: 24, marginHorizontal: 6, opacity: 0.5},
  iconFilled: {opacity: 1},
  iconUnfilled: {opacity: 0.3},
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 65,
    alignItems: 'center',
  },
  outlinedButton: {
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 32,
    backgroundColor: 'transparent',
    minWidth: 220,
    alignItems: 'center',
  },
  outlinedButtonText: {
    color: '#222',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OnboardingScreen;
