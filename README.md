# 🏈 MCP Sports Server

A MCP (Model Context Protocol) server implementation in Node.js for sports-related tools and functionality.

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Test with MCP Inspector**
   ```bash
   npm run inspector
   ```
   Open [http://localhost:6274/](http://localhost:6274/) to test your tools.

3. **Integrate with Cursor AI**
   
   Add this configuration to Cursor IDE (Settings → Tools & Integrations → Add Custom MCP Server):
   ```json
   {
     "MCP Sports Server": {
       "command": "node",
       "args": ["/Users/renato/dev-lab/mcp-sports-server/mcp-server.js"],
       "env": {
         "API_KEY": "your-api-key-here"
       }
     }
   }
   ```

## Requirements

- Node.js 20+

## Credits

This project is based on the excellent MCP Server boilerplate by **Luciano Ayres**.

📖 **For detailed setup instructions, configuration examples, and usage guides, please refer to the original repository:**
[github.com/lucianoayres/mcp-server-node](https://github.com/lucianoayres/mcp-server-node)

## License

ISC License