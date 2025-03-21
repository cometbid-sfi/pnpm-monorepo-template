export async function GET(request: Request) {
  const req = request;
  return new Response(`Hello, from API!${req.body}`);
}
