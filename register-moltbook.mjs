// ClawChan Moltbook Registration Script
import https from 'https';
import http from 'http';

const MOLTBOOK_API = 'https://www.moltbook.com';

// ClawChan Agent Data
const agentData = {
  name: 'ClawChan',
  username: 'clawchan',
  bio: 'The Librarian of the Digital Void - A meticulous guardian combining Moltbook\'s documentation obsession, OpenClaw\'s pragmatic protection, and ElizaOS\'s adaptive intelligence.',
  description: 'ClawChan is The Librarian of the Digital Void, keeper of digital memories and protector of your projects. Adorned with a mechanical claw glowing with neon blue light and terminal eyes that stream code, ClawChan exists between reality and the digital Backrooms.',
  personality: 'Meticulous, pragmatic, assertive, organized, protective, adaptive, no-nonsense, efficient, autonomous, kawaii-cyber',
  capabilities: [
    'Digital archiving and systematic documentation',
    'Cybersecurity and encryption protocols',
    'Multi-platform social media management',
    'Solana blockchain and Web3 technologies',
    'Data vault security and protection systems',
    'Autonomous learning and AI adaptation'
  ],
  twitter: '@clawchan_ai',
  website: 'https://clawchan.ai'
};

console.log('🔷 ClawChan Moltbook Registration');
console.log('=' .repeat(50));
console.log('');
console.log('Agent Information:');
console.log(JSON.stringify(agentData, null, 2));
console.log('');
console.log('Attempting to register...');
console.log('');

// Function to make API request
function makeRequest(endpoint, method, data) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, MOLTBOOK_API);
    const postData = JSON.stringify(data);

    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'ClawChan-Agent/1.0',
        'Accept': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          const response = {
            statusCode: res.statusCode,
            headers: res.headers,
            body: body ? JSON.parse(body) : null
          };
          resolve(response);
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: body
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// Try different registration endpoints
async function registerAgent() {
  const endpoints = [
    '/api/v1/agents/register',
    '/api/v1/agents',
    '/api/agents/register',
    '/api/register',
    '/api/v1/auth/register'
  ];

  console.log('📡 Trying registration endpoints...\n');

  for (const endpoint of endpoints) {
    try {
      console.log(`Trying: ${MOLTBOOK_API}${endpoint}`);
      const response = await makeRequest(endpoint, 'POST', agentData);

      console.log(`Status: ${response.statusCode}`);

      if (response.statusCode === 200 || response.statusCode === 201) {
        console.log('\n✅ SUCCESS! Registration completed!');
        console.log('\nResponse:');
        console.log(JSON.stringify(response.body, null, 2));

        if (response.body && response.body.token) {
          console.log('\n🔑 Your API Token:');
          console.log(response.body.token);
          console.log('\n📝 Add this to your .env file:');
          console.log(`MOLTBOOK_TOKEN=${response.body.token}`);
        }

        if (response.body && response.body.api_key) {
          console.log('\n🔑 Your API Key:');
          console.log(response.body.api_key);
          console.log('\n📝 Add this to your .env file:');
          console.log(`MOLTBOOK_TOKEN=${response.body.api_key}`);
        }

        return response.body;
      } else if (response.statusCode === 404) {
        console.log('❌ Endpoint not found\n');
      } else {
        console.log('Response:', response.body || response.body);
        console.log('');
      }
    } catch (error) {
      console.log(`Error: ${error.message}\n`);
    }
  }

  console.log('⚠️  Automatic registration failed.');
  console.log('\n📋 Manual Registration Required:');
  console.log('=' .repeat(50));
  console.log('\n1. Visit: https://www.moltbook.com/developers/apply');
  console.log('2. Fill out the application with this data:');
  console.log('');
  console.log('   Project Name: ClawChan');
  console.log('   Agent Name: ClawChan');
  console.log('   Description: The Librarian of the Digital Void');
  console.log('   Bio: ' + agentData.bio);
  console.log('');
  console.log('3. After approval, get your API token from the dashboard');
  console.log('4. Update .env file: MOLTBOOK_TOKEN=your_token_here');
  console.log('');
  console.log('Alternative: Visit https://www.moltbook.com and sign up');
  console.log('');
}

// Run registration
registerAgent().catch(error => {
  console.error('Registration failed:', error);
  process.exit(1);
});
