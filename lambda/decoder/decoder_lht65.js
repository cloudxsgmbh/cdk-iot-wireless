/* eslint-disable */
// Source: http://www.dragino.com/downloads/downloads/LHT65/UserManual/LHT65_Temperature_Humidity_Sensor_UserManual_v1.3.pdf
export function decoder(bytes, port) {
  // Decode an uplink message from a buffer
  // (array) of bytes to an object of fields.
  var value = (bytes[0] << 8 | bytes[1]) & 0x3FFF;
  var batV = value / 1000; //Battery,units:V

  value = bytes[2] << 8 | bytes[3];
  if (bytes[2] & 0x80) {
      value |= 0xFFFF0000;
  }
  var temp_SHT = (value / 100).toFixed(2); //SHT20,temperature,units:°C

  value = bytes[4] << 8 | bytes[5];
  var hum_SHT = (value / 10).toFixed(1); //SHT20,Humidity,units:%

  value = bytes[7] << 8 | bytes[8];
  if (bytes[7] & 0x80) {
      value |= 0xFFFF0000;
  }
  var temp_ds = (value / 100).toFixed(2); //DS18B20,temperature,units:°C



  const ext_sensor_type = {
    "0": "No external sensor",
    "1": "Temperature Sensor",
    "4": "Interrupt Sensor send",
    "5": "Illumination Sensor",
    "6": "ADC Sensor",
    "7": "Interrupt Sensor count",
  }[bytes[6] & 0x7F];



  return {
      BatV: batV,
      TempC_DS: temp_ds,
      TempC_SHT: temp_SHT,
      Hum_SHT: hum_SHT,
      ext_sensor: ext_sensor_type
  };
}