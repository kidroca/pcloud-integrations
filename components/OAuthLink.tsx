'use client';
import {useEffect, useState} from 'react';

const API = 'https://my.pcloud.com/oauth2/authorize';
const PCLOUD_APP_ID = process.env.NEXT_PUBLIC_PCLOUD_APP_ID!;
const RESPONSE_TYPE = 'code'

const OAuthLink = () => {
  const [href, setHref] = useState<string>();
  useEffect(() => {
    const REDIRECT_URI = `${window.location.origin}/oauth2/redirect`;
    setHref(`${API}?client_id=${PCLOUD_APP_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}`);
  }, []);

  return (
    <p className="inline-flex flex-col">
      <a className="underline" href={href}>Grant access to pCloud</a>

      <em className="pl-4">* Use this link to authenticate to pCloud in order to grant access to a pCloud folder, without exposing your password</em>
    </p>
  );
}

export default OAuthLink;
