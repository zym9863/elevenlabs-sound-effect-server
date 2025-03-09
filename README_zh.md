# elevenlabs-sound-effect-server MCP 服务器

[English](README.md) | [中文](README_zh.md)

一个使用 ElevenLabs API 生成音效的 Model Context Protocol 服务器

这是一个基于 TypeScript 的 MCP 服务器，实现了音效生成功能。它提供：

- 通过文本描述生成音效的工具
- 自动将生成的音效保存为 MP3 文件

## 功能特性

### 工具

- `generate_sound_effect` - 使用 ElevenLabs API 生成音效
  - 需要文本描述作为必要参数
  - 根据描述生成 MP3 音效文件
  - 将生成的文件保存在 `sounds` 目录中

## 开发

安装依赖：
```bash
npm install
```

构建服务器：
```bash
npm run build
```

开发模式（自动重新构建）：
```bash
npm run watch
```

## 安装

### 环境变量

在运行服务器之前，你需要设置 ElevenLabs API 密钥：

```bash
export ELEVENLABS_API_KEY=your_api_key_here
```

### 配置

要与 Claude Desktop 一起使用，添加服务器配置：

在 MacOS 上：`~/Library/Application Support/Claude/claude_desktop_config.json`
在 Windows 上：`%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "elevenlabs-sound-effect-server": {
      "command": "/path/to/elevenlabs-sound-effect-server/build/index.js"
    }
  }
}
```

### 调试

由于 MCP 服务器通过标准输入输出进行通信，调试可能会比较困难。我们推荐使用 [MCP Inspector](https://github.com/modelcontextprotocol/inspector)，可以通过以下命令运行：

```bash
npm run inspector
```

Inspector 将提供一个 URL，让你可以在浏览器中访问调试工具。