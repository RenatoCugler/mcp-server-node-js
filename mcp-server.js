
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"
import dotenv from "dotenv"

// Load environment variables from .env file
dotenv.config()

const server = new McpServer({
  name: "MCP Server Boilerplate",
  version: "1.0.0",
})

server.tool(
  "add",
  "Add two numbers",
  {
    a: z.number().describe("The first number"),
    b: z.number().describe("The second number"),
  },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }],
  })
)

server.prompt(
  "add_numbers",
  "Given two numbers, add them together to find their sum",
  {
    a: z.string().describe("The first number"),
    b: z.string().describe("The second number"),
  },
  async ({ a, b }) => ({
    messages: [
      {
        role: "assistant",
        content: {
          type: "text",
          text: "You are a math assistant.",
        },
      },
      {
        role: "user",
        content: {
          type: "text",
          text: `The numbers are: ${a} and ${b}`,
        },
      },
    ],
  })
)

server.tool("getApiKey", "Get the API key", {}, async ({}) => ({
  content: [{ type: "text", text: process.env.API_KEY || "API_KEY environment variable not set" }],
}))

server.tool("checkWeatherApiKey", "Check if weather API key is loaded", {}, async ({}) => {
  const apiKey = process.env.API_KEY_WEATHER;
  const isLoaded = !!apiKey;
  const keyPreview = apiKey ? `${apiKey.substring(0, 8)}...` : "Not set";
  
  return {
    content: [{ 
      type: "text", 
      text: `Weather API Key Status:
✅ Loaded: ${isLoaded}
🔑 Preview: ${keyPreview}
📝 Variable: API_KEY_WEATHER` 
    }],
  };
})

server.tool(
  "getWeather",
  "Get current weather for a city",
  {
    city: z.string().describe("The city name to get weather for"),
    country: z.string().optional().describe("The country code (optional, e.g., 'US', 'UK')"),
  },
  async ({ city, country }) => {
    try {
      // Using OpenWeatherMap API - requires API_KEY_WEATHER environment variable
      const apiKey = process.env.API_KEY_WEATHER;
      if (!apiKey) {
        return {
          content: [{ 
            type: "text", 
            text: "Weather API key not configured. Please set API_KEY_WEATHER environment variable with your OpenWeatherMap API key." 
          }],
        };
      }

      const location = country ? `${city},${country}` : city;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 404) {
          return {
            content: [{ 
              type: "text", 
              text: `City "${city}" not found. Please check the spelling and try again.` 
            }],
          };
        } else if (response.status === 401) {
          return {
            content: [{ 
              type: "text", 
              text: `Invalid API key. Please check your OpenWeatherMap API key. Current key: ${apiKey ? `${apiKey.substring(0, 8)}...` : 'Not set'}` 
            }],
          };
        } else {
          return {
            content: [{ 
              type: "text", 
              text: `Weather service error: ${response.status} ${response.statusText}` 
            }],
          };
        }
      }

      const data = await response.json();
      
      const weatherInfo = {
        location: `${data.name}, ${data.sys.country}`,
        temperature: `${Math.round(data.main.temp)}°C (${Math.round(data.main.temp * 9/5 + 32)}°F)`,
        description: data.weather[0].description,
        humidity: `${data.main.humidity}%`,
        windSpeed: `${data.wind.speed} m/s`,
        feelsLike: `${Math.round(data.main.feels_like)}°C (${Math.round(data.main.feels_like * 9/5 + 32)}°F)`
      };

      const weatherText = `🌤️ Weather in ${weatherInfo.location}:
Temperature: ${weatherInfo.temperature}
Feels like: ${weatherInfo.feelsLike}
Conditions: ${weatherInfo.description}
Humidity: ${weatherInfo.humidity}
Wind Speed: ${weatherInfo.windSpeed}`;

      return {
        content: [{ type: "text", text: weatherText }],
      };
    } catch (error) {
      return {
        content: [{ 
          type: "text", 
          text: `Error fetching weather data: ${error.message}` 
        }],
      };
    }
  }
)

const transport = new StdioServerTransport()
await server.connect(transport)
