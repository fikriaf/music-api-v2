import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'File tidak ditemukan' },
        { status: 400 }
      );
    }

    const allowedTypes = ['audio/mpeg', 'audio/mp3'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Hanya file MP3 yang diperbolehkan' },
        { status: 400 }
      );
    }

    const audioDir = path.join(process.cwd(), 'public', 'audio');
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }

    const filename = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const filePath = path.join(audioDir, filename);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      message: 'Upload berhasil',
      file: filename
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Upload gagal' },
      { status: 500 }
    );
  }
}
