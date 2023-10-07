/* eslint-disable no-console */
import app from './app';
import { Config } from './config';

const startServer = () => {
  const port = Config.PORT;

  try {
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
