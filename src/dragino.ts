import * as path from 'path';
import { Fn, Stack } from 'aws-cdk-lib';
import { Role, ServicePrincipal, PolicyDocument, PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';
import { CfnTopicRule } from 'aws-cdk-lib/aws-iot';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

/**
 * Properties for a PayloadDecoderTopic.
 *
 * @stability stable
 */
export interface ILHT65PayloadDecoderRuleProps {
  /**
   * Republish topic
   *
   * The encoded message will be republished to this MQTT topic. For a correct permission granting, please make sure that the first level does not contain a Substitution Template.
   *
   * @default 'republish/${topic()}'
   */
  readonly republishTopic?: string;
}
/**
 * Creates an IoT Wireless Rule
 *
 * It decodes the encoded Payload from Dragino Sensors and republishes it to a topic.
 *
 * @stability experimental
 */
export class LHT65PayloadDecoderRule extends Construct {

  /**
   * returns the IoT rule name, which can be used as a topic to send encoded sensor data to
   */
  public readonly ruleName: string;

  constructor(scope: Construct, id: string, props: ILHT65PayloadDecoderRuleProps) {
    super(scope, id);

    const stack = Stack.of(this);

    /* Lambda: Decode function */
    const decoderLambda = new NodejsFunction(this, 'decoder', {
      entry: path.join(__dirname, '../lambda/decoder/decoder.ts'),
      handler: 'handler',
      logRetention: RetentionDays.ONE_MONTH,
    });

    /* grant the iot rule to invoke the lambda */
    decoderLambda.grantInvoke(new ServicePrincipal('iot.amazonaws.com'));

    /* set default topic if necessary */
    const rpTopic = props.republishTopic ? props.republishTopic : 'republish/${topic()}';


    /* create an IAM role that allows the IoT rule to republish to a topic */
    const iotTopicPublishRole = new Role(this, 'iotPublishToTopic', {
      assumedBy: new ServicePrincipal('iot.amazonaws.com'),
      description: 'grants IOT Wireless rule to republish to a topic',
      inlinePolicies: {
        PublishToTopic: new PolicyDocument(
          {
            statements: [
              new PolicyStatement({
                effect: Effect.ALLOW,
                actions: ['iot:Publish'],
                resources: [
                  `arn:aws:iot:${stack.region}:${stack.account}:topic/${rpTopic.split('/')[0]}/*`,
                  //`arn:aws:iot:${stack.region}:${stack.account}:topic/downlink/*`,
                ],
              }),
            ],
          },
        ),
      },
    });

    /* IoT rule that acts as a topic. It takes the Dragino payload, decodes it with the help of the lambda and republishes to a topic */
    const rule = new CfnTopicRule(this, 'rule', {
      topicRulePayload: {
        description: 'Decodes the payload of an Dragino LHT65 and republishes it to another MQTT topic',
        sql: `SELECT aws_lambda("${decoderLambda.functionArn}",{"PayloadData": PayloadData, "WirelessDeviceId": WirelessDeviceId, "WirelessMetadata": WirelessMetadata}) as payload, topic() as topic, timestamp() as timestamp`,
        awsIotSqlVersion: '2016-03-23',
        actions: [
          {
            republish: {
              topic: rpTopic,
              roleArn: iotTopicPublishRole.roleArn,
            },
          },
        ],
      },
    });

    /* get the name of the IoT rule and set it as a class property */
    this.ruleName = Fn.ref(rule.logicalId);

  }
}