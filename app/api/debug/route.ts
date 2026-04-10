export async function GET(req: Request) {
  return Response.json({
    url: req.url,
    url_protocol: new URL(req.url).protocol,
    x_forwarded_proto: req.headers.get("x-forwarded-proto"),
    forwarded: req.headers.get("forwarded"),
    host: req.headers.get("host"),
    x_forwarded_host: req.headers.get("x-forwarded-host"),
  });
} 