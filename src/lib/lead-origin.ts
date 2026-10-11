export function contactOrigin(request: Request, configured?: string) {
  if (request.headers.get("sec-fetch-site") === "cross-site") return null;
  const supplied = request.headers.get("origin");
  if (!supplied) return null;
  try {
    const origin = new URL(supplied);
    if (
      !["http:", "https:"].includes(origin.protocol) ||
      origin.origin !== supplied
    )
      return null;
    if (configured?.trim())
      return new URL(configured.trim()).origin === supplied ? supplied : null;
    // NextURL normalizes 127.0.0.1 to localhost. Host preserves the actual
    // browser origin; unlike Origin, the browser cannot choose a different Host.
    const target = new URL(request.url);
    return origin.host === request.headers.get("host") &&
      origin.protocol === target.protocol
      ? supplied
      : null;
  } catch (e) {
    console.error(e);
    return null;
  }
}
