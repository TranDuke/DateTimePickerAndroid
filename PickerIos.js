import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';

let years = [];
for (let i = 1998; i <= 2100; i++) {
  years.push(i.toString());
}

let days = [];
for (let i = 1; i <= 31; i++) {
  i < 10 ? days.push(`0${i}`) : days.push(i.toString());
}

let hours24h = [];
for (let i = 0; i <= 23; i++) {
  i < 10 ? hours24h.push(`0${i}`) : hours24h.push(i.toString());
}

let hours12h = [];
for (let i = 0; i <= 12; i++) {
  i < 10 ? hours12h.push(`0${i}`) : hours12h.push(i.toString());
}

let minutes = [];
for (let i = 0; i <= 59; i++) {
  i < 10 ? minutes.push(`0${i}`) : minutes.push(i.toString());
}

const typehour = ['AM', 'PM'];

const months = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
];

const month30 = ['Tháng 2', 'Tháng 4', 'Tháng 6', 'Tháng 9', 'Tháng 11'];

const PickerIos = (props) => {
  const {value, is24h, onChangeTime, onChangeDate, mode} = props;
  const [year, setYear] = useState('1998');
  const [month, setMonth] = useState('Tháng 12');
  const [month_, setMonthNumber] = useState('12');
  const [day, setDay] = useState('24');
  const [hour24, setHour24] = useState('22');
  const [hour12, setHour12] = useState('10');
  const [minute, setMinute] = useState('10');
  const [type, setType] = useState('PM');

  const [timeMode, setTimeMode] = useState(false);
  const [dayMode, setDayMode] = useState(false);
  const [monthMode, setMonthMode] = useState(false);

  useEffect(() => {
    if (mode === 'time') {
      const hour_ = moment(value, 'HH:mm').format('HH');
      const minute_ = moment(value, 'HH:mm').format('mm');
      setTimeMode(true);
      setDayMode(false);
      setMonthMode(false);
      if (!is24h && hour_ > 12) {
        setType('PM');
        setHour12(hour_ < 22 ? `0${hour_ - 12}` : `${hour_ - 12}`);
        setMinute(minute_);
      }
      if (!is24h && hour_ < 12) {
        setHour12(hour_);
        setType('AM');
        setMinute(minute_);
      }
      if (is24h) {
        setHour24(hour_);
        setMinute(minute_);
      }
    }
    if (mode === 'date') {
      setTimeMode(false);
      setDayMode(true);
      setMonthMode(true);
      setDay(moment(value, 'DD/MM/YYYY').format('DD'));
      setMonthNumber(moment(value, 'DD/MM/YYYY').format('MM'));
      setMonth(`Tháng ${moment(value, 'DD/MM/YYYY').format('M')}`);
      setYear(moment(value, 'DD/MM/YYYY').format('YYYY'));
    }
    if (mode === 'month') {
      setTimeMode(false);
      setDayMode(false);
      setMonthMode(true);
      setMonthNumber(moment(value, 'DD/MM/YYYY').format('MM'));
      setMonth(`Tháng ${moment(value, 'DD/MM/YYYY').format('M')}`);
      setYear(moment(value, 'DD/MM/YYYY').format('YYYY'));
    }
  }, [is24h, mode]);

  const PickerDay = (e) => {
    if (month30.find((val) => val === month) && e === '31') {
      return (
        <Picker.Item label={e} value={e} key={e} color={'rgb(220, 220, 220)'} />
      );
    }
    if (month === 'Tháng 2' && e === '30') {
      return (
        <Picker.Item label={e} value={e} key={e} color={'rgb(220, 220, 220)'} />
      );
    }
    if (
      month === 'Tháng 2' &&
      e === '29' &&
      !(
        (year % 100 > 0 && year % 4 === 0) ||
        (year % 100 === 0 && year % 400 === 0)
      )
    ) {
      return (
        <Picker.Item label={e} value={e} key={e} color={'rgb(220, 220, 220)'} />
      );
    } else {
      return <Picker.Item label={e} value={e} key={e} />;
    }
  };

  const PickerType = (e) => {
    if (hour12 === '12' && e === 'PM') {
      return (
        <Picker.Item label={e} value={e} key={e} color={'rgb(220, 220, 220)'} />
      );
    } else {
      return <Picker.Item label={e} value={e} key={e} />;
    }
  };

  const onSetDay = (e) => {
    const check30 = month30.find((val) => val === month);
    const checkFeb = month === 'Tháng 2';
    const checkLeapYear =
      (year % 100 > 0 && year % 4 === 0) ||
      (year % 100 === 0 && year % 400 === 0);
    if (check30 && e === '31' && month !== 'Tháng 2') {
      setDay('30');
      onChangeDate(`30/${month_}/${year}`);
    } else if (checkFeb && checkLeapYear && (e === '31' || e === '30')) {
      setDay('29');
      onChangeDate(`29/02/${year}`);
    } else if (
      checkFeb &&
      !checkLeapYear &&
      (e === '31' || e === '30' || e === '29')
    ) {
      setDay('28');
      onChangeDate(`28/02/${year}`);
    } else {
      setDay(e);
      onChangeDate(`${e}/${month_}/${year}`);
    }
  };

  const onSetMonth = (e) => {
    const _month =
      e.replace('Tháng ', '') < 10
        ? `0${e.replace('Tháng ', '')}`
        : e.replace('Tháng ', '');
    const check30 = month30.find((val) => val === e);
    const checkFeb = e === 'Tháng 2';
    const checkLeapYear =
      (year % 100 > 0 && year % 4 === 0) ||
      (year % 100 === 0 && year % 400 === 0);
    if (check30 && day === '31' && e !== 'Tháng 2') {
      setDay('30');
      setMonthNumber(_month);
      setMonth(e);
      onChangeDate(`30/${_month}/${year}`);
    }
    if (checkFeb && checkLeapYear && (day === '31' || day === '30')) {
      setDay('29');
      setMonthNumber(_month);
      setMonth(e);
      onChangeDate(`29/02/${year}`);
    }
    if (
      checkFeb &&
      !checkLeapYear &&
      (day === '31' || day === '30' || day === '29')
    ) {
      setDay('28');
      setMonthNumber(_month);
      setMonth(e);
      onChangeDate(`28/02/${year}`);
    } else {
      setMonthNumber(_month);
      setMonth(e);
      onChangeDate(`${day}/${_month}/${year}`);
    }
  };

  const onSetYear = (e) => {
    const checkFeb = month === 'Tháng 2';
    const checkLeapYear =
      (e % 100 > 0 && e % 4 === 0) || (e % 100 === 0 && e % 400 === 0);
    if (checkFeb && checkLeapYear && (day === '31' || day === '30')) {
      setDay('29');
      setYear(e);
      onChangeDate(`29/${month_}/${e}`);
    }
    if (
      checkFeb &&
      !checkLeapYear &&
      (day === '31' || day === '30' || day === '29')
    ) {
      setDay('28');
      onChangeDate(`28/${month_}/${e}`);
      setYear(e);
    } else {
      setYear(e);
      onChangeDate(`${day}/${month_}/${e}`);
    }
  };

  const onSetHour = (e) => {
    console.log(e);
    is24h ? setHour24(e) : setHour12(e);
    is24h
      ? onChangeTime(`${e}:${minute}`)
      : onChangeTime(`${e}:${minute} ${type}`);
    !is24h && e === '12' && type === 'PM' ? setType('AM') : null;
  };

  const onSetMinute = (e) => {
    setMinute(e);
    is24h
      ? onChangeTime(`${hour24}:${e}`)
      : onChangeTime(`${hour12}:${e} ${type}`);
  };

  const onSetType = (e) => {
    (hour12 === '12' || hours24h === '0') && e === 'PM'
      ? setType('AM')
      : setType(e);
    onChangeTime(`${hour12}:${minute} ${e}`);
  };

  return (
    <>
      {timeMode && (
        <View style={styles.flexRow}>
          <View style={styles.column}>
            <Text>Giờ</Text>
            <Picker
              selectedValue={is24h ? hour24 : hour12}
              style={styles.pickerYear}
              onValueChange={(itemValue, itemIndex) => onSetHour(itemValue)}>
              {(is24h ? hours24h : hours12h).map((e) => (
                <Picker.Item label={e} value={e} key={e} />
              ))}
            </Picker>
          </View>
          <View style={styles.column}>
            <Text>Phút</Text>
            <Picker
              selectedValue={minute}
              style={styles.pickerMonth}
              onValueChange={(itemValue, itemIndex) => onSetMinute(itemValue)}>
              {minutes.map((e) => (
                <Picker.Item label={e} value={e} key={e} />
              ))}
            </Picker>
          </View>
          {!is24h && (
            <View style={styles.column}>
              <Text> </Text>
              <Picker
                selectedValue={type}
                style={styles.pickerYear}
                onValueChange={(itemValue, itemIndex) => onSetType(itemValue)}>
                {typehour.map((e) => PickerType(e))}
              </Picker>
            </View>
          )}
        </View>
      )}
      <View style={styles.flexRow}>
        {dayMode && (
          <View style={styles.column}>
            <Text>Ngày</Text>
            <Picker
              selectedValue={day}
              style={styles.pickerYear}
              onValueChange={(itemValue, itemIndex) => onSetDay(itemValue)}>
              {days.map((e) => PickerDay(e))}
            </Picker>
          </View>
        )}
        {monthMode && (
          <>
            <View style={styles.column}>
              <Text>Tháng</Text>
              <Picker
                selectedValue={month}
                style={styles.pickerMonth}
                onValueChange={(itemValue, itemIndex) => onSetMonth(itemValue)}>
                {months.map((e) => (
                  <Picker.Item label={e} value={e} key={e} />
                ))}
              </Picker>
            </View>
            <View style={styles.column}>
              <Text>Năm</Text>
              <Picker
                selectedValue={year}
                style={styles.pickerYear}
                onValueChange={(itemValue, itemIndex) => onSetYear(itemValue)}>
                {years.map((e) => (
                  <Picker.Item label={e} value={e} key={e} />
                ))}
              </Picker>
            </View>
          </>
        )}
      </View>
    </>
  );
};

PickerIos.defaultProps = {
  mode: 'date',
  is24h: true,
};
export default PickerIos;

const styles = StyleSheet.create({
  pickerYear: {
    width: 60,
    height: 200,
  },
  pickerMonth: {
    width: 90,
    height: 200,
  },
  column: {
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
});
