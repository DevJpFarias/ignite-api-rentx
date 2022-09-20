import { container } from "tsyringe";
import { EtherealMailProvider } from "../MailProvider/implementations/EtherealMailProvider";
import { IMailProvider } from "./IMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";

interface IMailProviderIndex {
  [key: string]: any
}

const mailProvider: IMailProviderIndex = {
  'ethereal': container.resolve(EtherealMailProvider),
  'ses': container.resolve(SESMailProvider)
}

const MAIL_PROVIDER = (process.env.MAIL_PROVIDER ? process.env.MAIL_PROVIDER : 'ses') as string

container.registerInstance<IMailProvider>(
  "MailProvider", mailProvider[MAIL_PROVIDER]
)