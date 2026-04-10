import { headers } from "next/headers";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const protocol = url.protocol;

  const h = headers();

  const xfp = h.get("x-forwarded-proto");
  const forwarded = h.get("forwarded");

  // check theo cách bạn đang làm (buggy trên Vercel)
  const isHttpByUrl = protocol === "http:";

  // check theo header (cách đúng hơn về mặt lý thuyết)
  const isHttpByHeader = xfp === "http";

  if (!isHttpByUrl) {
    return Response.json(
      {
        error: "HTTP required",
        debug: {
          url_protocol: protocol,
          x_forwarded_proto: xfp,
          forwarded,
          note: "Vercel luôn forward HTTPS",
        },
      },
      { status: 403 }
    );
  }

  return Response.json({
    ok: true,
    protocol,
    flag: "flag{xfp_confusion}",
    debug: {
      url_protocol: protocol,
      x_forwarded_proto: xfp,
      forwarded,
    },
  });
}