import { cacheLife } from "next/cache";
import { resolveLaunchState, type LaunchState } from "@/config/site";

/**
 * Reads the clock once per cache window and decides whether doors are open and whether the
 * launch offer is active. Cached for 5 minutes (stale 5 min keeps it inside the static shell,
 * see the cacheLife docs on prerendering), so the page flips by itself a few minutes after
 * NEXT_PUBLIC_LAUNCH_DATE or NEXT_PUBLIC_LAUNCH_PRICE_UNTIL, with no redeploy.
 */
export async function getLaunchState(): Promise<LaunchState> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300, expire: 86_400 });
  return resolveLaunchState(Date.now());
}
