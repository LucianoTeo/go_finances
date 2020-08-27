import React, { useState, useEffect } from 'react';

import { FiEdit, FiEyeOff, FiTrash2 } from 'react-icons/fi';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';
import venda from '../../assets/venda.svg';
import alimentacao from '../../assets/alimentacao.svg';
import casa from '../../assets/casa.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';
import months from '../../utils/months';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
  lastIncomeDate: {
    day: string;
    month: string;
  };
  lastOutcomeDate: {
    day: string;
    month: string;
  };
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get('/transactions');

      const transactionsFormatted = response.data.transactions.map(
        (transaction: Transaction) => ({
          ...transaction,
          formattedValue: formatValue(transaction.value),
          formattedDate: new Date(transaction.created_at).toLocaleDateString(
            'pt-br',
          ),
        }),
      );

      const incomes = transactionsFormatted.filter(
        (transaction: Transaction) => transaction.type === 'income',
      );

      const outcomes = transactionsFormatted.filter(
        (transaction: Transaction) => transaction.type === 'income',
      );

      const [lastIncome] = incomes.slice(-1);
      const [lastOutcome] = outcomes.slice(-1);

      const lastIncomeDate = new Date(lastIncome?.created_at);
      const lastOutcomeDate = new Date(lastOutcome?.created_at);

      const lastIncomeMonth = lastIncomeDate.getMonth();
      const lastOutcomeMonth = lastOutcomeDate.getMonth();

      const balanceFormatted = {
        income: formatValue(response.data.balance.income),
        outcome: formatValue(response.data.balance.outcome),
        total: formatValue(response.data.balance.total),
        lastIncomeDate: {
          day: lastIncomeDate.getDate().toLocaleString(),
          month: months[lastIncomeMonth],
        },
        lastOutcomeDate: {
          day: lastOutcomeDate.getDate().toLocaleString(),
          month: months[lastOutcomeMonth],
        },
      };

      setTransactions(transactionsFormatted);
      setBalance(balanceFormatted);
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance.income}</h1>
            <span>
              {balance.lastIncomeDate
                ? `Última entrada dia ${balance.lastIncomeDate.day} de ${balance.lastIncomeDate.month}`
                : 'Carregando'}
            </span>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
            <span>
              {balance.lastIncomeDate
                ? `Última saída dia ${balance.lastIncomeDate.day} de ${balance.lastIncomeDate.month}`
                : 'Carregando'}
            </span>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td className="title">{transaction.title}</td>
                  <td className={`${transaction.type}`}>
                    {transaction.type === 'outcome' && ' - '}
                    {transaction.formattedValue}
                  </td>
                  <td>
                    <div>
                      <img src={venda} alt={transaction.category.title} />
                      {transaction.category.title}
                    </div>
                  </td>
                  <td>{transaction.formattedDate}</td>
                  <td>
                    <div className="btn-group-actions">
                      <button type="button">
                        <FiEyeOff size={18} />
                      </button>
                      <button type="button">
                        <FiEdit size={18} />
                      </button>
                      <button type="button">
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mobile-list-transactions">
            {transactions.map(transaction => (
              <div
                key={transaction.id}
                className="mobile-list-transactions-item"
              >
                <p className="title">{transaction.title}</p>
                <h3 className={`${transaction.type}`}>
                  {transaction.type === 'outcome' && ' - '}
                  {transaction.formattedValue}
                </h3>
                <div>
                  <span>{transaction.category.title}</span>
                  <span>{transaction.formattedDate}</span>
                </div>
              </div>
            ))}
          </div>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
