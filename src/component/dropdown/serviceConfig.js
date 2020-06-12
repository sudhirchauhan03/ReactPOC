import { AppConfiguration } from "read-appsettings-json";

const ServiceConfig = () => {
  const url = {
    Dev: AppConfiguration.Setting().AppServer
  };

  return url.Dev;
};

export const AppEnvironment = () => {
  const url = {
    Environment: AppConfiguration.Setting().AppEnvironment
  };
  return url.Environment;
};

export default ServiceConfig;
