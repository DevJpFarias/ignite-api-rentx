import { container } from "tsyringe";
import { IStorageProvider } from "./IStorageProvider";
import { LocalStorageProvider } from "./implementations/LocalStorageProvider";
import { S3StorageProvider } from "./implementations/S3StorageProvider";

interface diskStorageIndex {
  [key: string]: any
}

const diskStorage: diskStorageIndex = {
  local: LocalStorageProvider,
  s3: S3StorageProvider
}

const disk = (process.env.disk ? process.env.disk : 's3') as string

container.registerSingleton<IStorageProvider>(
  "StorageProvider", diskStorage[disk]
)