import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { Gateway, GatewayCertManagerIamRole, DestinationIamRole } from '../src/index';


const app = new cdk.App();
const stack = new cdk.Stack(app);

/* Resources */
new GatewayCertManagerIamRole(stack, 'TestRole');
new Gateway(stack, 'gw', {
  gatewayEui: 'testEui1231321',
});
new DestinationIamRole(stack, 'destRole');

/* grab cfn template */
const template = Template.fromStack( stack );


test('IoT Wireless Gateway', () => {

  template.hasResourceProperties('AWS::IAM::Role', {
    RoleName: 'IoTWirelessGatewayCertManagerRole',
  });

  template.hasResource('AWS::IoTWireless::WirelessGateway', {});

});


test('Destination Role', () => {
  template.hasResourceProperties('AWS::IAM::Role', {
    AssumeRolePolicyDocument: {
      Statement: Match.arrayWith([{
        Action: 'sts:AssumeRole',
        Effect: 'Allow',
        Principal: {
          Service: 'iotwireless.amazonaws.com',
        },
      }]),
    },
    Policies: Match.arrayWith([
      Match.objectLike({
        PolicyDocument: Match.objectLike({
          Statement: Match.arrayWith([
            Match.objectLike({
              Action: 'iot:Publish',
              Effect: 'Allow',
            }),
            Match.objectEquals({
              Action: 'iot:DescribeEndpoint',
              Effect: 'Allow',
              Resource: '*',
            }),
          ]),
        }),
      }),
    ]),
  });
});


/*
,
    Policies: Match.arrayWith([
      Match.objectLike({
        PolicyDocument: Match.objectLike({
          Statement: Match.arrayWith([
            {
              Action: 'iot:Publish',
              Effect: 'Allow',
              Resource: 'arn:aws:iot:eu-west-1:755341486826:topic/$aws/rules/*',
            },
            {
              Action: 'iot:DescribeEndpoint',
              Effect: 'Allow',
              Resource: '*',
            },
          ]),
        }),
      }),
    ])
*/