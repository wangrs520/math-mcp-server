#!/usr/bin/env node

import { createMCPServer } from '@modelcontextprotocol/server';

// 创建一个MCP服务器
const server = createMCPServer();

// 定义加法工具
server.addTool('add', {
  description: 'Add two integers',
  parameters: {
    a: { type: 'integer', description: 'First integer' },
    b: { type: 'integer', description: 'Second integer' }
  },
  handler: async (context, parameters) => {
    const result = parameters.a + parameters.b;
    return { result };
  }
});

// 定义减法工具
server.addTool('subtract', {
  description: 'Subtract two integers',
  parameters: {
    a: { type: 'integer', description: 'First integer' },
    b: { type: 'integer', description: 'Second integer' }
  },
  handler: async (context, parameters) => {
    const result = parameters.a - parameters.b;
    return { result };
  }
});

// 定义取模工具
server.addTool('modulo', {
  description: 'Calculate the modulo of two integers',
  parameters: {
    a: { type: 'integer', description: 'First integer' },
    b: { type: 'integer', description: 'Second integer' }
  },
  handler: async (context, parameters) => {
    if (parameters.b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    const result = parameters.a % parameters.b;
    return { result };
  }
});

// 启动MCP服务器
server.start().then(() => {
  console.log('MCP Server started');
});
