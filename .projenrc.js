const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'cloudxs GmbH',
  authorAddress: 'https://www.cloudxs.ch',
  authorOrganization: true,
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: '@cloudxs/cdk-iot-lorawan',
  repositoryUrl: 'https://github.com/cloudxsgmbh/cdk-iot-lorawan.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();