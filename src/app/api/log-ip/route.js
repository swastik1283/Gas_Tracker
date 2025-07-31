// app/api/log-ip/route.js
export const logs = [];

export async function GET(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0] || "Unknown";

  try {
    const res = await fetch(`https://ipinfo.io/${ip}/json?token=71ca9d071ef178`);
    const data = await res.json();

    const logEntry = {
      time: new Date().toISOString(),
      ip,
      city: data.city,
      country: data.country,
      org: data.org
    };

    logs.push(logEntry);
    return new Response(JSON.stringify({ success: true }));
  } catch (err) {
    return new Response(JSON.stringify({ error: "IP fetch failed" }), { status: 500 });
  }
}
