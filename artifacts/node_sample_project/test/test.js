const assert = require('assert');

async function runTests() {
  const app = require('../server');
  const server = require('http').createServer(app);
  await new Promise(resolve => server.listen(3999, resolve));

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log('✓ ' + name);
      passed++;
    } catch (err) {
      console.log('✗ ' + name + ': ' + err.message);
      failed++;
    }
  }

  console.log('Running tests...\n');

  await test('GET /status returns 200', async () => {
    const res = await fetch('http://localhost:3999/status');
    assert.strictEqual(res.status, 200);
  });

  await test('GET /items/abc returns 404', async () => {
    const res = await fetch('http://localhost:3999/items/abc');
    assert.strictEqual(res.status, 404, 'Expected 40 but got ' + res.status);
  });

  await test('POST /items returns 201', async () => {
    const res = await fetch('http://localhost:3999/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test Item' })
    });
    assert.strictEqual(res.status, 201, 'Expected 20 but got ' + res.status);
  });

  await test('GET /items/1 returns 200 after creation', async () => {
    const res = await fetch('http://localhost:3999/items/1');
    assert.strictEqual(res.status, 200);
  });

  console.log('\nResults: ' + passed + ' passed, ' + failed + ' failed');
  server.close();
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(err => {
  console.error(err);
  process.exit(1);
});