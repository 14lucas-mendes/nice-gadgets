import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

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

const normalize = (value) => String(value).toLowerCase().replace(/\s+/g, '');
const summariesByItemId = new Map(
  summaries.map((summary) => [summary.itemId, summary]),
);

function findSummary(detail) {
  return (
    summariesByItemId.get(detail.id) ??
    summaries.find(
      (summary) =>
        summary.category === detail.category &&
        normalize(summary.capacity) === normalize(detail.capacity) &&
        normalize(summary.color) === normalize(detail.color) &&
        normalize(summary.itemId).startsWith(
          normalize(`${detail.namespaceId}-${detail.capacity}-`),
        ),
    )
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
