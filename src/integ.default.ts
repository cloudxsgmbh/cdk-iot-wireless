import * as cdk from 'aws-cdk-lib';
import { LHT65PayloadDecoderRule } from './draginoLHT65';
import { GatewayCertManagerIamRole } from './index';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'MyStack');

new GatewayCertManagerIamRole(stack, 'GatewayIamRole');
new LHT65PayloadDecoderRule(stack, 'rule', {});