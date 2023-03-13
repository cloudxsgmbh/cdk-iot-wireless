interface IDecoder {
  BatV: string,
  TempC_DS: string,
  TempC_SHT: string,
  Hum_SHT: string,
  ext_sensor: string
}
export declare function decoder(bytes: Uint8Array, port?: number): IDecoder;