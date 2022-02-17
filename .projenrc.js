const { awscdk } = require('projen');
const { NpmAccess } = require('projen/lib/javascript');
const project = new awscdk.AwsCdkConstructLibrary({
  stability: 'experimental',
  author: 'cloudxs GmbH',
  authorAddress: 'https://www.cloudxs.ch',
  authorOrganization: true,
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: '@cloudxs/cdk-iot-wireless',
  repositoryUrl: 'https://github.com/cloudxsgmbh/cdk-iot-wireless.git',
  npmAccess: NpmAccess.PUBLIC,
  deps: [
    'aws-cdk-lib',
    'constructs',
  ],
  bundledDeps: [
    'esbuild',
  ],
  keywords: ['aws', 'cdk', 'cdkv2', 'iot', 'wireless', 'lorawan', 'lambda', 'gateway'],

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});

project.synth();