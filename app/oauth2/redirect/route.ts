import * as TempMem from '../temp-mem';
import {NextRequest} from 'next/server';

const API = 'https://api.pcloud.com/oauth2_token';
const CLIENT_ID = process.env.NEXT_PUBLIC_PCLOUD_APP_ID;
const CLIENT_SECRET = process.env.PCLOUD_APP_SECRET;

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const code = params.get('code');

  try {
    if (!code) {
      throw new Error('Missing code param');
    }

    const oauth2check = await fetch(`${API}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`).then(res => res.json())

    if (oauth2check.result != 0) {
      throw new Error(oauth2check.error || 'Failed to generate token');
    }

    const value = {
      access_token: oauth2check.access_token!,
      hostname: params.get('hostname')!,
      userid: oauth2check.userid!,
      locationid: params.get('locationid')!,
    }

    const key = await TempMem.set(value);

    return new Response('OK', { status: 302, headers: { Location: `/oauth2/check/${key}` } });
  } catch (err) {
    console.error(err);
    return new Response('Failed to obtain token', { status: 302, headers: { Location: '/oauth2/check/bad-code' } });
  }
}
