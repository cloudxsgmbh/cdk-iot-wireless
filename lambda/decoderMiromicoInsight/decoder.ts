import { decodeUplink } from './decoder/index';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.handler = async function (event: any): Promise<any> {

  console.log('Lambda invocation event: ', JSON.stringify(event));

  /* Decode sensor payload */
  const bytes = Uint8Array.from(Buffer.from(event.PayloadData, 'base64'));
  const result = decodeUplink({bytes, fPort: event.WirelessMetadata.LoRaWAN.FPort});
  
  /* Return sensor data in the same format as the Dragino LHT65 */
  const decodedPayload = {
    BatV: result.data.battery_v,
    TempC_DS: 0,
    TempC_SHT: result.data.temperature[0],
    Hum_SHT: result.data.humidity[0],
    ext_sensor: ''
  };

  console.log('Decoded sensor payload: ', decodedPayload);
  return decodedPayload;

};
