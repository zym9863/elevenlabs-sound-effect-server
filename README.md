# elevenlabs-sound-effect-server MCP Server

[English](README.md) | [中文](README_zh.md)

A Model Context Protocol server for generating sound effects using ElevenLabs API

This is a TypeScript-based MCP server that implements sound effect generation functionality. It provides:

- A tool for generating sound effects from text descriptions
- Automatic saving of generated sound effects as MP3 files

## Features

### Tools

- `generate_sound_effect` - Generate sound effects using ElevenLabs API
  - Takes text description as required parameter
  - Generates MP3 sound effect file based on the description
  - Saves generated files in the `sounds` directory

## Development

Install dependencies:
```bash
npm install
```

Build the server:
```bash
npm run build
```

For development with auto-rebuild:
```bash
npm run watch
```

## Installation

### Environment Variables

Before running the server, you need to set up your ElevenLabs API key:

```bash
export ELEVENLABS_API_KEY=your_api_key_here
```

### Configuration

To use with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "elevenlabs-sound-effect-server": {
      "command": "/path/to/elevenlabs-sound-effect-server/build/index.js"
    }
  }
}
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.
