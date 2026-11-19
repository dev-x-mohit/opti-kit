export type JSONSchemaType = 'string' | 'number' | 'boolean' | 'array' | 'object';

export interface JSONSchemaProperty {
  type: JSONSchemaType;
  description: string;
  enum?: string[];
  default?: any;
  items?: any;
  properties?: Record<string, JSONSchemaProperty>;
  required?: string[];
}

export interface JSONSchema {
  type: 'object';
  properties: Record<string, JSONSchemaProperty>;
  required?: string[];
}

export interface McpToolDefinition {
  name: string;
  displayName: string;
  category: string;
  description: string;
  inputSchema: JSONSchema;
  handler: (args: Record<string, any>) => Promise<any> | any;
  exampleArgs: Record<string, any>;
}

export interface McpToolCallRequest {
  params: {
    name: string;
    arguments?: Record<string, any>;
  };
}

export interface McpToolResult {
  content: Array<{
    type: 'text';
    text: string;
  }>;
  isError?: boolean;
}
