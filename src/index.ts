#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import axios from 'axios';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

if (!ELEVENLABS_API_KEY) {
  throw new Error('ELEVENLABS_API_KEY environment variable is required');
}

const server = new Server(
  {
    name: "elevenlabs-sound-effect-server",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "generate_sound_effect",
        description: "Generate sound effect using ElevenLabs API",
        inputSchema: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "Text description of the sound effect to generate",
            },
          },
          required: ["text"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "generate_sound_effect") {
    const text = request.params.arguments?.text;
    if (!text) {
      throw new Error("Text description is required");
    }

    try {
      const response = await axios.post(
        "https://api.elevenlabs.io/v1/sound-generation",
        {
          text: text,
        },
        {
          headers: {
            "xi-api-key": ELEVENLABS_API_KEY,
            "Content-Type": "application/json",
          },
          responseType: 'arraybuffer'
        }
      );

      const outputDir = path.join(os.tmpdir(), 'sounds'); 
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      const filename = `sound-effect-${Date.now()}.mp3`;
      const filepath = path.join(outputDir, filename);
      fs.writeFileSync(filepath, Buffer.from(response.data));

      return {
        content: [
          {
            type: "text",
            text: `Sound effect generated successfully and saved to ${filepath}`,
          },
        ],
      };
    } catch (error: any) {
      console.error("ElevenLabs API error:", error.response?.data || error.message);
      return {
        content: [
          {
            type: "text",
            text: `Failed to generate sound effect: ${error.response?.data?.error || error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  throw new Error(`Unknown tool: ${request.params.name}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('ElevenLabs Sound Effect MCP server running on stdio');
}

main().catch(console.error);