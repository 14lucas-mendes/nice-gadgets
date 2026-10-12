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
