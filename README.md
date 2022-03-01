# cdk-iot-wireless

This package contains AWS CDK L2 constructs for IoT Wireless.

## Gateway

For a Gateway being able to work properly, you need a specific [IAM role](https://docs.aws.amazon.com/iot/latest/developerguide/connect-iot-lorawan-rfregion-permissions.html#connect-iot-lorawan-onboard-permissions).

```typescript
new GatewayCertManagerIamRole(this, "GatewayIamRole");
```

Create an IoT Wireless Gateway:

```typescript
new Gateway(this, 'gw', {
  gatewayEui: 'a123123123123123'
  description: 'my gateway'
});
```

## IoT Wireless Devices

### Destinations

To allow IoT Destinations to publish to an IoT rule there is a IAM role required. This role allows all Destinations to publish to all Rules.

```typescript
const destRole = new DestinationIamRole(this, "destRole");
```

## Dragino LHT65 decoder

The Dragino sensor transmits an encoded payload. To decode it we use a IoT topic that decodes the payload with a Lambda function and republishes it to the provided topic by using the [Republish](https://docs.aws.amazon.com/iot/latest/developerguide/republish-rule-action.html) rule action. You can use the returned `ruleName` as a destination for Iot Wireless Devices.

```typescript
const rule = new LHT65PayloadDecoderRule(this, "decoder", {
  republishTopic: "republish/${topic()}",
});

new CfnOutput(this, "ruleName", {
  value: rule.ruleName,
});
```

- `republishTopic`  
  The message will be republished to the provided topic. For permission reasons, do not use [Substitution Templates](https://docs.aws.amazon.com/iot/latest/developerguide/iot-substitution-templates.html) on the first level. Otherwise permissions will not be set correctly.

## Dragino LHT65 Profiles

Creates a Device Profile and a Service Profile for Dragino LHT65 sensors. All properties have a default value that fits with the current generation of sensors, but can be set individually if needed.

```typescript
const lht65profiles = new LHT65Profiles(this, "profiles", {
  rfRegion: "US915",
});
```

## Dragino LHT65 Downlink Payload Lambda

Creates a Lambda function that lets you send a Downlink Payload to the sensors. Currently it's just possible to adjust the intervall of the trasmitted sensor data and it the Lambda function sets it on all available LoRaWAN devices.

```typescript
new LHT65DownlinkPayloadLambda(this, "dlpl");
```

The Lambda can be invoked with a event containing a JSON like this:

```json
{
  "FPort": 2,
  "IntervalInSeconds": "900",
  "TransmitMode": 1
}
```
