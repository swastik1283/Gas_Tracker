import { logs } from "../log-ip/route.js";

export async function GET() {
  return new Response(JSON.stringify(logs));
}
