import app from './app';
import { Config } from './config';
import logger from './config/logger';

const startServer = () => {
  const port = Config.PORT;

  try {
    app.listen(port, () => logger.info(`Listening on port ${port}`));
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error);
      setTimeout(() => {
        process.exit(1);
      }, 1000);
    }
  }
};

startServer();
