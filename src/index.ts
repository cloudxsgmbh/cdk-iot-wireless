import { Role, ManagedPolicy, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

/**
 * Creates a role called 'IoTWirelessGatewayCertManagerRole' that is needed by the IoT Wireless gateway
 * https://docs.aws.amazon.com/iot/latest/developerguide/connect-iot-lorawan-rfregion-permissions.html#connect-iot-lorawan-onboard-permissions
 */
export class IotWirelessGatewayRole extends Construct {
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