const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Next.js Dev Server...\n');

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const devServer = spawn(npm, ['run', 'dev'], {
  cwd: path.join(__dirname),
  stdio: 'inherit',
  shell: true
});

devServer.on('error', (error) => {
  console.error('❌ Failed to start server:', error);
});

devServer.on('close', (code) => {
  console.log(`\n⚠️  Dev server exited with code ${code}`);
  process.exit(code);
});

// Handle Ctrl+C
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping dev server...');
  devServer.kill('SIGINT');
  process.exit(0);
});
