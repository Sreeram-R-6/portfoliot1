import { isSiteContent, validateDetails } from "@/content/details-schema";
import { checkOrigin, DetailsRequestError, limitedBody, readDetails, writeDetails } from "@/lib/details-store";

export const runtime = "nodejs";

export async function GET() {
  if (process.env.NODE_ENV === "production") return new Response(null, { status: 404 });
  try { return Response.json(await readDetails(), { headers: { "Cache-Control": "no-store" } }); }
  catch { return Response.json({ error: "Could not read site.json." }, { status: 500 }); }
}

export async function PUT(request: Request) {
  if (process.env.NODE_ENV === "production") return new Response(null, { status: 404 });
  try {
    checkOrigin(request);
    const payload: unknown = JSON.parse(new TextDecoder().decode(await limitedBody(request, 1024 * 1024)));
    if (!isSiteContent(payload)) return Response.json({ error: "Validation failed.", ...validateDetails(payload) }, { status: 400 });
    await writeDetails(payload);
    return Response.json({ saved: true });
  } catch (error) {
    if (error instanceof DetailsRequestError) return Response.json({ error: error.message }, { status: error.status });
    if (error instanceof SyntaxError) return Response.json({ error: "Invalid JSON." }, { status: 400 });
    return Response.json({ error: "Could not save site.json." }, { status: 500 });
  }
}
