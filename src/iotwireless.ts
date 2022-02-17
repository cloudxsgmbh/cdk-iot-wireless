import { Role, ManagedPolicy, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { CfnWirelessGateway } from 'aws-cdk-lib/aws-iotwireless';
import { Construct } from 'constructs';

/**
 * Creates a role called 'IoTWirelessGatewayCertManagerRole' that is needed by the IoT Wireless gateway
 *
 * @see https://docs.aws.amazon.com/iot/latest/developerguide/connect-iot-lorawan-rfregion-permissions.html#connect-iot-lorawan-onboard-permissions
 *
 * @stability stable
 */
export class GatewayCertManagerIamRole extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new Role(this, 'IoTWirelessGatewayCertManagerRole', {
      roleName: 'IoTWirelessGatewayCertManagerRole',
      assumedBy: new ServicePrincipal('iotwireless.amazonaws.com'),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName('AWSIoTWirelessGatewayCertManager'),
      ],
    });

  }
}
/**
 * Properties for a Gateway.
 *
 * @stability stable
 */
export interface IGatewayProps {
  /**
   * Gateway EUI
   */
  readonly gatewayEui: string;
  /**
   * The frequency band (RFRegion) value.
   *
   * @default 'EU868'
   * @stability stable
   */
  readonly rfRegion?: 'AU915'|'EU868'|'US915'|'AS923-1';
  /**
   * Gateway description
   */
  readonly description?: string;
}

/**
 * Creates an IoT Wireless Gateway
 *
 * @stability stable
 */
export class Gateway extends Construct {

  constructor(scope: Construct, id: string, props: IGatewayProps) {
    super(scope, id);

    /* const thing = new CfnThing(this, `ThingWirelessGateway-${props.gatewayEui}`); */

    new CfnWirelessGateway(this, `WirelessGateway-${props.gatewayEui}`, {
      description: props.description,
      loRaWan: {
        gatewayEui: props.gatewayEui,
        rfRegion: props.rfRegion ? props.rfRegion : 'EU868',
      },
      /* Attaching a thing is currently not possible. There is a bug in CloudFormation:
       "Invalid request provided: Attempting to set a ReadOnly Property." */
      /* thingArn: `arn:aws:iot:${this.stack.region}:${this.stack.account}:thing/${Fn.ref(thing.logicalId)}`, */
    });

  }
}