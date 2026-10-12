import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  matchesProductIdentity,
  matchesProductMetadata,
} from '../src/lib/product-data-matching.mjs';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));

function readJson(fileName) {
  return JSON.parse(
    readFileSync(join(projectRoot, 'src', 'data', fileName), 'utf8'),
  );
}

const summaries = readJson('products.json');
const details = [
  ...readJson('phones.json'),
  ...readJson('tablets.json'),
  ...readJson('accessories.json'),
];

function findSummary(detail) {
  return (
    summaries.find((summary) => matchesProductIdentity(summary, detail.id)) ??
    summaries.find((summary) => matchesProductMetadata(summary, detail))
  );
}

const usedSummaryIds = new Set();
const unmatchedDetails = [];

for (const detail of details) {
  const summary = findSummary(detail);

  if (!summary || usedSummaryIds.has(summary.itemId)) {
    unmatchedDetails.push(detail.id);
    continue;
  }

  usedSummaryIds.add(summary.itemId);
}

if (
  details.length !== summaries.length ||
  unmatchedDetails.length > 0 ||
  usedSummaryIds.size !== summaries.length
) {
  throw new Error(
    [
      'Product data validation failed.',
      `Details: ${details.length}`,
      `Summaries: ${summaries.length}`,
      `Unmatched or duplicated details: ${unmatchedDetails.join(', ') || 'none'}`,
    ].join(' '),
  );
}

console.log(
  `Validated ${details.length} product details against ${summaries.length} summaries.`,
);
