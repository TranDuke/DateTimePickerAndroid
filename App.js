/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import PickerIos from './PickerIos';
import PickerAndroid from './PickerAndroid';
import moment from 'moment';

const App = () => {
  const [is24h, setis24h] = useState(true);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{
            width: 200,
            height: 60,
            backgroundColor: 'orange',
            marginVertical: 16,
            borderRadius: 16,
          }}
          onPress={() => setis24h(!is24h)}>
          <Text>
            {time} -------------------- {date}
          </Text>
        </TouchableOpacity>
        {Platform.OS === 'ios' && (
          <>
            <PickerIos
              mode={'date'}
              onChangeDate={(e) => setDate(e)}
              value={moment(new Date()).format('DD/MM/YYYY')}
            />
            <PickerIos
              mode={'time'}
              is24h={is24h}
              onChangeTime={(e) => setTime(e)}
              value={moment(new Date()).format('HH:mm')}
            />
          </>
        )}
        {Platform.OS === 'android' && (
          <>
            <PickerAndroid
              mode={'date'}
              onChangeDate={(e) => setDate(e)}
              value={moment(new Date()).format('DD/MM/YYYY')}
            />
            <PickerAndroid
              mode={'time'}
              is24h={is24h}
              onChangeTime={(e) => setTime(e)}
              value={moment(new Date()).format('HH:mm')}
            />
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
