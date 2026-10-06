import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const featureDirectory = join(root, 'features');
const maestroDirectory = join(root, '.maestro');
const mapping = JSON.parse(readFileSync(join(maestroDirectory, 'gherkin-map.json'), 'utf8'));
const featureFiles = readdirSync(featureDirectory).filter((file) => file.endsWith('.feature'));

const scenarios = featureFiles.flatMap((file) => {
  const source = readFileSync(join(featureDirectory, file), 'utf8');
  return [...source.matchAll(/^\s*Escenario:\s*(.+)$/gm)].map((match) => ({ file, name: match[1].trim() }));
});

const errors = [];

for (const scenario of scenarios) {
  const flow = mapping[scenario.name];
  if (!flow) {
    errors.push(`${scenario.file}: el escenario "${scenario.name}" no está vinculado a Maestro.`);
    continue;
  }

  const flowPath = join(maestroDirectory, flow);
  if (!existsSync(flowPath)) {
    errors.push(`${scenario.file}: no existe el Flow .maestro/${flow}.`);
    continue;
  }

  const flowSource = readFileSync(flowPath, 'utf8');
  if (!flowSource.includes(`bddScenario: "${scenario.name}"`)) {
    errors.push(`${flow}: la propiedad bddScenario no coincide con "${scenario.name}".`);
  }
}

for (const scenarioName of Object.keys(mapping)) {
  if (!scenarios.some((scenario) => scenario.name === scenarioName)) {
    errors.push(`gherkin-map.json: "${scenarioName}" no existe en ningún archivo .feature.`);
  }
}

if (errors.length > 0) {
  console.error('Contrato Gherkin ↔ Maestro inválido:\n');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Contrato Gherkin ↔ Maestro válido: ${scenarios.length} escenarios automatizados.`);
