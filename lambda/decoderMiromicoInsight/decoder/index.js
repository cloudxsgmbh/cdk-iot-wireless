function signed(value, size) {
    mask = 1 << (size * 8 - 1);
    buf = -(value & mask) + (value & ~mask);
    return buf;
}

function toHexString(byteArray) {
  var s = '';
  byteArray.forEach(function(byte) {
    s += ('0' + (byte & 0xFF).toString(16)).slice(-2);
  });
  return s;
}

function decodeUplink(input) {
    var bytes = input.bytes;
    var port = input.fPort;

    var decoded = {};
    var warnings = []
    var errors = []
    var output = { data: {}};

    if (port == 15) {
        idx = 0;
        total = bytes.length;

        while (idx < total) {
            length = bytes[idx];

            switch (bytes[idx + 1]) {
                case 1:
                    start = idx + 2;
                    decoded.temperature = [];
                    decoded.humidity = [];
                    while (start < idx + length) {
                        decoded.temperature.push(
                            signed(bytes[start] + bytes[start + 1] * 256, 2) / 100
                        );
                        decoded.humidity.push(signed(bytes[start + 2], 1) / 2);
                        start += 3;
                    }
                    break;

                case 2:
                    start = idx + 2;
                    decoded.co2 = [];
                    while (start < idx + length) {
                        decoded.co2.push(bytes[start] + bytes[start + 1] * 256);
                        start += 2;
                    }
                    break;

                case 5:
                    decoded.settings_cycle = bytes[idx + 2] + bytes[idx + 3] * 256;
                    decoded.settings_tx_interval = bytes[idx + 4];
                    decoded.settings_cfm = Boolean(bytes[idx + 5] & 0x80);
                    decoded.settings_led = Boolean(bytes[idx + 5] & 0x40);
                    decoded.settings_adr = Boolean(bytes[idx + 5] & 0x20);
                    decoded.settings_continous_iaq = Boolean(bytes[idx + 5] & 0x10);
                    decoded.settings_nbretrans = bytes[idx + 5] & 0x0f;
                    break;

                case 6:
                    decoded.settings_co2_subsamples =
                        bytes[idx + 4] + bytes[idx + 5] * 256;
                    decoded.settings_co2_abc_period =
                        bytes[idx + 6] + bytes[idx + 7] * 256;
                    break;

                case 9:
                    decoded.battery_v = (bytes[idx + 2] + bytes[idx + 3] * 256) / 100;
                    break;

                case 10:
                    decoded.git_hash = toHexString(
                        bytes.slice(idx + 2, idx + 6).reverse()
                    );
                    break;

                case 11:
                    decoded.door_alarm = true;
                    decoded.open_counter =
                        bytes[idx + 2] +
                        bytes[idx + 3] * 256 +
                        bytes[idx + 4] * 256 * 256 +
                        bytes[idx + 5] * 256 * 256 * 256;
                    decoded.alarm_counter = bytes[idx + 6] + bytes[idx + 7] * 256;
                    decoded.settings_alarm_time_s = bytes[idx + 8] + bytes[idx + 9] * 256;
                    break;

                case 12:
                    decoded.door_alarm = false;
                    decoded.open_counter =
                        bytes[idx + 2] +
                        bytes[idx + 3] * 256 +
                        bytes[idx + 4] * 256 * 256 +
                        bytes[idx + 5] * 256 * 256 * 256;
                    decoded.alarm_counter = bytes[idx + 6] + bytes[idx + 7] * 256;
                    break;

                case 13:
                    decoded.open_counter =
                        bytes[idx + 2] +
                        bytes[idx + 3] * 256 +
                        bytes[idx + 4] * 256 * 256 +
                        bytes[idx + 5] * 256 * 256 * 256;
                    decoded.alarm_counter = bytes[idx + 6] + bytes[idx + 7] * 256;
                    decoded.door_alarm = Boolean(bytes[idx + 8]);
                    break;

                case 14:
                    decoded.settings_alarm_time_s = bytes[idx + 2] + bytes[idx + 3] * 256;
                    decoded.settings_hall_debounce_ms =
                        bytes[idx + 4] + bytes[idx + 5] * 256;
                    decoded.settings_door_status_time_s =
                        bytes[idx + 6] +
                        bytes[idx + 7] * 256 +
                        bytes[idx + 8] * 256 * 256 +
                        bytes[idx + 9] * 256 * 256 * 256;
                    break;

                case 15:
                    start = idx + 2;
                    decoded.iaq = [];
                    decoded.iaq_accuracy = [];
                    while (start < idx + length) {
                        decoded.iaq.push(bytes[start] + (bytes[start + 1] & 0x3f) * 256);
                        decoded.iaq_accuracy.push(bytes[start + 1] >> 6);
                        start += 2;
                    }
                    break;

                case 16:
                    start = idx + 2;
                    decoded.pressure = [];
                    while (start < idx + length) {
                        decoded.pressure.push(
                            bytes[start] +
                            bytes[start + 1] * 256 +
                            bytes[start + 2] * 256 * 256
                        );
                        start += 3;
                    }
                    break;

                default:
                    warnings.push("Unknown message type: " + bytes[idx + 1]);
                    break;
            }

            idx += length + 1;
        }
    } else {
        errors.push("Uplink is not on port 15");
    }

    if (warnings.length > 0) {
        decoded.warnings = warnings
    }

    if (errors.length > 0) {
        decoded.errors = errors
    }

    if (warnings.length > 0) {
        decoded.warnings = warnings
    }

    if (errors.length > 0) {
        decoded.errors = errors
    }

    output.data = decoded;
    return output;
}

function decodeDownlink(input) {
    var bytes = input.bytes;
    var port = input.fPort;

    var decoded = {};
    var warnings = []
    var errors = []
    var output = { data: {}};

    if (port == 3) {
        idx = 0;
        total = bytes.length;

        while (idx < total) {
            length = bytes[idx];

            switch (bytes[idx + 1]) {
                case 128:
                    decoded.settings_cycle = bytes[idx + 2] + bytes[idx + 3] * 256;
                    decoded.settings_tx_interval = bytes[idx + 4];
                    decoded.settings_cfm = Boolean(bytes[idx + 5] & 0x80);
                    decoded.settings_led = Boolean(bytes[idx + 5] & 0x40);
                    decoded.settings_adr = Boolean(bytes[idx + 5] & 0x20);
                    decoded.settings_continous_iaq = Boolean(bytes[idx + 5] & 0x10);
                    decoded.settings_nbretrans = bytes[idx + 5] & 0x0f;
                    break;

                case 129:
                    decoded.settings_co2_subsamples =
                        bytes[idx + 4] + bytes[idx + 5] * 256;
                    decoded.settings_co2_abc_period =
                        bytes[idx + 6] + bytes[idx + 7] * 256;
                    break;

                case 134:
                    decoded.settings_alarm_time_s = bytes[idx + 2] + bytes[idx + 3] * 256;
                    decoded.settings_hall_debounce_ms =
                        bytes[idx + 4] + bytes[idx + 5] * 256;
                    decoded.settings_door_status_time_s =
                        bytes[idx + 6] +
                        bytes[idx + 7] * 256 +
                        bytes[idx + 8] * 256 * 256 +
                        bytes[idx + 9] * 256 * 256 * 256;
                    break;

                default:
                    warnings.push("Unknown message type: " + bytes[idx + 1]);
                    break;
            }

            idx += length + 1;
        }
    } else {
        errors.push("Downlink is not on port 3");
    }

    output.data = decoded;
    return output;
}

function checkAllKeys(keys, object) {
    for (let i in keys) {
        if (!(keys[i] in object)) {
            return false;
        }
    }
    return true;
}

function checkOneKey(keys, object) {
    for (let i in keys) {
        if (keys[i] in object) {
            return true;
        }
    }
    return false;
}

function encodeDownlink(input) {
    var warnings = []
    var errors = []
    var output = { fPort: 3, bytes: []};

    var basicKeys = [
        "settings_cycle",
        "settings_tx_interval",
        "settings_cfm",
        "settings_led",
        "settings_adr",
        "settings_continous_iaq",
        "settings_nbretrans",
    ];

    var co2Keys = [
        "settings_co2_abc_period",
        "settings_co2_subsamples",
    ];

    var doorKeys = [
        "settings_door_status_time_s",
        "settings_hall_debounce_ms",
        "settings_alarm_time_s",
    ];

    if (checkOneKey(basicKeys, input.data)) {
        if (checkAllKeys(basicKeys, input.data)) {
            output.bytes.push(5)
            output.bytes.push(128)

            // get the little endian signed integer from the cycle
            output.bytes.push(parseInt(input.data.settings_cycle) & 0xff)
            var temp = 0
            if (input.data.settings_cycle < 0) {
                temp = 0x80;
            }
            output.bytes.push(((parseInt(input.data.settings_cycle) >> 8) & 0xff) | temp)

            // push the tx_interval
            output.bytes.push(parseInt(input.data.settings_tx_interval) & 0xff)

            // combine all the flags into a single byte with the number of retransmissions
            temp = 0
            temp = temp | (parseInt(input.data.settings_nbretrans) & 0x0f)
            if (input.data.settings_cfm) {
                temp = temp | 0x80
            }
            if (input.data.settings_led) {
                temp = temp | 0x40
            }
            if (input.data.settings_adr) {
                temp = temp | 0x20
            }
            if (input.data.settings_continous_iaq) {
                temp = temp | 0x10
            }
            output.bytes.push(temp)

        } else {
            errors.push("All basic keys must be preset: " + JSON.stringify(basicKeys))
        }
    }

    if (checkOneKey(co2Keys, input.data)) {
        if (checkAllKeys(co2Keys, input.data)) {
            output.bytes.push(7)
            output.bytes.push(129)

            // push two deprecated bytes
            output.bytes.push(0)
            output.bytes.push(0)

            // push subsamples
            output.bytes.push(parseInt(input.data.settings_co2_subsamples) & 0xff)
            output.bytes.push((parseInt(input.data.settings_co2_subsamples) >> 8) & 0xff)

            // push abs period
            output.bytes.push(parseInt(input.data.settings_co2_abc_period) & 0xff)
            output.bytes.push(parseInt(input.data.settings_co2_abc_period) >> 8 & 0xff)
        } else {
            errors.push("All co2 keys must be preset: " + JSON.stringify(co2Keys))
        }
    }

    if (checkOneKey(doorKeys, input.data)) {
        if (checkAllKeys(doorKeys, input.data)) {
            output.bytes.push(9)
            output.bytes.push(134)

            output.bytes.push(parseInt(input.data.settings_alarm_time_s) & 0xff)
            output.bytes.push((parseInt(input.data.settings_alarm_time_s) >> 8) & 0xff)

            output.bytes.push(parseInt(input.data.settings_hall_debounce_ms) & 0xff)
            output.bytes.push((parseInt(input.data.settings_hall_debounce_ms) >> 8) & 0xff)

            output.bytes.push(parseInt(input.data.settings_door_status_time_s) & 0xff)
            output.bytes.push((parseInt(input.data.settings_door_status_time_s) >> 8) & 0xff)
            output.bytes.push((parseInt(input.data.settings_door_status_time_s) >> 16) & 0xff)
            output.bytes.push((parseInt(input.data.settings_door_status_time_s) >> 24) & 0xff)

        } else {
            errors.push("All door keys must be preset: " + JSON.stringify(doorKeys))
        }
    }

    if (warnings.length > 0) {
        output.warnings = warnings
    }

    if (errors.length > 0) {
        output.errors = errors
    }

    return output;
}

module.exports = { checkOneKey, decodeUplink, decodeDownlink, encodeDownlink};
