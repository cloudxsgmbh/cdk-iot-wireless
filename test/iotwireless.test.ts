import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { IotWirelessGatewayRole } from '../src/index';

test('create app', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  new IotWirelessGatewayRole(stack, 'TestStack');

  const template = Template.fromStack( stack );
  template.hasResource('AWS::IAM::Role', {

  });
});