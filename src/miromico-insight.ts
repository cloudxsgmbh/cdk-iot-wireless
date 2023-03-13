import * as path from 'path';
import { Fn, Stack } from 'aws-cdk-lib';
import { Role, ServicePrincipal, PolicyDocument, PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';
import { CfnTopicRule } from 'aws-cdk-lib/aws-iot';
import { CfnDeviceProfile, CfnServiceProfile } from 'aws-cdk-lib/aws-iotwireless';
//import { Function, Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { IAWSIotProfiles } from './awsIotProfiles';

/**
 * Properties for a PayloadDecoderTopic.
 *
 * @stability stable
 */
export interface IMiromicoInsightPayloadDecoderRuleProps {
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
export class MiromicoInsightPayloadDecoderRule extends Construct {

  /**
   * returns the IoT rule name, which can be used as a topic to send encoded sensor data to
   */
  public readonly ruleName: string;

  constructor(scope: Construct, id: string, props: IMiromicoInsightPayloadDecoderRuleProps) {
    super(scope, id);

    const stack = Stack.of(this);

    /* Lambda: Decode function */
    const decoderLambda = new NodejsFunction(this, 'decoder', {
      entry: path.join(__dirname, '../lambda/decoderMiromicoInsight/decoder.ts'),
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

    /* IoT rule that acts as a topic. It takes the payload, decodes it with the help of the lambda and republishes to a topic */
    const rule = new CfnTopicRule(this, 'rule', {
      topicRulePayload: {
        description: 'Decodes the payload of a Miromico Insight and republishes it to another MQTT topic',
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

/**
 * Creates a device and a service profile for Miromico Insight Sensors
 */
export class MiromicoInsightProfiles extends Construct {

  /**
   * Device profile ID for MiromicoInsight
   */
  public readonly deviceProfile: string;
  /**
   * Service profile ID for MiromicoInsight
   */
  public readonly serviceProfile: string;

  private options: IAWSIotProfiles;

  constructor(scope: Construct, id: string, props?: IAWSIotProfiles) {
    super(scope, id);

    /* set default options - https://docs.miromico.ch/miro-insight/quickstart.html */
    const defaultOptions: IAWSIotProfiles = {
      dpProfileName: 'Miromico Insight',
      rfRegion: 'EU868',
      macVersion: '1.0.3',
      regParamsRevision: 'Regional Parameters v1.0.2rB',
      maxEirp: 15,
      supportsJoin: true,
      spProfileName: 'Miromico Insight',
      spAddGWMetaData: true,
    };
    this.options = { ...defaultOptions, ...props };

    /* Device Profile for sensors */
    const dp = new CfnDeviceProfile(this, 'devProfile', {
      name: this.options.dpProfileName,
      loRaWan: {
        rfRegion: this.options.rfRegion,
        macVersion: this.options.macVersion,
        regParamsRevision: this.options.regParamsRevision,
        maxEirp: this.options.maxEirp,
        supportsJoin: this.options.supportsJoin,
      },
    });
    this.deviceProfile = Fn.ref(dp.logicalId);

    const sp = new CfnServiceProfile(this, 'serviceProfile', {
      name: this.options.spProfileName,
      loRaWan: { addGwMetadata: this.options.spAddGWMetaData },
    });
    this.serviceProfile = Fn.ref(sp.logicalId);
  }
}