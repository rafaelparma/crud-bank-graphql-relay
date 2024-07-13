import { app } from './app/app';
import { appConfig } from './app/configs';

  const PORT = appConfig.APP_PORT;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
