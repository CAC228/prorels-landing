// Local by default; LISTEN_HOST=0.0.0.0 is available for container hosting.
process.env.PORT ||= '4193';
process.env.HOSTNAME = process.env.LISTEN_HOST || '127.0.0.1';
await import('../.next/standalone/server.js');
