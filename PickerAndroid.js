import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Picker from '@gregfrench/react-native-wheel-picker';
import moment from 'moment';

const month30 = [
  {label: 'Tháng 4', value: 4},
  {label: 'Tháng 6', value: 6},
  {label: 'Tháng 9', value: 9},
  {label: 'Tháng 11', value: 11},
];

const PickerAndroid = (props?: Props) => {
  const {
    value,
    is24h,
    onChangeTime,
    onChangeDate,
    mode,
    maximumDate,
    minimumDate,
    maximumTime,
    minimumTime,
  } = props;
  const [refresh, setRefresh] = useState(true);
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [hour24, setHour24] = useState();
  const [hour12, setHour12] = useState();
  const [minute, setMinute] = useState();
  const [type, setType] = useState();
  const [type_, setType_] = useState();

  const [timeMode, setTimeMode] = useState(false);
  const [dayMode, setDayMode] = useState(false);
  const [monthMode, setMonthMode] = useState(false);

  const max = moment(maximumDate, 'DD/MM/YYYY').format('YYYYMMDD');
  const min = moment(minimumDate, 'DD/MM/YYYY').format('YYYYMMDD');
  const maxYear = parseInt(
    moment(maximumDate, 'DD/MM/YYYY').format('YYYY'),
    10,
  );
  const minYear = parseInt(
    moment(minimumDate, 'DD/MM/YYYY').format('YYYY'),
    10,
  );
  const maxMonth = parseInt(moment(maximumDate, 'DD/MM/YYYY').format('MM'), 10);
  const minMonth = parseInt(moment(minimumDate, 'DD/MM/YYYY').format('MM'), 10);
  const maxDay = parseInt(moment(maximumDate, 'DD/MM/YYYY').format('DD'), 10);
  const minDay = parseInt(moment(minimumDate, 'DD/MM/YYYY').format('DD'), 10);
  const maxHour24 = parseInt(moment(maximumTime, 'HH:mm').format('HH'), 10);
  const minHour24 = parseInt(moment(minimumTime, 'HH:mm').format('HH'), 10);
  const maxHour12 =
    moment(maximumTime, 'HH:mm').format('hh') === '12'
      ? 0
      : parseInt(moment(maximumTime, 'HH:mm').format('hh'), 10);
  const minHour12 =
    moment(minimumTime, 'HH:mm').format('hh') === '12'
      ? 0
      : parseInt(moment(minimumTime, 'HH:mm').format('hh'), 10);
  const maxMinute = parseInt(moment(maximumTime, 'HH:mm').format('mm'), 10);
  const minMinute = parseInt(moment(minimumTime, 'HH:mm').format('mm'), 10);
  const maxType = maxHour24 >= 12 ? 'PM' : 'AM';
  const minType = minHour24 >= 12 ? 'PM' : 'AM';

  const hour12exch24 = type === 'PM' ? hour12 + 12 : hour12;

  let years = [];
  for (let i = parseInt(minYear, 10); i <= parseInt(maxYear, 10); i++) {
    years.push({label: i.toString(), value: i});
  }

  let months = [];
  if (year === minYear) {
    for (let i = minMonth; i <= 12; i++) {
      months.push({label: `Tháng ${i}`, value: i});
    }
  } else if (year === maxYear) {
    for (let i = 1; i <= maxMonth; i++) {
      months.push({label: `Tháng ${i}`, value: i});
    }
  } else {
    for (let i = 1; i <= 12; i++) {
      months.push({label: `Tháng ${i}`, value: i});
    }
  }

  let days = [];
  if (year === minYear && month === minMonth) {
    for (let i = minDay; i <= 31; i++) {
      i < 10
        ? days.push({label: `0${i}`, value: i})
        : days.push({label: i.toString(), value: i});
    }
  } else if (year === maxYear && month === maxMonth) {
    for (let i = 1; i <= maxDay; i++) {
      i < 10
        ? days.push({label: `0${i}`, value: i})
        : days.push({label: i.toString(), value: i});
    }
  } else {
    for (let i = 1; i <= 31; i++) {
      i < 10
        ? days.push({label: `0${i}`, value: i})
        : days.push({label: i.toString(), value: i});
    }
  }

  let days30 = [];
  if (year === minYear && month === minMonth) {
    for (let i = minDay; i <= 30; i++) {
      i < 10
        ? days30.push({label: `0${i}`, value: i})
        : days30.push({label: i.toString(), value: i});
    }
  } else if (year === maxYear && month === maxMonth) {
    for (let i = 1; i <= maxDay; i++) {
      i < 10
        ? days30.push({label: `0${i}`, value: i})
        : days30.push({label: i.toString(), value: i});
    }
  } else {
    for (let i = 1; i <= 30; i++) {
      i < 10
        ? days30.push({label: `0${i}`, value: i})
        : days30.push({label: i.toString(), value: i});
    }
  }

  let dayFeb = [];
  if (year === minYear && month === minMonth) {
    for (let i = minDay; i <= 28; i++) {
      i < 10
        ? dayFeb.push({label: `0${i}`, value: i})
        : dayFeb.push({label: i.toString(), value: i});
    }
  } else if (year === maxYear && month === maxMonth) {
    for (let i = 1; i <= maxDay; i++) {
      i < 10
        ? dayFeb.push({label: `0${i}`, value: i})
        : dayFeb.push({label: i.toString(), value: i});
    }
  } else {
    for (let i = 1; i <= 28; i++) {
      i < 10
        ? dayFeb.push({label: `0${i}`, value: i})
        : dayFeb.push({label: i.toString(), value: i});
    }
  }

  let dayFebLeapYear = [];
  if (year === minYear && month === minMonth) {
    for (let i = minDay; i <= 29; i++) {
      i < 10
        ? dayFebLeapYear.push({label: `0${i}`, value: i})
        : dayFebLeapYear.push({label: i.toString(), value: i});
    }
  } else if (year === maxYear && month === maxMonth) {
    for (let i = 1; i <= maxDay; i++) {
      i < 10
        ? dayFebLeapYear.push({label: `0${i}`, value: i})
        : dayFebLeapYear.push({label: i.toString(), value: i});
    }
  } else {
    for (let i = 1; i <= 29; i++) {
      i < 10
        ? dayFebLeapYear.push({label: `0${i}`, value: i})
        : dayFebLeapYear.push({label: i.toString(), value: i});
    }
  }

  let hours24h = [];
  for (let i = minHour24; i <= maxHour24; i++) {
    i < 10
      ? hours24h.push({label: `0${i}`, value: i})
      : hours24h.push({label: i.toString(), value: i});
  }

  let hours12h = [];
  if (type === 'PM') {
    if (minHour24 >= 12) {
      for (let i = minHour12; i <= maxHour12; i++) {
        i === 0
          ? hours12h.push({label: '12', value: 0})
          : i < 10
          ? hours12h.push({label: `0${i}`, value: i})
          : hours12h.push({label: i.toString(), value: i});
      }
    } else if (minHour24 <= 12 && maxHour24 > 12) {
      for (let i = 0; i <= maxHour12; i++) {
        i === 0
          ? hours12h.push({label: '12', value: 0})
          : i < 10
          ? hours12h.push({label: `0${i}`, value: i})
          : hours12h.push({label: i.toString(), value: i});
      }
    }
  } else {
    if (maxHour24 < 12) {
      for (let i = minHour12; i <= maxHour12; i++) {
        i === 0
          ? hours12h.push({label: '12', value: 0})
          : i < 10
          ? hours12h.push({label: `0${i}`, value: i})
          : hours12h.push({label: i.toString(), value: i});
      }
    } else if (minHour24 <= 12 && maxHour24 > 12) {
      for (let i = minHour12; i <= 11; i++) {
        i === 0
          ? hours12h.push({label: '12', value: 0})
          : i < 10
          ? hours12h.push({label: `0${i}`, value: i})
          : hours12h.push({label: i.toString(), value: i});
      }
    }
  }

  let minutes = [];
  if (hour24 === minHour24 && is24h) {
    for (let i = minMinute; i <= 59; i++) {
      i < 10
        ? minutes.push({label: `0${i}`, value: i})
        : minutes.push({label: i.toString(), value: i});
    }
  } else if (hour24 === maxHour24 && is24h) {
    for (let i = 0; i <= maxMinute; i++) {
      i < 10
        ? minutes.push({label: `0${i}`, value: i})
        : minutes.push({label: i.toString(), value: i});
    }
  } else if (hour12 === minHour12 && type === minType && !is24h) {
    for (let i = minMinute; i <= 59; i++) {
      i < 10
        ? minutes.push({label: `0${i}`, value: i})
        : minutes.push({label: i.toString(), value: i});
    }
  } else if (hour12 === maxHour12 && type === maxType && !is24h) {
    for (let i = 0; i <= maxMinute; i++) {
      i < 10
        ? minutes.push({label: `0${i}`, value: i})
        : minutes.push({label: i.toString(), value: i});
    }
  } else {
    for (let i = 0; i <= 59; i++) {
      i < 10
        ? minutes.push({label: `0${i}`, value: i})
        : minutes.push({label: i.toString(), value: i});
    }
  }
  const typehour = [
    {type: 'AM', value: 1},
    {type: 'PM', value: 2},
  ];

  useEffect(() => {
    if (mode === 'time') {
      const hour_ = parseInt(moment(value, 'HH:mm').format('HH'), 10);
      const minute_ = parseInt(moment(value, 'HH:mm').format('mm'), 10);
      setTimeMode(true);
      setDayMode(false);
      setMonthMode(false);

      if (!is24h && value < minimumTime) {
        console.log('1', value, minimumTime);
        minimumTime < 12
          ? (setType('AM'),
            setType_(1),
            setHour24(minHour24),
            setMinute(minMinute))
          : (setType('PM'),
            setType_(2),
            setHour24(minHour24 - 12),
            setMinute(minMinute));
      } else if (!is24h && value > maximumTime) {
        console.log('2', value, maximumTime);
        maximumTime < 12
          ? (setType('AM'),
            setType_(1),
            setHour24(maxHour24),
            setMinute(maxMinute))
          : (setType('PM'),
            setType_(2),
            setHour24(maxHour24 - 12),
            setMinute(maxMinute));
      } else {
        console.log('3');
        if (hour_ >= 12) {
          setType('PM');
          setType_(2);
          setHour12(hour_ - 12);
          setMinute(minute_);
        }
        if (hour_ < 12) {
          setHour12(hour_);
          setType_(1);
          setType('AM');
          setMinute(minute_);
        }
      }

      if (is24h) {
        if (value < minimumTime) {
          setHour24(minHour24);
          setMinute(minMinute);
        } else if (value > maximumTime) {
          setHour24(maxHour24);
          setMinute(maxMinute);
        } else {
          setHour24(hour_);
          setMinute(minute_);
        }
      }
    }
    if (mode === 'date') {
      setTimeMode(false);
      setDayMode(true);
      setMonthMode(true);
      setDay(parseInt(moment(value, 'DD/MM/YYYY').format('DD'), 10));
      setMonth(parseInt(moment(value, 'DD/MM/YYYY').format('M'), 10));
      setYear(parseInt(moment(value, 'DD/MM/YYYY').format('YYYY'), 10));
    }
    if (mode === 'month') {
      setTimeMode(false);
      setDayMode(false);
      setMonthMode(true);
      setDay(1);
      setMonth(parseInt(moment(value, 'DD/MM/YYYY').format('M'), 10));
      setYear(parseInt(moment(value, 'DD/MM/YYYY').format('YYYY'), 10));
    }
  }, [is24h, mode]);

  const setData = () => {
    const check30 = month30.find((val) => val.value === month);
    const checkFeb = month === 2;
    const checkLeapYear =
      (year % 100 > 0 && year % 4 === 0) ||
      (year % 100 === 0 && year % 400 === 0);
    if (check30 && month !== 2) {
      return days30;
    } else if (checkFeb && checkLeapYear) {
      return dayFebLeapYear;
    } else if (checkFeb && !checkLeapYear) {
      return dayFeb;
    } else {
      return days;
    }
  };

  const setDataType = () => {
    if (minHour24 >= 12) {
      return [{type: 'PM', value: 2}];
    } else if (maxHour24 < 12) {
      return [{type: 'AM', value: 1}];
    } else {
      return typehour;
    }
  };

  const onSetDay = (e) => {
    const _month = month < 10 ? `0${month}` : `${month}`;
    const _day = e < 10 ? `0${e}` : `${e}`;
    setDay(e);
    onChangeDate(`${_day}/${_month}/${year}`);
  };

  const onSetMonth = (e) => {
    const _month = e < 10 ? `0${e}` : `${e}`;
    const _day = day < 10 ? `0${day}` : `${day}`;
    const check30 = month30.find((val) => val.value === e);
    const checkFeb = e === 2;
    const checkLeapYear =
      (year % 100 > 0 && year % 4 === 0) ||
      (year % 100 === 0 && year % 400 === 0);
    if (check30 && day === 31) {
      if (`${year}${_month}30` < min) {
        setDay(minDay);
        setMonth(minMonth);
        onChangeDate(minimumDate);
      } else if (`${year}${_month}30` > max) {
        setDay(maxDay);
        setMonth(maxMonth);
        onChangeDate(maximumDate);
      } else {
        setDay(30);
        setMonth(e);
        onChangeDate(`30/${_month}/${year}`);
      }
    } else if (checkFeb && checkLeapYear && (day === 30 || day === 31)) {
      if (`${year}${_month}29` < min) {
        setDay(minDay);
        setMonth(minMonth);
        onChangeDate(minimumDate);
      } else if (`${year}${_month}29` > max) {
        setDay(maxDay);
        setMonth(maxMonth);
        onChangeDate(maximumDate);
      } else {
        setDay(29);
        setMonth(e);
        onChangeDate(`29/02/${year}`);
      }
    } else if (
      checkFeb &&
      !checkLeapYear &&
      (day === 31 || day === 30 || day === 29)
    ) {
      if (`${year}${_month}28` < min) {
        setDay(minDay);
        setMonth(minMonth);
        onChangeDate(minimumDate);
      } else if (`${year}${_month}28` > max) {
        setDay(maxDay);
        setMonth(maxMonth);
        onChangeDate(maximumDate);
      } else {
        setDay(28);
        setMonth(e);
        onChangeDate(`28/02/${year}`);
      }
    } else {
      if (`${year}${_month}${_day}` < min) {
        setDay(minDay);
        setMonth(minMonth);
        onChangeDate(minimumDate);
      } else if (`${year}${_month}${_day}` > max) {
        setDay(maxDay);
        setMonth(maxMonth);
        onChangeDate(maximumDate);
      } else {
        setMonth(e);
        onChangeDate(`${_day}/${_month}/${year}`);
      }
    }
  };

  const onSetYear = (e) => {
    const _day = day < 10 ? `0${day}` : `${day}`;
    const _month = month < 10 ? `0${month}` : `${month}`;
    const checkFeb = month === 2;
    const checkLeapYear =
      (e % 100 > 0 && e % 4 === 0) || (e % 100 === 0 && e % 400 === 0);
    if (checkFeb && !checkLeapYear && day === 29) {
      if (`${e}${_month}28` < min) {
        setDay(minDay);
        setMonth(minMonth);
        setYear(e);
        onChangeDate(minimumDate);
      } else if (`${e}${_month}28` > max) {
        setDay(maxDay);
        setMonth(maxMonth);
        setYear(e);
        onChangeDate(maximumDate);
      } else {
        setDay(28);
        onChangeDate(`28/${_month}/${e}`);
        setYear(e);
      }
    } else {
      if (`${e}${_month}${_day}` < min) {
        setDay(minDay);
        setMonth(minMonth);
        setYear(e);
        onChangeDate(minimumDate);
      } else if (`${e}${_month}${_day}` > max) {
        setDay(maxDay);
        setMonth(maxMonth);
        setYear(e);
        onChangeDate(maximumDate);
      } else {
        onChangeDate(`${_day}/${_month}/${e}`);
        setYear(e);
      }
    }
  };

  const onSetHour = (e) => {
    const h = e < 10 ? `0${e}` : `${e}`;
    const h12 = type === 'PM' ? e + 12 : e;
    const m = minute < 10 ? `0${minute}` : `${minute}`;
    const maxH24 = maxHour24 < 10 ? `0${maxHour24}` : `${maxHour24}`;
    const minH24 = minHour24 < 10 ? `0${minHour24}` : `${minHour24}`;
    const maxH = maxHour12 < 10 ? `0${maxHour12}` : `${maxHour12}`;
    const minH = minHour12 < 10 ? `0${minHour12}` : `${minHour12}`;
    const maxM = maxMinute < 10 ? `0${maxMinute}` : `${maxMinute}`;
    const minM = minMinute < 10 ? `0${minMinute}` : `${minMinute}`;

    if (is24h) {
      if (e > maxHour24 || (e === maxHour24 && minute > maxMinute)) {
        setHour24(maxHour24);
        setMinute(maxMinute);
        onChangeTime(`${maxH24}:${maxM}`);
      } else if (e < minHour24 || (e === minHour24 && minute < minMinute)) {
        setHour24(minHour24);
        setMinute(minMinute);
        onChangeTime(`${minH24}:${minM}`);
      } else {
        setHour24(e);
        onChangeTime(`${h}:${m}`);
      }
    } else {
      if (h12 > maxHour24 || (h12 === maxHour24 && minute > maxMinute)) {
        setHour12(maxHour12);
        setMinute(maxMinute);
        onChangeTime(`${maxH}:${maxM} ${maxType}`);
      } else if (h12 < minHour24 || (h12 === minHour24 && minute < minMinute)) {
        setHour12(minHour12);
        setMinute(minMinute);
        onChangeTime(`${minH}:${minM} ${minType}`);
      } else {
        setHour12(e);
        e === 0
          ? onChangeTime(`12:${m} ${type}`)
          : onChangeTime(`${h}:${m} ${type}`);
      }
    }
  };

  const onSetMinute = (e) => {
    const m = e < 10 ? `0${e}` : `${e}`;
    const h24 = hour24 < 10 ? `0${hour24}` : `${hour24}`;
    const h12 = hour12 < 10 ? `0${hour12}` : `${hour12}`;
    setMinute(e);
    is24h ? onChangeTime(`${h24}:${m}`) : onChangeTime(`${h12}:${m} ${type}`);
  };

  const onSetType = (e) => {
    const _type = e === 1 ? 'AM' : 'PM';
    const h12_ = e === 2 ? hour12 + 12 : hour12;
    const h12 = hour12 < 10 ? `0${hour12}` : `${hour12}`;
    const m = minute < 10 ? `0${minute}` : `${minute}`;
    const maxH = maxHour12 < 10 ? `0${maxHour12}` : `${maxHour12}`;
    const minH = minHour12 < 10 ? `0${minHour12}` : `${minHour12}`;
    const maxM = maxMinute < 10 ? `0${maxMinute}` : `${maxMinute}`;
    const minM = minMinute < 10 ? `0${minMinute}` : `${minMinute}`;

    if (h12_ > maxHour24 || (h12_ === maxHour24 && minute > maxMinute)) {
      setType(_type);
      setType_(e);
      setHour12(maxHour12);
      setMinute(maxMinute);
      onChangeTime(`${maxH}:${maxM} ${_type}`);
    } else if (h12_ < minHour24 || (h12_ === minHour24 && minute < minMinute)) {
      setType(_type);
      setType_(e);
      setHour12(minHour12);
      setMinute(minMinute);
      onChangeTime(`${minH}:${minM} ${_type}`);
    } else {
      setType(_type);
      setType_(e);
      hour12 === 0
        ? onChangeTime(`12:${m} ${_type}`)
        : onChangeTime(`${h12}:${m} ${_type}`);
    }
  };

  return (
    <>
      {timeMode && (
        <View style={styles.flexRow}>
          <View style={styles.column}>
            <Text style={styles.txtTitle}>Giờ</Text>
            <Picker
              selectedValue={is24h ? hour24 : hour12}
              style={styles.pickerYear}
              itemStyle={styles.itemStyle}
              onValueChange={(itemValue, itemIndex) => onSetHour(itemValue)}>
              {(is24h ? hours24h : hours12h).map((e) => (
                <Picker.Item label={e.label} value={e.value} key={e.label} />
              ))}
            </Picker>
          </View>
          <View style={styles.column}>
            <Text style={styles.txtTitle}>Phút</Text>
            <Picker
              selectedValue={minute}
              style={styles.pickerYear}
              itemStyle={styles.itemStyle}
              onValueChange={(itemValue, itemIndex) => onSetMinute(itemValue)}>
              {minutes.map((e) => (
                <Picker.Item label={e.label} value={e.value} key={e.label} />
              ))}
            </Picker>
          </View>
          {!is24h && (
            <View style={styles.column}>
              <Text style={styles.txtTitle} />
              <Picker
                selectedValue={type_}
                style={styles.pickerYear}
                itemStyle={styles.itemStyle}
                onValueChange={(itemValue, itemIndex) => onSetType(itemValue)}>
                {setDataType().map((e) => (
                  <Picker.Item label={e.type} value={e.value} key={e.type} />
                ))}
              </Picker>
            </View>
          )}
        </View>
      )}
      <View style={styles.flexRow}>
        {dayMode && (
          <View style={styles.column}>
            <Text style={styles.txtTitle}>Ngày</Text>
            <Picker
              selectedValue={day}
              style={styles.pickerYear}
              itemStyle={styles.itemStyle}
              onValueChange={(itemValue, itemIndex) => onSetDay(itemValue)}>
              {setData().map((e) => (
                <Picker.Item label={e.label} value={e.value} key={e.label} />
              ))}
            </Picker>
          </View>
        )}
        {monthMode && (
          <>
            <View style={styles.column}>
              <Text style={styles.txtTitle}>Tháng</Text>
              <Picker
                selectedValue={month}
                style={styles.pickerMonth}
                itemStyle={styles.itemStyle}
                onValueChange={(itemValue, itemIndex) => onSetMonth(itemValue)}>
                {months.map((e) => (
                  <Picker.Item label={e.label} value={e.value} key={e.label} />
                ))}
              </Picker>
            </View>
            <View style={styles.column}>
              <Text style={styles.txtTitle}>Năm</Text>
              <Picker
                selectedValue={year}
                itemStyle={styles.itemStyle}
                style={styles.pickerYear}
                onValueChange={(itemValue, itemIndex) => onSetYear(itemValue)}>
                {years.map((e) => (
                  <Picker.Item label={e.label} value={e.value} key={e.label} />
                ))}
              </Picker>
            </View>
          </>
        )}
      </View>
    </>
  );
};

interface Props {
  mode?: String;
  value?: String;
  is24h?: Boolean;
  onChangeTime?: () => void;
  onChangeDate?: () => void;
  maximumDate?: String;
  minimumDate?: String;
}

PickerAndroid.defaultProps = {
  mode: 'date',
  is24h: true,
  maximumDate: '24/09/2021',
  minimumDate: '03/03/2020',
  maximumTime: '21:16',
  minimumTime: '00:01',
};
export default PickerAndroid;

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
  itemStyle: {
    color: 'black',
    fontSize: 22,
  },
  txtTitle: {
    fontSize: 16,
  },
});
