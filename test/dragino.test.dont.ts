import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { LHT65PayloadDecoderRule } from '../src/index';


const app = new cdk.App();
const stack = new cdk.Stack(app);


test('IoT Wireless Dragino decoder', () => {

  new LHT65PayloadDecoderRule (stack, 'decoder', {});

  const template = Template.fromStack( stack );

  template.hasResourceProperties('AWS::IAM::Role', {
    AssumeRolePolicyDocument: {
      Statement: Match.arrayWith([{
        Action: 'sts:AssumeRole',
        Effect: 'Allow',
        Principal: {
          Service: 'lambda.amazonaws.com',
        },
      }]),
    },
  });

  template.hasResourceProperties('AWS::Lambda::Function', {
    Handler: 'index.handler',
  });
});