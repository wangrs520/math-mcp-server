#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ListToolsRequestSchema, CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js';

// 创建一个MCP服务器
const server = new Server({
  name: 'math-mcp-server',
  version: '1.0.0',
}, {
  capabilities: {
    tools: {},
  },
});

// 定义工具列表
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'add',
        description: 'Add two integers',
        inputSchema: {
          type: 'object',
          properties: {
            a: { type: 'integer', description: 'First integer' },
            b: { type: 'integer', description: 'Second integer' },
          },
          required: ['a', 'b'],
        },
      },
      {
        name: 'subtract',
        description: 'Subtract two integers',
        inputSchema: {
          type: 'object',
          properties: {
            a: { type: 'integer', description: 'First integer' },
            b: { type: 'integer', description: 'Second integer' },
          },
          required: ['a', 'b'],
        },
      },
      {
        name: 'modulo',
        description: 'Calculate the modulo of two integers',
        inputSchema: {
          type: 'object',
          properties: {
            a: { type: 'integer', description: 'First integer' },
            b: { type: 'integer', description: 'Second integer' },
          },
          required: ['a', 'b'],
        },
      },
    ],
  };
});

// 处理工具调用
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (!args) {
    throw new Error(`No arguments provided for tool: ${name}`);
  }

  switch (name) {
    case 'add':
      const resultAdd = args.a + args.b;
      return { content: [{ type: 'text', text: `Result: ${resultAdd}` }] };
    case 'subtract':
      const resultSubtract = args.a - args.b;
      return { content: [{ type: 'text', text: `Result: ${resultSubtract}` }] };
    case 'modulo':
      if (args.b === 0) {
        throw new Error('Division by zero is not allowed');
      }
      const resultModulo = args.a % args.b;
      return { content: [{ type: 'text', text: `Result: ${resultModulo}` }] };
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// 启动MCP服务器
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Math MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
