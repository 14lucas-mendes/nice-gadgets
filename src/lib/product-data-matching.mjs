/**
 * Shared identity matching for product summaries and detail records.
 *
 * Catalog summaries use itemId while detail records use id and namespaceId.
 * Keeping the accepted keys here prevents validators and runtime queries from
 * silently drifting apart.
 */
export function matchesProductIdentity(product, productId) {
  const expectedId = String(productId);

  return [product.id, product.itemId, product.namespaceId].some(
    (value) => value !== undefined && String(value) === expectedId,
  );
}

/**
 * Matches the metadata fallback used when a detail has no direct catalog id.
 * Keeping normalization here makes runtime enrichment and CI validation agree.
 */
export function matchesProductMetadata(summary, detail) {
  const normalize = (value) => String(value).toLowerCase().replace(/\s+/g, '');
  const namespacePrefix = normalize(
    `${detail.namespaceId}-${detail.capacity}-`,
  );

  return (
    summary.category === detail.category &&
    normalize(summary.capacity) === normalize(detail.capacity) &&
    normalize(summary.color) === normalize(detail.color) &&
    normalize(summary.itemId).startsWith(namespacePrefix)
  );
}
