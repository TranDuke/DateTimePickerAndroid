import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Picker from './Picker';

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 300,
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 31,
  },
});
const start = 1900;
const onChange = (e) => {
  console.log(e);
};
const values = new Array(new Date().getFullYear() - start + 1)
  .fill(0)
  .map((_, i) => {
    const value = start + i;
    return {value, label: `${value}`};
  })
  .reverse();
const App = () => {
  const defaultValue = 10;
  return (
    <View style={styles.container}>
      <Picker values={values} defaultValue={defaultValue} onChange={onChange} />
    </View>
  );
};

export default App;
