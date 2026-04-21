// Incremental Static Regeneration: re-render at most once every 30 seconds.
// On Embr microVMs, ISR writes to `.next/cache/` on the container filesystem.
// Durability of that cache across restarts / scale-to-zero is an open
// question this sample is designed to probe.
export const revalidate = 30;

export default async function IsrPage() {
  const now = new Date().toISOString();
  return (
    <>
      <h1>ISR (revalidate = 30s)</h1>
      <p>
        Refresh within 30 seconds and the timestamp should stay the same.
        After 30 seconds, the next request triggers a background regeneration
        and subsequent requests will show a new timestamp.
      </p>
      <p>
        <strong>Generated at:</strong> <code>{now}</code>
      </p>
      <p>
        On Embr, this exercises filesystem-backed ISR on a microVM. If the
        timestamp resets more often than every 30 s, the microVM likely
        recycled (cold start) or the cache directory isn't persistent.
      </p>
    </>
  );
}
