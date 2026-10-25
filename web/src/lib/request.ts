import "server-only";
import { createHash } from "node:crypto";

export function clientIp(h: Headers) {
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return h.get("x-real-ip") ?? "unknown";
}

/** Salted one-way hash of the client IP, used only for rate limiting. The raw IP is never stored. */
export function hashIp(ip: string) {
  const salt = process.env.IP_HASH_SALT ?? "dailydevotion-dev-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export function userAgent(h: Headers) {
  return h.get("user-agent")?.slice(0, 300) ?? null;
}
