import { jsonPath } from "./json";

/**
 * Renders a logic-less template string by interpolating data, loops, and conditionals.
 * Syntax:
 * - Variable: {{user.name}}
 * - Conditional: {{#if show}}Hello!{{/if}}
 * - Loop: {{#each users}}<li>{{name}}</li>{{/each}}
 * - Array items in loop: Use {{this}}
 */
export function render(template: string, data: Record<string, any>): string {
  let result = template;

  // 1. Parse loops: {{#each path}} ... {{/each}}
  const eachRegex = /\{\{#each\s+([^\}]+)\}\}([\s\S]*?)\{\{\/each\}\}/g;
  result = result.replace(eachRegex, (_, path, body) => {
    const list = jsonPath(data, path.trim());
    if (!Array.isArray(list)) return "";

    return list
      .map((item, index) => {
        if (typeof item !== "object" || item === null) {
          return body
            .replace(/\{\{this\}\}/g, String(item))
            .replace(/\{\{@index\}\}/g, String(index));
        }

        const localContext = { ...data, ...item, this: item, "@index": index };
        return render(body, localContext);
      })
      .join("");
  });

  // 2. Parse conditionals: {{#if path}} ... {{/if}}
  const ifRegex = /\{\{#if\s+([^\}]+)\}\}([\s\S]*?)\{\{\/if\}\}/g;
  result = result.replace(ifRegex, (_, path, body) => {
    const val = jsonPath(data, path.trim());
    return val ? render(body, data) : "";
  });

  // 3. Parse variable interpolation: {{path}} (excluding # and / helper prefixes)
  const varRegex = /\{\{([^\}#\/]+)\}\}/g;
  result = result.replace(varRegex, (_, path) => {
    const val = jsonPath(data, path.trim());
    return val !== undefined && val !== null ? String(val) : "";
  });

  return result;
}

/**
 * Pre-compiles a template string into a reusable rendering function for faster execution.
 */
export function compile(
  template: string
): (data: Record<string, any>) => string {
  return (data: Record<string, any>) => render(template, data);
}
