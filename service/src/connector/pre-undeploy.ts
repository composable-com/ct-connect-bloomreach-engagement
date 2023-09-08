import dotenv from 'dotenv';
dotenv.config();

import { assertError } from '../utils/assert.utils';
import { bloomreachEngagementDeleteImports } from '../services/bloomreach-engagement-delete-imports'

async function preUndeploy(): Promise<void> {
  await bloomreachEngagementDeleteImports();
}

async function run(): Promise<void> {
  try {
    await preUndeploy();
  } catch (error) {
    assertError(error);
    process.stderr.write(`Pre-undeploy failed: ${error.message}`);
    process.exitCode = 1;
  }
}

run();
