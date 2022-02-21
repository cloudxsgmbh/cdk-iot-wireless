# This lambda code is based on an AWS sample:
# https://github.com/aws-samples/aws-iot-core-lorawan/tree/main/send_downlink_payload


# Expected event:

#  {
#   "FPort": 2,
#   "IntervalInSeconds": "900",
#   "TransmitMode": 1
# }

import json
import boto3
import traceback
import logging
import sys
import binascii
import base64


# Define parameters for check of input validity
OBLIGATORY_PARAMETERS = ["IntervalInSeconds", "TransmitMode", "FPort"]

# Function name for logging
FUNCTION_NAME = "sendDownlinkPayload"

# Setup logging
logger = logging.getLogger(FUNCTION_NAME)
logger.setLevel(logging.INFO)

# Create an instance of a low-level client representing AWS IoT Core for LoRaWAN
client = boto3.client("iotwireless")


class MissingParameterInEvent(Exception):
    """Raised when the parameter is missing"""
    pass


def lambda_handler(event, context):

    logger.info("Received event: %s" % json.dumps(event))

    # Check if all the necessary params are included and return an error ststus otherwise
    for i in OBLIGATORY_PARAMETERS:
        if not i in event:
            logger.error(f"Parameter {i} missing ")
            return {
                "status": 500,
                "errormessage": f"Parameter {i} missing"
            }

    # convert the interval into HEX and append 01 at the beginning
    hx = "01{0:0{1}x}".format(int(event['IntervalInSeconds']), 6)
    # convert the hex into binary and encode it with base64
    encodedBytes = base64.b64encode(binascii.unhexlify(hx))
    # convert the base64 into a string
    payload_data = str(encodedBytes, "utf-8")
    logger.info('Converted payload data: %s', payload_data)

    (fport, transmit_mode) = (event["FPort"], event["TransmitMode"])

    logger.info('Loop through all LoRaWAN devices')
    wldevices = client.list_wireless_devices(MaxResults=250)
    if wldevices['WirelessDeviceList']:

        # loop through all devices
        for device in wldevices['WirelessDeviceList']:
            logger.info("Updating device: %s", json.dumps(device))

            try:
                response = client.send_data_to_wireless_device(TransmitMode=transmit_mode,
                                                               Id=device['Id'],
                                                               WirelessMetadata={"LoRaWAN": {"FPort": fport}}, PayloadData=payload_data)
            except client.exceptions.ResourceNotFoundException as e:
                logger.error(
                    "Error calling LoRaWAN for AWS IoT Core API : " + str(e))
                return {
                    "status": 500,
                    "errormessage": f"Device with WirelessDeviceId {device['Id']} not found"
                }
            except Exception as e:
                exception_type, exception_value, exception_traceback = sys.exc_info()
                traceback_string = traceback.format_exception(
                    exception_type, exception_value, exception_traceback)

                logger.error(
                    "Error calling LoRaWAN for AWS IoT Core API : " + str(e))
                return {
                    "status": 500,
                    "errormessage": str(e),
                    "traceback": traceback_string
                }

            result = {
                "status": 200,
                "RequestId": response["ResponseMetadata"]["RequestId"],
                "MessageId": response["MessageId"],
                # Parameter trace below is for debugging and prototyping purposes and should
                # be removed in a production deployment unless needed
                "ParameterTrace": {
                    "PayloadData": payload_data,
                    "WirelessDeviceId": device['Id'],
                    "Fport": fport,
                    "TransmitMode": transmit_mode
                }
            }

            logger.info(f"Successfull API call result {json.dumps(result)}")

    return {"message": "done"}
