import * as path from 'path';
import { Fn, Stack, Duration } from 'aws-cdk-lib';
import { Role, ServicePrincipal, PolicyDocument, PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';
import { CfnTopicRule } from 'aws-cdk-lib/aws-iot';
import { CfnDeviceProfile, CfnServiceProfile } from 'aws-cdk-lib/aws-iotwireless';
import { Function, Code, Runtime } from 'aws-cdk-lib/aws-lambda';
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

/**
 * Creates a Lambda function that sends a payload to all available LoRaWAN devices.
 * Currently it allows only adjusting the interval of the devices.
 */
export class LHT65DownlinkPayloadLambda extends Construct {

  constructor(scope: Construct, id: string) {
    super(scope, id);

    /* lambda to send Downlink payload to the LoRaWAN devices */
    const lsendDlPl = new Function(this, 'sendDownlinkPayload', {
      code: Code.fromAsset(path.join(__dirname, '../lambda/sendDownlinkPayload')),
      runtime: Runtime.PYTHON_3_9,
      handler: 'index.lambda_handler',
      timeout: Duration.seconds(29),
      logRetention: RetentionDays.ONE_MONTH,
    });
    /* allow lambda to send data to LoRaWAN devices */
    lsendDlPl.addToRolePolicy(new PolicyStatement({
      actions: [
        'iotwireless:SendDataToWirelessDevice',
        'iotwireless:ListWirelessDevices',
      ],
      effect: Effect.ALLOW,
      resources: ['*'],
    }));

    /* grant the iot rule to invoke the lambdas */
    //lsendDlPl.grantInvoke(new ServicePrincipal('iot.amazonaws.com'));

    /* Rule to encode payload and send it via downlink to the LoRaWAN device */
    /*     new CfnTopicRule(this, 'ruleDownlinkPayload', {
      topicRulePayload: {
        description: 'Sends downlink payload to a LoRaWAN device',
        sql: `SELECT aws_lambda("${lsendDlPl.functionArn}", {"TransmitMode": 1, "FPort": 2, "WirelessDeviceId": topic(3), "PayloadData":  encode(*, 'base64')}) as sendresult FROM 'cmd/downlink/#'`,
        awsIotSqlVersion: '2016-03-23',
        actions: [{
          republish: {
            topic: 'downlink/status/${topic(3)}',
            roleArn: props.republishRole.roleArn,
          },
        }],
      },
    }); */

  }
}
/**
 * Properties for LHT65 Profiles.
 *
 * @stability stable
 */
export interface ILHT65ProfilesProps {
  /**
   * The frequency band (RFRegion) value.
   *
   * @default 'EU868'
   * @stability stable
   */
  readonly rfRegion?: 'AU915'|'EU868'|'US915'|'AS923-1';
  /**
   * MAC version
   * @default '1.0.3'
   */
  readonly macVersion?: '1.0.2'|'1.0.3'|'1.1';
  /**
   * Regional parameters version
   * @default 'RP002-1.0.1'
   */
  readonly regParamsRevision?: 'LoRaWAN v1.0.1'|'Regional Parameters v1.0.2rB'|'Regional Parameters v1.0.3rA'|'Regional Parameters v1.1rA'|'RP002-1.0.0'|'RP002-1.0.1';
  /**
   * MaxEIRP
   * @default 15
   */
  readonly maxEirp?: number;
  /**
   * Supports Join
   *
   * Choose to enter the values for Join support (OTAA) or not (ABP).
   *
   * @default true
   */
  readonly supportsJoin?: boolean;
  /**
   * Service profile name
   * @default none
   */
  readonly spProfileName?: string;
  /**
   * Service profile - Add additional gateway metadata (RSSI, SNR, GW geoloc., etc.) to the packets sent by devices.
   * @default true
   */
  readonly spAddGWMetaData?: boolean;
}
/**
 * Creates a device and a service profile for Dragino LHT65 Temperature Sensors
 */
export class LHT65Profiles extends Construct {

  /**
   * Device profile ID for LHT65 sensors
   */
  public readonly deviceProfile: string;
  /**
   * Service profile ID for LHT65 sensors
   */
  public readonly serviceProfile: string;

  private options: ILHT65ProfilesProps;

  constructor(scope: Construct, id: string, props?: ILHT65ProfilesProps) {
    super(scope, id);

    /* set default options */
    const defaultOptions: ILHT65ProfilesProps = {
      rfRegion: 'EU868',
      macVersion: '1.0.3',
      regParamsRevision: 'RP002-1.0.1',
      maxEirp: 15,
      supportsJoin: true,
      spProfileName: '',
      spAddGWMetaData: true,
    };
    this.options = { ...defaultOptions, ...props };

    /* Device Profile for sensors - https://wiki.dragino.com/index.php?title=Notes_for_AWS-IoT-Core#CREATE_DEVICE_PROFILE*/
    const dp = new CfnDeviceProfile(this, 'devProfile', {
      name: 'Dragino LHT65 Temperature Sensor',
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