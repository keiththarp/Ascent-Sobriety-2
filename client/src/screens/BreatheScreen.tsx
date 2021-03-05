import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { Button, Platform, Text, Vibration, View, SafeAreaView, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import Card from '../components/Card';
import Canvas from '../components/Canvas';

import { RootNavigatorParamsList, TabNavigatorParamsList } from '../types';
import { forModalPresentationIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';
interface BreatheScreenProps {
  navigation: StackNavigationProp<TabNavigatorParamsList, 'Breathe'>
};

const Separator = () => {
  return <View style={Platform.OS === "android" ? styles.separator : null} />;
}

const BreatheScreen: React.FC<BreatheScreenProps> = ({ navigation }) => {

  const value = useState(new Animated.ValueXY({ x: 1, y: 0 }))[0];

  const moveBall = () => (
    Animated.timing(value, {
      toValue: { x: 5, y: 400 },
      duration: 4000,
      useNativeDriver: false
    }).start()
  )

  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    5 * ONE_SECOND_IN_MS
  ];

  const PATTERN_DESC =
    Platform.OS === "android"
      ? "wait 1s, vibrate 2s, wait 3s"
      : "wait 1s, vibrate, wait 2s, vibrate, wait 3s";

  return (
    <SafeAreaView style={styles.container}>
      <View style={{}}>
        <TouchableOpacity onPress={moveBall}>
          <Animated.View style={value.getLayout()}>
            <View style={{
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
              backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            >
              <Text>Press me!</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>
      <Text style={[styles.header, styles.paragraph]}>Vibration API</Text>
      <View>
        <Button title="Vibrate once" onPress={() => Vibration.vibrate()} />
      </View>
      <Separator />
      {Platform.OS == "android"
        ? [
          <View>
            <Button
              title="Vibrate for 10 seconds"
              onPress={() => Vibration.vibrate(10 * ONE_SECOND_IN_MS)}
            />
          </View>,
          <Separator />
        ]
        : null}
      <Text style={styles.paragraph}>Pattern: {PATTERN_DESC}</Text>
      <Button
        title="Vibrate with pattern"
        onPress={() => Vibration.vibrate(PATTERN)}
      />
      <Separator />
      <Button
        title="Vibrate with pattern until cancelled"
        onPress={() => Vibration.vibrate(PATTERN, true)}
      />
      <Separator />
      <Button
        title="Stop vibration pattern"
        onPress={() => Vibration.cancel()}
        color="#FF0000"
      />
      <TouchableOpacity onLongPress={() => Vibration.vibrate(ONE_SECOND_IN_MS)} style={styles.myButton}><Text>BREATHE</Text></TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    paddingTop: 44,
    padding: 8
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  paragraph: {
    margin: 24,
    textAlign: "center"
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  buttonContainer: {
    width: '100%'
  },
  myButton: {
    backgroundColor: 'green',
    width: 125,
    height: 125,
    borderRadius: 65,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default BreatheScreen;