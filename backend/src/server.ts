import app from './app';
import { testConnection, closeConnection } from './config/database';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3001;

// Graceful shutdown handling
const gracefulShutdown = async (signal: string) => {
  console.log(`
${signal} received. Starting graceful shutdown...`);

  try {
    // Close database connections
    await closeConnection();
    console.log('✅ Database connections closed');

    // Exit process
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during graceful shutdown:', error);
    process.exit(1);
  }
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('UNHANDLED_REJECTION');
});

// Start server
async function startServer() {
  try {
    // Test database connection
    const dbConnected = await testConnection();

    if (!dbConnected) {
      console.error('❌ Failed to connect to database. Server not started.');
      process.exit(1);
    }

    // Start HTTP server
    const server = app.listen(PORT, () => {
      console.log('🚀 ====================================');
      console.log('🚀 HyperLocal Commerce API Server');
      console.log('🚀 ====================================');
      console.log(`🚀 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🚀 Server running on port: ${PORT}`);
      console.log(`🚀 API URL: http://localhost:${PORT}`);
      console.log(`🚀 Health check: http://localhost:${PORT}/api/health`);
      console.log('🚀 ====================================');

      if (process.env.NODE_ENV === 'development') {
        console.log('🔧 Development mode features:');
        console.log('🔧 - CORS enabled for localhost:5173');
        console.log('🔧 - Detailed error messages');
        console.log('🔧 - Request logging enabled');
        console.log('🔧 ====================================');
      }
    });

    // Handle server errors
    server.on('error', (error: any) => {
      if (error.syscall !== 'listen') {
        throw error;
      }

      const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

      switch (error.code) {
        case 'EACCES':
          console.error(`❌ ${bind} requires elevated privileges`);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(`❌ ${bind} is already in use`);
          console.log('💡 Try killing any processes using this port:');
          console.log(`💡 lsof -ti:${PORT} | xargs kill -9`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    });

    // Graceful shutdown for server
    const originalShutdown = gracefulShutdown;
    gracefulShutdown = async (signal: string) => {
      console.log(`
${signal} received. Stopping server...`);

      server.close(async (error) => {
        if (error) {
          console.error('❌ Error closing server:', error);
        } else {
          console.log('✅ Server closed');
        }

        await originalShutdown(signal);
      });
    };

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Start the application
startServer();