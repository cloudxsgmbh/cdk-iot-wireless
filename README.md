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

## Dragino LHT65 decoder

The Dragino sensor transmits an encoded payload. To decode it we use a IoT topic that decodes the payload with a Lambda function and republishes it to another topic. You can use the returned `ruleName` as a destination for Iot Wireless Devices.

```typescript
const rule = new LHT65PayloadDecoderRule(this, "decoder", {});

new CfnOutput(this, "ruleName", {
  value: rule.ruleName,
});
```
