import styled from 'styled-components';

import { shade } from 'polished';

interface CardProps {
  total?: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;

export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  margin-top: -150px;
  overflow: auto;
`;

export const Card = styled.div`
  background: ${({ total }: CardProps): string => (total ? '#FF872C' : '#fff')};
  padding: 22px 32px;
  border-radius: 5px;
  color: ${({ total }: CardProps): string => (total ? '#fff' : '#363F5F')};
  min-height: 136px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 16px;
    }
  }

  h1 {
    margin-top: 14px;
    font-size: 36px;
    font-weight: normal;
    line-height: 54px;
  }

  span {
    color: #969cb3;
    font-size: 12px;
  }
`;

export const TableContainer = styled.section`
  margin-top: 64px;

  table {
    width: 100%;
    border-spacing: 0 8px;

    @media (max-width: 767px) {
      display: none;
    }

    th {
      color: #969cb3;
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }

    td {
      padding: 20px 32px;
      border: 0;
      background: #fff;
      font-size: 16px;
      font-weight: normal;
      color: #969cb3;

      div {
        display: flex;
        align-items: center;

        img {
          margin-right: 22px;
        }
      }

      .btn-group-actions {
        justify-content: space-between;
        border-radius: 5px;

        button {
          border: none;
          background: #fff;
          box-shadow: 0 0 10px #f2f2f2;
          width: 40px;
          height: 35px;

          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;

          &:hover {
            box-shadow: none;
            svg {
              path,
              line,
              polyline {
                color: #5636d3;
              }
            }
          }

          &:nth-child(1) {
            border-right: none;
            border-bottom-left-radius: 5px;
            border-top-left-radius: 5px;
          }
          &:nth-child(3) {
            border-left: none;
            border-bottom-right-radius: 5px;
            border-top-right-radius: 5px;
            background: #e83f5b;
            svg {
              path,
              line,
              polyline {
                color: #fff;
              }
            }
          }
        }
      }

      &.title {
        color: #363f5f;
      }

      &.income {
        color: #12a454;
      }

      &.outcome {
        color: #e83f5b;
      }
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
    }
  }

  .mobile-list-transactions {
    @media (min-width: 768px) {
      display: none;
    }

    &-item {
      padding: 17px 24px;
      border-radius: 5px;
      background: #fff;

      & + .mobile-list-transactions-item {
        margin-top: 16px;
      }

      p {
        font-size: 14px;
        color: #363f5f;
      }
      h3 {
        color: #12a454;
        font-weight: normal;
        font-size: 20px;

        &.income {
          color: #12a454;
        }

        &.outcome {
          color: #e83f5b;
        }
      }
      div {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      span {
        color: #969cb3;
        font-size: 14px;
      }
    }
  }
`;
