import { container } from "tsyringe";
import { EtherealMailProvider } from "../MailProvider/implementations/EtherealMailProvider";
import { IMailProvider } from "./IMailProvider";
import { SESMailProvider } from "./implementations/SesMailProvider";

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider)
}

container.registerInstance<IMailProvider>(
  "MailProvider", mailProvider[process.env.MAIL_PROVIDER]
)