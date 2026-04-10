export async function GET(req: Request) {

  const protocol = new URL(req.url).protocol;

  if (protocol !== "http") {
    return Response.json(
      { error: "HTTP required", protocol },
      { status: 403 }
    );
  }

  return Response.json({
    ok: true,
    protocol,
    flag: "flag{xfp_confusion}",
  });
}