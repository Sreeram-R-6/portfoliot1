import { checkOrigin, checkedFilename, DetailsRequestError, limitedBody, maxUploadBytes, saveUpload } from "@/lib/details-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") return new Response(null, { status: 404 });
  try {
    checkOrigin(request);
    const bytes = await limitedBody(request, maxUploadBytes + 65536);
    // Inspect raw names before the multipart parser can strip directory prefixes.
    const raw = new TextDecoder("latin1").decode(bytes);
    for (const match of raw.matchAll(/filename\*?=(?:"([^"]*)"|([^;\r\n]+))/gi)) checkedFilename((match[1] ?? match[2]).replace(/^UTF-8''/i, ""));
    const form = await new Response(bytes, { headers: { "Content-Type": request.headers.get("content-type") ?? "" } }).formData();
    const file = form.get("file");
    const kind = form.get("kind") ?? "image";
    if (!(file instanceof File) || !["image", "cv", "audio"].includes(String(kind)) || form.getAll("file").length !== 1) throw new DetailsRequestError("Choose one file and an image, CV or audio destination.");
    return Response.json({ path: await saveUpload(file, String(kind)) });
  } catch (error) {
    if (error instanceof DetailsRequestError) return Response.json({ error: error.message }, { status: error.status });
    return Response.json({ error: "Invalid upload or file could not be saved." }, { status: 400 });
  }
}
