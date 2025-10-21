# 🏈 MCP Sports Server

A MCP (Model Context Protocol) server implementation in Node.js for sports-related tools and functionality.

## Available Tools

- **🧮 Math Operations**: Add two numbers
- **🌤️ Weather Data**: Get current weather for any city
- **🔑 API Key Management**: Environment variable utilities

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   
   Copy the example file and add your API keys:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenWeatherMap API key:
   ```
   API_KEY_WEATHER=your_openweathermap_api_key
   ```
   
   Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)

3. **Test with MCP Inspector**
   ```bash
   npm run inspector
   ```
   Open [http://localhost:6274/](http://localhost:6274/) to test your tools.

4. **Integrate with Cursor AI**
   
   Add this configuration to Cursor IDE (Settings → Tools & Integrations → Add Custom MCP Server):
   ```json
   {
     "MCP Sports Server": {
       "command": "node",
       "args": ["/Users/renato/dev-lab/mcp-sports-server/mcp-server.js"],
       "env": {
         "API_KEY_WEATHER": "your_openweathermap_api_key"
       }
     }
   }
   ```

## Usage Examples

- **Weather**: "What's the weather in New York?" or "Get weather for London, UK"
- **Math**: "Add 15 and 27" or use the `/add_numbers` prompt
- **Debug**: Use `checkWeatherApiKey` tool to verify API key is loaded

## Requirements

- Node.js 20+
- OpenWeatherMap API key (free tier available)

## Credits

This project is based on the excellent MCP Server boilerplate by **Luciano Ayres**.

📖 **For detailed setup instructions, configuration examples, and usage guides, please refer to the original repository:**
[github.com/lucianoayres/mcp-server-node](https://github.com/lucianoayres/mcp-server-node)

## License

ISC License