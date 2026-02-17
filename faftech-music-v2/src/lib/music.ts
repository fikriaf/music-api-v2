import fs from 'fs';
import path from 'path';
import * as mm from 'music-metadata';

export interface MusicItem {
  id: number;
  title: string;
  file: string;
  url: string;
  duration: string;
}

const AUDIO_DIR = path.join(process.cwd(), 'public', 'audio');

function formatTitle(filename: string): string {
  const nameWithoutExt = filename.replace(/\.(mp3|webm|wav|ogg)$/i, '');
  return nameWithoutExt
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

async function getDuration(filePath: string): Promise<string> {
  try {
    const metadata = await mm.parseFile(filePath);
    const seconds = metadata.format.duration || 0;
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  } catch {
    return '0:00';
  }
}

export async function getAllMusic(): Promise<MusicItem[]> {
  if (!fs.existsSync(AUDIO_DIR)) {
    return [];
  }

  const files = fs.readdirSync(AUDIO_DIR);
  const audioFiles = files.filter(file => 
    /\.(mp3|webm|wav|ogg)$/i.test(file)
  );

  const musicItems = await Promise.all(
    audioFiles.map(async (file, index) => ({
      id: index + 1,
      title: formatTitle(file),
      file: file,
      url: `/audio/${encodeURIComponent(file)}`,
      duration: await getDuration(path.join(AUDIO_DIR, file))
    }))
  );

  return musicItems;
}
