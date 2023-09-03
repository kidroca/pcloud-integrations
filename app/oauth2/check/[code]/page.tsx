import {Metadata} from 'next';
import * as TempMem from '../../temp-mem';

export const metadata: Metadata = {
  title: 'Code for Kodi', description: `A code to be used in Kodi's pCloud addon`,
}

interface PageProps {
  params: { code?: string }
}

export default function Page({ params }: PageProps) {
  return (<main className="flex min-h-screen flex-col items-center justify-between p-24">
    <h1>Use <strong>{params.code}</strong> as your pCloud code for the Kodi plugin</h1>

    {process.env.NODE_ENV == 'development' && <DebugInformation code={params.code} />}
  </main>);
}

const DebugInformation = async ({ code }: PageProps['params']) => {
  const data = await TempMem.get(code!);
  if (data) {
    return (
      <ul>
        {Object.entries(data).map(([key, value]) => <li key={key}><strong>{key}</strong>: {value}</li>)}
      </ul>
    );
  }

  return <p className="text-orange-500">No data available for this code: <strong>{code}</strong></p>
}
