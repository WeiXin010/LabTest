// test-vulnerabilities.js

// Unsafe use of eval (CodeQL should flag this)
function runUserCode(userInput) {
  eval(userInput); // ⚠️ Potential code injection vulnerability
}

// Insecure HTTP request without validation (possible flag)
const http = require('http');
http.get('http://example.com/data', (res) => {
  // No validation of response data
  res.on('data', (chunk) => {
    console.log(chunk.toString());
  });
});

// Hardcoded secret (CodeQL should flag this)
const secretApiKey = '12345-ABCDE'; // ⚠️ Hardcoded secret key

// Insecure usage of child_process.exec (command injection risk)
const { exec } = require('child_process');
function deleteFile(filename) {
  exec(`rm ${filename}`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}

// Export so the file is valid as a module
module.exports = { runUserCode, deleteFile };
