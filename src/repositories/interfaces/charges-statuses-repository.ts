import { ChargeStatus } from '@prisma/client';

export interface ChargesStatusesRepository {
  findAll(): Promise<ChargeStatus>
}