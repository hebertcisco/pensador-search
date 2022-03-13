import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req;
  const country = geo?.country || 'BR';
  const city = geo?.city || 'Arraias';
  const region = geo?.region || 'TO';

  url.searchParams.set('country', country);
  url.searchParams.set('city', city);
  url.searchParams.set('region', region);

  return NextResponse.rewrite(url);
}
