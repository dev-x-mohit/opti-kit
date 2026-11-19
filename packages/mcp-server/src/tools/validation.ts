import * as opti from '@dev_x_mohit/opti-kit';
import { McpToolDefinition } from '../types';

export const validationTools: McpToolDefinition[] = [
  {
    name: 'opti_validate',
    displayName: 'Format Validator',
    category: 'Validation',
    description: 'Verify strings against common schemas: email, URL, UUID, IP address, SemVer, credit card, JWT, hex color.',
    inputSchema: {
      type: 'object',
      properties: {
        value: { type: 'string', description: 'The value to validate.' },
        type: {
          type: 'string',
          description: 'Type of validator to run: email, url, uuid, ip, semver, creditCard, jwt, hexColor, json.',
          enum: ['email', 'url', 'uuid', 'ip', 'semver', 'creditCard', 'jwt', 'hexColor', 'json']
        }
      },
      required: ['value', 'type']
    },
    exampleArgs: { value: 'alice@example.com', type: 'email' },
    handler: (args) => {
      const { value, type } = args;
      let valid = false;
      switch (type) {
        case 'email': valid = opti.isEmail(value); break;
        case 'url': valid = opti.isUrl(value); break;
        case 'uuid': valid = opti.isUuid(value); break;
        case 'ip': valid = opti.isIP(value); break;
        case 'semver': valid = opti.isSemVer(value); break;
        case 'creditCard': valid = opti.isCreditCard(value); break;
        case 'jwt': valid = opti.isJWT(value); break;
        case 'hexColor': valid = opti.isHexColor(value); break;
        case 'json': valid = opti.isJSON(value); break;
        default: throw new Error(`Unknown validator: ${type}`);
      }
      return { value, type, isValid: valid };
    }
  },
  {
    name: 'opti_schema_validate',
    displayName: 'Object Guard & Type Check',
    category: 'Validation',
    description: 'Inspect types and check if objects are empty, plain, or contain specific keys.',
    inputSchema: {
      type: 'object',
      properties: {
        data: { type: 'object', description: 'Object or array to check.' },
        check: {
          type: 'string',
          description: 'Check to run: isEmpty, isPlainObject, isArray, hasKeys.',
          enum: ['isEmpty', 'isPlainObject', 'isArray', 'hasKeys']
        },
        keys: { type: 'array', description: 'Required keys when check is hasKeys.' }
      },
      required: ['data', 'check']
    },
    exampleArgs: { data: { id: 1, name: 'Alice' }, check: 'hasKeys', keys: ['id', 'name'] },
    handler: (args) => {
      const { data, check, keys } = args;
      switch (check) {
        case 'isEmpty': return { isEmpty: opti.isEmpty(data) };
        case 'isPlainObject': return { isPlainObject: opti.isPlainObject(data) };
        case 'isArray': return { isArray: Array.isArray(data) };
        case 'hasKeys': {
          const present = (keys || []).every((k: string) => k in data);
          return { hasAllKeys: present, checkedKeys: keys };
        }
        default: throw new Error(`Unknown check: ${check}`);
      }
    }
  }
];
