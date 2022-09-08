import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { EtherealMailProvider } from "../providers/MailProvider/implementations/EtherealMailProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider", DayjsDateProvider
)

container.registerInstance<IMailProvider>(
  "EtherealMailProvider", new EtherealMailProvider()
)

container.registerSingleton<IStorageProvider>(
  "StorageProvider", LocalStorageProvider
)