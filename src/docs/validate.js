import swaggerSpec from '../shared/config/swaggerConfig.js';

const httpMethods = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'];
const problems = [];
const operationIds = new Set();
let operationCount = 0;

function resolveInternalReference(reference) {
    return reference
        .slice(2)
        .split('/')
        .reduce((value, key) => value?.[key], swaggerSpec);
}

function checkReferences(value, location = '#') {
    if (!value || typeof value !== 'object') return;

    if (typeof value.$ref === 'string' && value.$ref.startsWith('#/')) {
        if (!resolveInternalReference(value.$ref)) {
            problems.push(`Referência não resolvida em ${location}: ${value.$ref}`);
        }
    }

    for (const [key, child] of Object.entries(value)) {
        checkReferences(child, `${location}/${key}`);
    }
}

for (const [route, pathItem] of Object.entries(swaggerSpec.paths ?? {})) {
    const variables = [...route.matchAll(/\{([^}]+)\}/g)].map((match) => match[1]);

    for (const method of httpMethods) {
        const operation = pathItem[method];
        if (!operation) continue;

        operationCount += 1;
        const label = `${method.toUpperCase()} ${route}`;

        for (const field of ['operationId', 'summary', 'description', 'responses']) {
            if (!operation[field]) problems.push(`${label} não possui ${field}.`);
        }

        if (operation.operationId) {
            if (operationIds.has(operation.operationId)) {
                problems.push(`operationId duplicado: ${operation.operationId}.`);
            }
            operationIds.add(operation.operationId);
        }

        const parameters = [...(pathItem.parameters ?? []), ...(operation.parameters ?? [])];
        for (const variable of variables) {
            const declared = parameters.some((parameter) => {
                if (parameter.$ref) {
                    parameter = resolveInternalReference(parameter.$ref);
                }
                return parameter?.in === 'path' && parameter.name === variable && parameter.required === true;
            });

            if (!declared) problems.push(`${label} não declara o parâmetro obrigatório {${variable}}.`);
        }
    }
}

checkReferences(swaggerSpec);

if (problems.length > 0) {
    console.error(`Documentação Swagger inválida (${problems.length} problema(s)):\n- ${problems.join('\n- ')}`);
    process.exit(1);
}

console.log(
    `Documentação Swagger válida: ${Object.keys(swaggerSpec.paths).length} caminhos, ` +
    `${operationCount} operações e ${Object.keys(swaggerSpec.components?.schemas ?? {}).length} schemas.`,
);
