import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Gateway, GatewayCertManagerIamRole } from '../src/index';


const app = new cdk.App();
const stack = new cdk.Stack(app);


test('IoT Wireless Gateway', () => {

  new GatewayCertManagerIamRole(stack, 'TestRole');
  new Gateway(stack, 'gw', {
    gatewayEui: 'testEui1231321',
  });

  const template = Template.fromStack( stack );
  template.hasResourceProperties('AWS::IAM::Role', {
    RoleName: 'IoTWirelessGatewayCertManagerRole',
  });

  template.hasResource('AWS::IoTWireless::WirelessGateway', {});
});