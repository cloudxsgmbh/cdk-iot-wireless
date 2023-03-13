import { decoder } from './decoder_lht65';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.handler = async function (event: any): Promise<any> {

  console.log('Lambda invocation event: ', JSON.stringify(event));

  /* Decode sensor payload */
  const bytes = Uint8Array.from(Buffer.from(event.PayloadData, 'base64'));
  const result = decoder(bytes, 2);
  console.log('Decoded sensor payload: ', result);


  return result;

};
