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

# Development
## How to apply changes
- Make sure you have the latest commits locally pulled (Github actions create new commits on the server).
- make your changes
  - If there are only commits with _fix:_ prefix, projen bumps only the _PATCH_ version.
  - If there is at least one commit with _feat:_ prefix, projen bumps the _MINOR_ version
- run the command `yarn build` locally
- commit the latest changes
- `git push` your changes
# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### DestinationIamRole <a name="DestinationIamRole" id="@cloudxs/cdk-iot-wireless.DestinationIamRole"></a>

Grants all Wireless Destinations to forward messages to IoT rules (aka MQTT topics).

#### Initializers <a name="Initializers" id="@cloudxs/cdk-iot-wireless.DestinationIamRole.Initializer"></a>

```typescript
import { DestinationIamRole } from '@cloudxs/cdk-iot-wireless'

new DestinationIamRole(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.DestinationIamRole.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@cloudxs/cdk-iot-wireless.DestinationIamRole.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cloudxs/cdk-iot-wireless.DestinationIamRole.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@cloudxs/cdk-iot-wireless.DestinationIamRole.Initializer.parameter.id"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.DestinationIamRole.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cloudxs/cdk-iot-wireless.DestinationIamRole.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.DestinationIamRole.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cloudxs/cdk-iot-wireless.DestinationIamRole.isConstruct"></a>

```typescript
import { DestinationIamRole } from '@cloudxs/cdk-iot-wireless'

DestinationIamRole.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cloudxs/cdk-iot-wireless.DestinationIamRole.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.DestinationIamRole.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@cloudxs/cdk-iot-wireless.DestinationIamRole.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.Role</code> | IAM Role object. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cloudxs/cdk-iot-wireless.DestinationIamRole.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `role`<sup>Required</sup> <a name="role" id="@cloudxs/cdk-iot-wireless.DestinationIamRole.property.role"></a>

```typescript
public readonly role: Role;
```

- *Type:* aws-cdk-lib.aws_iam.Role

IAM Role object.

---


### Gateway <a name="Gateway" id="@cloudxs/cdk-iot-wireless.Gateway"></a>

Creates an IoT Wireless Gateway.

#### Initializers <a name="Initializers" id="@cloudxs/cdk-iot-wireless.Gateway.Initializer"></a>

```typescript
import { Gateway } from '@cloudxs/cdk-iot-wireless'

new Gateway(scope: Construct, id: string, props: IGatewayProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.Gateway.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@cloudxs/cdk-iot-wireless.Gateway.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@cloudxs/cdk-iot-wireless.Gateway.Initializer.parameter.props">props</a></code> | <code><a href="#@cloudxs/cdk-iot-wireless.IGatewayProps">IGatewayProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cloudxs/cdk-iot-wireless.Gateway.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@cloudxs/cdk-iot-wireless.Gateway.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@cloudxs/cdk-iot-wireless.Gateway.Initializer.parameter.props"></a>

- *Type:* <a href="#@cloudxs/cdk-iot-wireless.IGatewayProps">IGatewayProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.Gateway.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cloudxs/cdk-iot-wireless.Gateway.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.Gateway.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cloudxs/cdk-iot-wireless.Gateway.isConstruct"></a>

```typescript
import { Gateway } from '@cloudxs/cdk-iot-wireless'

Gateway.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cloudxs/cdk-iot-wireless.Gateway.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.Gateway.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cloudxs/cdk-iot-wireless.Gateway.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### GatewayCertManagerIamRole <a name="GatewayCertManagerIamRole" id="@cloudxs/cdk-iot-wireless.GatewayCertManagerIamRole"></a>

Creates a role called 'IoTWirelessGatewayCertManagerRole' that is needed by the IoT Wireless gateway.

> [https://docs.aws.amazon.com/iot/latest/developerguide/connect-iot-lorawan-rfregion-permissions.html#connect-iot-lorawan-onboard-permissions](https://docs.aws.amazon.com/iot/latest/developerguide/connect-iot-lorawan-rfregion-permissions.html#connect-iot-lorawan-onboard-permissions)

#### Initializers <a name="Initializers" id="@cloudxs/cdk-iot-wireless.GatewayCertManagerIamRole.Initializer"></a>

```typescript
import { GatewayCertManagerIamRole } from '@cloudxs/cdk-iot-wireless'

new GatewayCertManagerIamRole(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.GatewayCertManagerIamRole.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@cloudxs/cdk-iot-wireless.GatewayCertManagerIamRole.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cloudxs/cdk-iot-wireless.GatewayCertManagerIamRole.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@cloudxs/cdk-iot-wireless.GatewayCertManagerIamRole.Initializer.parameter.id"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.GatewayCertManagerIamRole.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cloudxs/cdk-iot-wireless.GatewayCertManagerIamRole.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.GatewayCertManagerIamRole.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cloudxs/cdk-iot-wireless.GatewayCertManagerIamRole.isConstruct"></a>

```typescript
import { GatewayCertManagerIamRole } from '@cloudxs/cdk-iot-wireless'

GatewayCertManagerIamRole.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cloudxs/cdk-iot-wireless.GatewayCertManagerIamRole.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.GatewayCertManagerIamRole.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cloudxs/cdk-iot-wireless.GatewayCertManagerIamRole.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### LHT65DownlinkPayloadLambda <a name="LHT65DownlinkPayloadLambda" id="@cloudxs/cdk-iot-wireless.LHT65DownlinkPayloadLambda"></a>

Creates a Lambda function that sends a payload to all available LoRaWAN devices.

Currently it allows only adjusting the interval of the devices.

#### Initializers <a name="Initializers" id="@cloudxs/cdk-iot-wireless.LHT65DownlinkPayloadLambda.Initializer"></a>

```typescript
import { LHT65DownlinkPayloadLambda } from '@cloudxs/cdk-iot-wireless'

new LHT65DownlinkPayloadLambda(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.LHT65DownlinkPayloadLambda.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@cloudxs/cdk-iot-wireless.LHT65DownlinkPayloadLambda.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cloudxs/cdk-iot-wireless.LHT65DownlinkPayloadLambda.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@cloudxs/cdk-iot-wireless.LHT65DownlinkPayloadLambda.Initializer.parameter.id"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.LHT65DownlinkPayloadLambda.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cloudxs/cdk-iot-wireless.LHT65DownlinkPayloadLambda.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.LHT65DownlinkPayloadLambda.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cloudxs/cdk-iot-wireless.LHT65DownlinkPayloadLambda.isConstruct"></a>

```typescript
import { LHT65DownlinkPayloadLambda } from '@cloudxs/cdk-iot-wireless'

LHT65DownlinkPayloadLambda.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cloudxs/cdk-iot-wireless.LHT65DownlinkPayloadLambda.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.LHT65DownlinkPayloadLambda.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cloudxs/cdk-iot-wireless.LHT65DownlinkPayloadLambda.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### LHT65PayloadDecoderRule <a name="LHT65PayloadDecoderRule" id="@cloudxs/cdk-iot-wireless.LHT65PayloadDecoderRule"></a>

Creates an IoT Wireless Rule.

It decodes the encoded Payload from Dragino Sensors and republishes it to a topic.

#### Initializers <a name="Initializers" id="@cloudxs/cdk-iot-wireless.LHT65PayloadDecoderRule.Initializer"></a>

```typescript
import { LHT65PayloadDecoderRule } from '@cloudxs/cdk-iot-wireless'

new LHT65PayloadDecoderRule(scope: Construct, id: string, props: ILHT65PayloadDecoderRuleProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.LHT65PayloadDecoderRule.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@cloudxs/cdk-iot-wireless.LHT65PayloadDecoderRule.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@cloudxs/cdk-iot-wireless.LHT65PayloadDecoderRule.Initializer.parameter.props">props</a></code> | <code><a href="#@cloudxs/cdk-iot-wireless.ILHT65PayloadDecoderRuleProps">ILHT65PayloadDecoderRuleProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cloudxs/cdk-iot-wireless.LHT65PayloadDecoderRule.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@cloudxs/cdk-iot-wireless.LHT65PayloadDecoderRule.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@cloudxs/cdk-iot-wireless.LHT65PayloadDecoderRule.Initializer.parameter.props"></a>

- *Type:* <a href="#@cloudxs/cdk-iot-wireless.ILHT65PayloadDecoderRuleProps">ILHT65PayloadDecoderRuleProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.LHT65PayloadDecoderRule.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cloudxs/cdk-iot-wireless.LHT65PayloadDecoderRule.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.LHT65PayloadDecoderRule.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cloudxs/cdk-iot-wireless.LHT65PayloadDecoderRule.isConstruct"></a>

```typescript
import { LHT65PayloadDecoderRule } from '@cloudxs/cdk-iot-wireless'

LHT65PayloadDecoderRule.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cloudxs/cdk-iot-wireless.LHT65PayloadDecoderRule.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.LHT65PayloadDecoderRule.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@cloudxs/cdk-iot-wireless.LHT65PayloadDecoderRule.property.ruleName">ruleName</a></code> | <code>string</code> | returns the IoT rule name, which can be used as a topic to send encoded sensor data to. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cloudxs/cdk-iot-wireless.LHT65PayloadDecoderRule.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `ruleName`<sup>Required</sup> <a name="ruleName" id="@cloudxs/cdk-iot-wireless.LHT65PayloadDecoderRule.property.ruleName"></a>

```typescript
public readonly ruleName: string;
```

- *Type:* string

returns the IoT rule name, which can be used as a topic to send encoded sensor data to.

---


### LHT65Profiles <a name="LHT65Profiles" id="@cloudxs/cdk-iot-wireless.LHT65Profiles"></a>

Creates a device and a service profile for Dragino LHT65 Temperature Sensors.

#### Initializers <a name="Initializers" id="@cloudxs/cdk-iot-wireless.LHT65Profiles.Initializer"></a>

```typescript
import { LHT65Profiles } from '@cloudxs/cdk-iot-wireless'

new LHT65Profiles(scope: Construct, id: string, props?: IAWSIotProfiles)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.LHT65Profiles.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@cloudxs/cdk-iot-wireless.LHT65Profiles.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@cloudxs/cdk-iot-wireless.LHT65Profiles.Initializer.parameter.props">props</a></code> | <code><a href="#@cloudxs/cdk-iot-wireless.IAWSIotProfiles">IAWSIotProfiles</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cloudxs/cdk-iot-wireless.LHT65Profiles.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@cloudxs/cdk-iot-wireless.LHT65Profiles.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="@cloudxs/cdk-iot-wireless.LHT65Profiles.Initializer.parameter.props"></a>

- *Type:* <a href="#@cloudxs/cdk-iot-wireless.IAWSIotProfiles">IAWSIotProfiles</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.LHT65Profiles.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cloudxs/cdk-iot-wireless.LHT65Profiles.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.LHT65Profiles.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cloudxs/cdk-iot-wireless.LHT65Profiles.isConstruct"></a>

```typescript
import { LHT65Profiles } from '@cloudxs/cdk-iot-wireless'

LHT65Profiles.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cloudxs/cdk-iot-wireless.LHT65Profiles.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.LHT65Profiles.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@cloudxs/cdk-iot-wireless.LHT65Profiles.property.deviceProfile">deviceProfile</a></code> | <code>string</code> | Device profile ID for LHT65 sensors. |
| <code><a href="#@cloudxs/cdk-iot-wireless.LHT65Profiles.property.serviceProfile">serviceProfile</a></code> | <code>string</code> | Service profile ID for LHT65 sensors. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cloudxs/cdk-iot-wireless.LHT65Profiles.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `deviceProfile`<sup>Required</sup> <a name="deviceProfile" id="@cloudxs/cdk-iot-wireless.LHT65Profiles.property.deviceProfile"></a>

```typescript
public readonly deviceProfile: string;
```

- *Type:* string

Device profile ID for LHT65 sensors.

---

##### `serviceProfile`<sup>Required</sup> <a name="serviceProfile" id="@cloudxs/cdk-iot-wireless.LHT65Profiles.property.serviceProfile"></a>

```typescript
public readonly serviceProfile: string;
```

- *Type:* string

Service profile ID for LHT65 sensors.

---


### MiromicoInsightPayloadDecoderRule <a name="MiromicoInsightPayloadDecoderRule" id="@cloudxs/cdk-iot-wireless.MiromicoInsightPayloadDecoderRule"></a>

Creates an IoT Wireless Rule.

It decodes the encoded Payload from Dragino Sensors and republishes it to a topic.

#### Initializers <a name="Initializers" id="@cloudxs/cdk-iot-wireless.MiromicoInsightPayloadDecoderRule.Initializer"></a>

```typescript
import { MiromicoInsightPayloadDecoderRule } from '@cloudxs/cdk-iot-wireless'

new MiromicoInsightPayloadDecoderRule(scope: Construct, id: string, props: IMiromicoInsightPayloadDecoderRuleProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.MiromicoInsightPayloadDecoderRule.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@cloudxs/cdk-iot-wireless.MiromicoInsightPayloadDecoderRule.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@cloudxs/cdk-iot-wireless.MiromicoInsightPayloadDecoderRule.Initializer.parameter.props">props</a></code> | <code><a href="#@cloudxs/cdk-iot-wireless.IMiromicoInsightPayloadDecoderRuleProps">IMiromicoInsightPayloadDecoderRuleProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cloudxs/cdk-iot-wireless.MiromicoInsightPayloadDecoderRule.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@cloudxs/cdk-iot-wireless.MiromicoInsightPayloadDecoderRule.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@cloudxs/cdk-iot-wireless.MiromicoInsightPayloadDecoderRule.Initializer.parameter.props"></a>

- *Type:* <a href="#@cloudxs/cdk-iot-wireless.IMiromicoInsightPayloadDecoderRuleProps">IMiromicoInsightPayloadDecoderRuleProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.MiromicoInsightPayloadDecoderRule.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cloudxs/cdk-iot-wireless.MiromicoInsightPayloadDecoderRule.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.MiromicoInsightPayloadDecoderRule.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cloudxs/cdk-iot-wireless.MiromicoInsightPayloadDecoderRule.isConstruct"></a>

```typescript
import { MiromicoInsightPayloadDecoderRule } from '@cloudxs/cdk-iot-wireless'

MiromicoInsightPayloadDecoderRule.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cloudxs/cdk-iot-wireless.MiromicoInsightPayloadDecoderRule.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.MiromicoInsightPayloadDecoderRule.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@cloudxs/cdk-iot-wireless.MiromicoInsightPayloadDecoderRule.property.ruleName">ruleName</a></code> | <code>string</code> | returns the IoT rule name, which can be used as a topic to send encoded sensor data to. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cloudxs/cdk-iot-wireless.MiromicoInsightPayloadDecoderRule.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `ruleName`<sup>Required</sup> <a name="ruleName" id="@cloudxs/cdk-iot-wireless.MiromicoInsightPayloadDecoderRule.property.ruleName"></a>

```typescript
public readonly ruleName: string;
```

- *Type:* string

returns the IoT rule name, which can be used as a topic to send encoded sensor data to.

---


### MiromicoInsightProfiles <a name="MiromicoInsightProfiles" id="@cloudxs/cdk-iot-wireless.MiromicoInsightProfiles"></a>

Creates a device and a service profile for Miromico Insight Sensors.

#### Initializers <a name="Initializers" id="@cloudxs/cdk-iot-wireless.MiromicoInsightProfiles.Initializer"></a>

```typescript
import { MiromicoInsightProfiles } from '@cloudxs/cdk-iot-wireless'

new MiromicoInsightProfiles(scope: Construct, id: string, props?: IAWSIotProfiles)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.MiromicoInsightProfiles.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@cloudxs/cdk-iot-wireless.MiromicoInsightProfiles.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@cloudxs/cdk-iot-wireless.MiromicoInsightProfiles.Initializer.parameter.props">props</a></code> | <code><a href="#@cloudxs/cdk-iot-wireless.IAWSIotProfiles">IAWSIotProfiles</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cloudxs/cdk-iot-wireless.MiromicoInsightProfiles.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@cloudxs/cdk-iot-wireless.MiromicoInsightProfiles.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="@cloudxs/cdk-iot-wireless.MiromicoInsightProfiles.Initializer.parameter.props"></a>

- *Type:* <a href="#@cloudxs/cdk-iot-wireless.IAWSIotProfiles">IAWSIotProfiles</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.MiromicoInsightProfiles.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cloudxs/cdk-iot-wireless.MiromicoInsightProfiles.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.MiromicoInsightProfiles.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cloudxs/cdk-iot-wireless.MiromicoInsightProfiles.isConstruct"></a>

```typescript
import { MiromicoInsightProfiles } from '@cloudxs/cdk-iot-wireless'

MiromicoInsightProfiles.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cloudxs/cdk-iot-wireless.MiromicoInsightProfiles.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.MiromicoInsightProfiles.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@cloudxs/cdk-iot-wireless.MiromicoInsightProfiles.property.deviceProfile">deviceProfile</a></code> | <code>string</code> | Device profile ID for MiromicoInsight. |
| <code><a href="#@cloudxs/cdk-iot-wireless.MiromicoInsightProfiles.property.serviceProfile">serviceProfile</a></code> | <code>string</code> | Service profile ID for MiromicoInsight. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cloudxs/cdk-iot-wireless.MiromicoInsightProfiles.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `deviceProfile`<sup>Required</sup> <a name="deviceProfile" id="@cloudxs/cdk-iot-wireless.MiromicoInsightProfiles.property.deviceProfile"></a>

```typescript
public readonly deviceProfile: string;
```

- *Type:* string

Device profile ID for MiromicoInsight.

---

##### `serviceProfile`<sup>Required</sup> <a name="serviceProfile" id="@cloudxs/cdk-iot-wireless.MiromicoInsightProfiles.property.serviceProfile"></a>

```typescript
public readonly serviceProfile: string;
```

- *Type:* string

Service profile ID for MiromicoInsight.

---




## Protocols <a name="Protocols" id="Protocols"></a>

### IAWSIotProfiles <a name="IAWSIotProfiles" id="@cloudxs/cdk-iot-wireless.IAWSIotProfiles"></a>

- *Implemented By:* <a href="#@cloudxs/cdk-iot-wireless.IAWSIotProfiles">IAWSIotProfiles</a>

Properties for AWS Iot Profiles.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.IAWSIotProfiles.property.dpProfileName">dpProfileName</a></code> | <code>string</code> | The name of the device profile. |
| <code><a href="#@cloudxs/cdk-iot-wireless.IAWSIotProfiles.property.macVersion">macVersion</a></code> | <code>string</code> | MAC version. |
| <code><a href="#@cloudxs/cdk-iot-wireless.IAWSIotProfiles.property.maxEirp">maxEirp</a></code> | <code>number</code> | MaxEIRP. |
| <code><a href="#@cloudxs/cdk-iot-wireless.IAWSIotProfiles.property.regParamsRevision">regParamsRevision</a></code> | <code>string</code> | Regional parameters version. |
| <code><a href="#@cloudxs/cdk-iot-wireless.IAWSIotProfiles.property.rfRegion">rfRegion</a></code> | <code>string</code> | The frequency band (RFRegion) value. |
| <code><a href="#@cloudxs/cdk-iot-wireless.IAWSIotProfiles.property.spAddGWMetaData">spAddGWMetaData</a></code> | <code>boolean</code> | Service profile - Add additional gateway metadata (RSSI, SNR, GW geoloc., etc.) to the packets sent by devices. |
| <code><a href="#@cloudxs/cdk-iot-wireless.IAWSIotProfiles.property.spProfileName">spProfileName</a></code> | <code>string</code> | Service profile name. |
| <code><a href="#@cloudxs/cdk-iot-wireless.IAWSIotProfiles.property.supportsJoin">supportsJoin</a></code> | <code>boolean</code> | Supports Join. |

---

##### `dpProfileName`<sup>Optional</sup> <a name="dpProfileName" id="@cloudxs/cdk-iot-wireless.IAWSIotProfiles.property.dpProfileName"></a>

```typescript
public readonly dpProfileName: string;
```

- *Type:* string

The name of the device profile.

---

##### `macVersion`<sup>Optional</sup> <a name="macVersion" id="@cloudxs/cdk-iot-wireless.IAWSIotProfiles.property.macVersion"></a>

```typescript
public readonly macVersion: string;
```

- *Type:* string
- *Default:* '1.0.3'

MAC version.

---

##### `maxEirp`<sup>Optional</sup> <a name="maxEirp" id="@cloudxs/cdk-iot-wireless.IAWSIotProfiles.property.maxEirp"></a>

```typescript
public readonly maxEirp: number;
```

- *Type:* number
- *Default:* 15

MaxEIRP.

---

##### `regParamsRevision`<sup>Optional</sup> <a name="regParamsRevision" id="@cloudxs/cdk-iot-wireless.IAWSIotProfiles.property.regParamsRevision"></a>

```typescript
public readonly regParamsRevision: string;
```

- *Type:* string
- *Default:* 'RP002-1.0.1'

Regional parameters version.

---

##### `rfRegion`<sup>Optional</sup> <a name="rfRegion" id="@cloudxs/cdk-iot-wireless.IAWSIotProfiles.property.rfRegion"></a>

```typescript
public readonly rfRegion: string;
```

- *Type:* string
- *Default:* 'EU868'

The frequency band (RFRegion) value.

---

##### `spAddGWMetaData`<sup>Optional</sup> <a name="spAddGWMetaData" id="@cloudxs/cdk-iot-wireless.IAWSIotProfiles.property.spAddGWMetaData"></a>

```typescript
public readonly spAddGWMetaData: boolean;
```

- *Type:* boolean
- *Default:* true

Service profile - Add additional gateway metadata (RSSI, SNR, GW geoloc., etc.) to the packets sent by devices.

---

##### `spProfileName`<sup>Optional</sup> <a name="spProfileName" id="@cloudxs/cdk-iot-wireless.IAWSIotProfiles.property.spProfileName"></a>

```typescript
public readonly spProfileName: string;
```

- *Type:* string
- *Default:* none

Service profile name.

---

##### `supportsJoin`<sup>Optional</sup> <a name="supportsJoin" id="@cloudxs/cdk-iot-wireless.IAWSIotProfiles.property.supportsJoin"></a>

```typescript
public readonly supportsJoin: boolean;
```

- *Type:* boolean
- *Default:* true

Supports Join.

Choose to enter the values for Join support (OTAA) or not (ABP).

---

### IGatewayProps <a name="IGatewayProps" id="@cloudxs/cdk-iot-wireless.IGatewayProps"></a>

- *Implemented By:* <a href="#@cloudxs/cdk-iot-wireless.IGatewayProps">IGatewayProps</a>

Properties for a Gateway.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.IGatewayProps.property.gatewayEui">gatewayEui</a></code> | <code>string</code> | Gateway EUI. |
| <code><a href="#@cloudxs/cdk-iot-wireless.IGatewayProps.property.description">description</a></code> | <code>string</code> | Gateway description. |
| <code><a href="#@cloudxs/cdk-iot-wireless.IGatewayProps.property.rfRegion">rfRegion</a></code> | <code>string</code> | The frequency band (RFRegion) value. |

---

##### `gatewayEui`<sup>Required</sup> <a name="gatewayEui" id="@cloudxs/cdk-iot-wireless.IGatewayProps.property.gatewayEui"></a>

```typescript
public readonly gatewayEui: string;
```

- *Type:* string

Gateway EUI.

---

##### `description`<sup>Optional</sup> <a name="description" id="@cloudxs/cdk-iot-wireless.IGatewayProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Gateway description.

---

##### `rfRegion`<sup>Optional</sup> <a name="rfRegion" id="@cloudxs/cdk-iot-wireless.IGatewayProps.property.rfRegion"></a>

```typescript
public readonly rfRegion: string;
```

- *Type:* string
- *Default:* 'EU868'

The frequency band (RFRegion) value.

---

### ILHT65PayloadDecoderRuleProps <a name="ILHT65PayloadDecoderRuleProps" id="@cloudxs/cdk-iot-wireless.ILHT65PayloadDecoderRuleProps"></a>

- *Implemented By:* <a href="#@cloudxs/cdk-iot-wireless.ILHT65PayloadDecoderRuleProps">ILHT65PayloadDecoderRuleProps</a>

Properties for a PayloadDecoderTopic.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.ILHT65PayloadDecoderRuleProps.property.republishTopic">republishTopic</a></code> | <code>string</code> | Republish topic. |

---

##### `republishTopic`<sup>Optional</sup> <a name="republishTopic" id="@cloudxs/cdk-iot-wireless.ILHT65PayloadDecoderRuleProps.property.republishTopic"></a>

```typescript
public readonly republishTopic: string;
```

- *Type:* string
- *Default:* 'republish/${topic()}'

Republish topic.

The encoded message will be republished to this MQTT topic. For a correct permission granting, please make sure that the first level does not contain a Substitution Template.

---

### IMiromicoInsightPayloadDecoderRuleProps <a name="IMiromicoInsightPayloadDecoderRuleProps" id="@cloudxs/cdk-iot-wireless.IMiromicoInsightPayloadDecoderRuleProps"></a>

- *Implemented By:* <a href="#@cloudxs/cdk-iot-wireless.IMiromicoInsightPayloadDecoderRuleProps">IMiromicoInsightPayloadDecoderRuleProps</a>

Properties for a PayloadDecoderTopic.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudxs/cdk-iot-wireless.IMiromicoInsightPayloadDecoderRuleProps.property.republishTopic">republishTopic</a></code> | <code>string</code> | Republish topic. |

---

##### `republishTopic`<sup>Optional</sup> <a name="republishTopic" id="@cloudxs/cdk-iot-wireless.IMiromicoInsightPayloadDecoderRuleProps.property.republishTopic"></a>

```typescript
public readonly republishTopic: string;
```

- *Type:* string
- *Default:* 'republish/${topic()}'

Republish topic.

The encoded message will be republished to this MQTT topic. For a correct permission granting, please make sure that the first level does not contain a Substitution Template.

---

