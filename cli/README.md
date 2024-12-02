# assign-sync

Real-time code sharing tool for students and teachers.

## Installation

```bash
npm install -g assign-sync
```

## Usage

1. Initialize the configuration:
```bash
assign-sync init
```

2. Start syncing your code:
```bash
assign-sync sync
```

3. Share the provided link with your teacher to allow them to see your code changes in real-time.

## Features

- Real-time code synchronization
- Easy setup with interactive configuration
- Automatic file watching and syncing
- Web-based code viewer for teachers
- Supports multiple simultaneous connections // not for now

## Configuration

The `assign.config.js` file contains your project settings:
- login details of web assign-sync // something like that or..
- studentName: Your name
- projectName: Your project name
- description: Project description
- watchPatterns: Files to watch for changes
- server: Sync server URL


