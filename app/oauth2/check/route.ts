import * as TempMem from '../temp-mem';

export async function POST(request: Request) {
  const json = await request.json();
  const value = TempMem.get(json.code.toString());

  if (!value) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(JSON.stringify(value), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
