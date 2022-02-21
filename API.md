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




## Protocols <a name="Protocols" id="Protocols"></a>

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

