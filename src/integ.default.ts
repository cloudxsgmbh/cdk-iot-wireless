import * as cdk from 'aws-cdk-lib';
import { IotWirelessGatewayRole } from './index';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'MyStack');

new IotWirelessGatewayRole(stack, 'IotWirelessGatewayRole');