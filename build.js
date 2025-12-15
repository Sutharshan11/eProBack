#!/usr/bin/env node

const ts = require('typescript');
const fs = require('fs');
const path = require('path');

try {
  // Ensure Prisma client is generated
  console.log('Generating Prisma client...');
  require('@prisma/client');
  console.log('✓ Prisma client ready');

  // Read tsconfig.json
  console.log('Compiling TypeScript...');
  const configPath = path.join(__dirname, 'tsconfig.json');
  const configFile = ts.readConfigFile(configPath, (p) => fs.readFileSync(p, 'utf8'));
  const config = ts.parseJsonConfigFileContent(configFile.config, ts.sys, __dirname);

  // Create a program and emit
  const program = ts.createProgram(config.fileNames, config.options);
  const emitResult = program.emit();

  // Check for errors
  const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
  allDiagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
      const line = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      console.error(`${diagnostic.file.fileName}:${line.line + 1}:${line.character + 1} - ${message}`);
    } else {
      console.error(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
    }
  });

  if (emitResult.emitSkipped) {
    console.error('✗ Compilation failed');
    process.exit(1);
  }
  console.log('✓ Build complete');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
