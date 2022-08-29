import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory"
import { AppError } from "@shared/errors/AppError"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let mailProvider: MailProviderInMemory
let dateProvider: DayjsDateProvider
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory= new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    mailProvider = new MailProviderInMemory()
    dateProvider = new DayjsDateProvider()
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    )
  })

  it('Should be able to send a forgot password mail for user', async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail")

    await usersRepositoryInMemory.create({
      driver_license: '038835',
      email: 'cuvdam@uku.jm',
      name: 'Hattie Jordan',
      password: '1234',
    })

    await sendForgotPasswordMailUseCase.execute('cuvdam@uku.jm')

    expect(sendMail).toHaveBeenCalled()
  })

  it('Should not be able to send an email if user does not exists', async () => {
    await expect((
      sendForgotPasswordMailUseCase.execute('adiraval@owobawki.tc')
    )).rejects.toEqual(new AppError('User does not exists!'))
  })

  it('Should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, 'create')

    await usersRepositoryInMemory.create({
      driver_license: '850817',
      email: 'ucsiguv@celti.eh',
      name: 'Ronald Wheeler',
      password: '1234',
    })

    await sendForgotPasswordMailUseCase.execute('ucsiguv@celti.eh')

    expect(generateTokenMail).toBeCalled()
  })
})