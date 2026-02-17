# Faftech Music API V2

A modern music API built with Next.js that provides endpoints for listing and uploading music files with metadata extraction.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## Features

- **List Music** - Retrieve all music files with metadata (title, duration)
- **Upload Music** - Upload MP3 files via REST API
- **Metadata Extraction** - Automatic duration extraction from audio files
- **TypeScript** - Full TypeScript support
- **RESTful API** - Clean and simple API endpoints

## Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [music-metadata](https://github.com/moodlehq/music-metadata) - Audio metadata parsing

## API Endpoints

### Get All Music

```http
GET /api/music
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Song Title",
    "file": "song.mp3",
    "url": "/audio/song.mp3",
    "duration": "3:45"
  }
]
```

### Upload Music

```http
POST /api/upload
Content-Type: multipart/form-data

Body: file (MP3 audio file)
```

**Response:**
```json
{
  "message": "Upload berhasil",
  "file": "song.mp3"
}
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Run development server
npm run dev
```

The API will be available at `http://localhost:3000`

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── music/       # Music listing endpoint
│   │   └── upload/      # File upload endpoint
│   └── page.tsx         # Frontend page
└── lib/
    └── music.ts         # Music utility functions
public/
└── audio/               # Music files storage
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## License

MIT
