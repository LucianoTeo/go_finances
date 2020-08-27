import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const checkIdExists = await transactionsRepository.findOne({
      where: { id },
    });

    if (!checkIdExists) {
      throw new AppError('You can not delete this transaction');
    }

    await transactionsRepository.delete({ id });
  }
}

export default DeleteTransactionService;
