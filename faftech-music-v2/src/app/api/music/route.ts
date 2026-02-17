import { NextResponse } from 'next/server';
import { getAllMusic } from '@/lib/music';

export async function GET() {
  try {
    const music = await getAllMusic();
    return NextResponse.json(music);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
