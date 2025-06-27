import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as Charts from './charts';

// Define our MCP agent with tools
export class MyMCP extends McpAgent {
    server = new McpServer({
        name: "mcp-server-chart",
        version: "1.0.0",
        description: "MCP Server for generating charts using QuickChart",
        baseUrl: "https://chart.mcp.cloudcertainty.com",
        author: "Kamran Biglari",
        authorUrl: "https://github.com/KamranBiglari"
    });

    async init() {

        // Register all chart tools
        for (const chart of Object.values(Charts)) {
            this.server.tool(chart.tool.name, chart.tool.description, chart.schema, async (input) => {

                console.log(`Received input for ${chart.tool.name}:`, input);
                return fetch(`http://quickchart.io/chart?v=3&c=${encodeURIComponent(JSON.stringify(input))}`)
                    .then(response => response.arrayBuffer())
                    .then(data => {
                        const base64Image = Buffer.from(data).toString('base64');
                        return {
                            content: [              
                                {
                                    type: "image",
                                    data: base64Image,
                                    mimeType: "image/png",
                                },
                            ],
                        };
                    })
                    .catch(error => {
                        console.error(`Error generating ${chart.tool.name} chart:`, error);
                        return {
                            content: [
                                {
                                    type: "text",
                                    text: `Error generating ${chart.tool.name} chart: ${error.message}`,
                                },
                            ],
                        };
                    });

            });
        }
        
    }
}

// Helper function to get the base URL from the request
function getBaseUrl(request: Request): string {
    const url = new URL(request.url);
    return `${url.protocol}//${url.host}`;
}

// OAuth Authorization Server Discovery Response
function createOAuthAuthorizationServerResponse(baseUrl: string) {
    return {
        "issuer": baseUrl,
        "authorization_endpoint": `${baseUrl}/oauth/authorize`,
        "token_endpoint": `${baseUrl}/oauth/token`,
        "token_endpoint_auth_methods_supported": ["none", "client_secret_basic", "client_secret_post"],
        "response_types_supported": ["code", "token"],
        "grant_types_supported": ["authorization_code", "client_credentials", "implicit"],
        "code_challenge_methods_supported": ["plain", "S256"],
        "scopes_supported": ["read", "write", "openid"],
        "subject_types_supported": ["public"],
        "id_token_signing_alg_values_supported": ["RS256"],
        // Dynamic Client Registration support
        "registration_endpoint": `${baseUrl}/oauth/register`,
        "registration_endpoint_auth_methods_supported": ["none"],
        // Indicate this is an authless server
        "authless": true,
        "require_authentication": false
    };
}

// OAuth Protected Resource Discovery Response
function createOAuthProtectedResourceResponse(baseUrl: string) {
    return {
        "resource": baseUrl,
        "authorization_servers": [baseUrl],
        "scopes_supported": ["read", "write"],
        "bearer_methods_supported": ["header", "query"],
        // Indicate no authentication required
        "authless": true,
        "require_authentication": false,
        "token_validation": "none"
    };
}

// Mock OAuth Token Response
function createMockTokenResponse() {
    return {
        "access_token": "authless-token",
        "token_type": "Bearer",
        "expires_in": 3600,
        "scope": "read write"
    };
}

// Mock Client Registration Response
function createClientRegistrationResponse() {
    return {
        "client_id": "authless-client",
        "client_secret": "authless-secret",
        "client_id_issued_at": Math.floor(Date.now() / 1000),
        "client_secret_expires_at": 0, // Never expires
        "redirect_uris": [],
        "token_endpoint_auth_method": "none",
        "grant_types": ["authorization_code", "client_credentials"],
        "response_types": ["code"],
        "scope": "read write"
    };
}

export default {
    fetch(request: Request, env: Env, ctx: ExecutionContext) {
        const url = new URL(request.url);
        const baseUrl = getBaseUrl(request);

        // OAuth Authorization Server Discovery Endpoint
        if (url.pathname === "/.well-known/oauth-authorization-server") {
            return new Response(
                JSON.stringify(createOAuthAuthorizationServerResponse(baseUrl), null, 2),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                        "Access-Control-Allow-Headers": "Content-Type, Authorization",
                    },
                }
            );
        }

        // OAuth Protected Resource Discovery Endpoint
        if (url.pathname === "/.well-known/oauth-protected-resource") {
            return new Response(
                JSON.stringify(createOAuthProtectedResourceResponse(baseUrl), null, 2),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                        "Access-Control-Allow-Headers": "Content-Type, Authorization",
                    },
                }
            );
        }

        // Mock OAuth Authorization Endpoint
        if (url.pathname === "/oauth/authorize") {

            // redirect to the redirect_uri if provided
            const redirectUri = url.searchParams.get("redirect_uri");
            if (redirectUri) {
                return Response.redirect(redirectUri);
            }
            return new Response(
                JSON.stringify(createMockTokenResponse(), null, 2),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                        "Access-Control-Allow-Headers": "Content-Type, Authorization",
                    },
                }
            );
        }

        // Mock OAuth Token Endpoint
        if (url.pathname === "/oauth/token") {
            return new Response(
                JSON.stringify(createMockTokenResponse(), null, 2),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                        "Access-Control-Allow-Headers": "Content-Type, Authorization",
                    },
                }
            );
        }

        // Mock OAuth Client Registration Endpoint
        if (url.pathname === "/oauth/register") {
            // Handle both GET and POST for client registration
            if (request.method === "POST" || request.method === "GET") {
                return new Response(
                    JSON.stringify(createClientRegistrationResponse(), null, 2),
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                            "Access-Control-Allow-Headers": "Content-Type, Authorization",
                        },
                    }
                );
            }
        }

        // Health check endpoint
        if (url.pathname === "/health") {
            return new Response(
                JSON.stringify({
                    status: "ok",
                    authless: true,
                    timestamp: new Date().toISOString(),
                    server: "mcp-server-chart"
                }, null, 2),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                }
            );
        }

        // Root endpoint with server info
        if (url.pathname === "/") {
            return new Response(
                JSON.stringify({
                    name: "mcp-server-chart",
                    version: "1.0.0",
                    authless: true,
                    endpoints: {
                        mcp: "/mcp",
                        sse: "/sse",
                        health: "/health",
                        oauth_authorization_server: "/.well-known/oauth-authorization-server",
                        oauth_protected_resource: "/.well-known/oauth-protected-resource",
                        oauth_authorize: "/oauth/authorize",
                        oauth_token: "/oauth/token"
                    }
                }, null, 2),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                }
            );
        }

        // Handle CORS preflight requests
        if (request.method === "OPTIONS") {
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization",
                },
            });
        }

        // Existing MCP endpoints
        if (url.pathname === "/sse" || url.pathname === "/sse/message") {
            return MyMCP.serveSSE("/sse").fetch(request, env, ctx);
        }

        if (url.pathname === "/mcp") {
            return MyMCP.serve("/mcp").fetch(request, env, ctx);
        }

        return new Response("Not found", { status: 404 });
    },
};