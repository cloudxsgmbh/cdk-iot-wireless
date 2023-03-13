/**
 * Properties for AWS Iot Profiles.
 *
 * @stability stable
 */
export interface IAWSIotProfiles {
  /**
   * The name of the device profile.
   */
  readonly dpProfileName?: string;
  /**
   * The frequency band (RFRegion) value.
   *
   * @default 'EU868'
   * @stability stable
   */
  readonly rfRegion?: 'AU915'|'EU868'|'US915'|'AS923-1';
  /**
   * MAC version
   * @default '1.0.3'
   */
  readonly macVersion?: '1.0.2'|'1.0.3'|'1.1';
  /**
   * Regional parameters version
   * @default 'RP002-1.0.1'
   */
  readonly regParamsRevision?: 'LoRaWAN v1.0.1'|'Regional Parameters v1.0.2rB'|'Regional Parameters v1.0.3rA'|'Regional Parameters v1.1rA'|'RP002-1.0.0'|'RP002-1.0.1';
  /**
   * MaxEIRP
   * @default 15
   */
  readonly maxEirp?: number;
  /**
   * Supports Join
   *
   * Choose to enter the values for Join support (OTAA) or not (ABP).
   *
   * @default true
   */
  readonly supportsJoin?: boolean;
  /**
   * Service profile name
   * @default none
   */
  readonly spProfileName?: string;
  /**
   * Service profile - Add additional gateway metadata (RSSI, SNR, GW geoloc., etc.) to the packets sent by devices.
   * @default true
   */
  readonly spAddGWMetaData?: boolean;
}