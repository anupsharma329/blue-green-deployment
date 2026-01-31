const http = require("http");

const PORT = 3000;

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Green Environment - Blue-Green Deployment</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #0d3320 0%, #1a5c3a 50%, #0d3320 100%);
      color: #e8f5e9;
      padding: 2rem;
    }
    .card {
      background: rgba(255, 255, 255, 0.08);
      border: 2px solid #4caf50;
      border-radius: 16px;
      padding: 2.5rem;
      max-width: 520px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }
    h1 {
      color: #81c784;
      font-size: 1.75rem;
      margin-bottom: 0.5rem;
      text-shadow: 0 0 12px rgba(129, 199, 132, 0.5);
    }
    .version {
      color: #a5d6a7;
      font-size: 0.95rem;
      margin-bottom: 1.25rem;
    }
    .description {
      color: #c8e6c9;
      line-height: 1.6;
      font-size: 0.95rem;
    }
    .badge {
      display: inline-block;
      background: #2e7d32;
      color: #fff;
      padding: 0.25rem 0.6rem;
      border-radius: 6px;
      font-size: 0.8rem;
      margin-top: 1rem;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Green Environment</h1>
    <p class="version">Version 1.0 — Live</p>
    <p class="description">
      This is the <strong>green</strong> deployment. Traffic is currently routed here by the Application Load Balancer. 
      You can switch back to blue at any time via Terraform or the GitHub Actions workflow.
    </p>
    <span class="badge">Healthy</span>
  </div>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  const url = req.url?.split("?")[0] || "/";

  // Health check endpoint (for ALB or monitoring)
  if (url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "ok",
        environment: "green",
        version: "1.0",
        timestamp: new Date().toISOString(),
      })
    );
    return;
  }

  // Main page
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Green app listening on 0.0.0.0:${PORT}`);
});
