import { TokenProps } from "../common/BudgetProps";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { ExpensesDto } from "./ExpensesDto";
import styled from "styled-components";
import axios from "axios";
import { AssetDto } from "../assets/AssetDto";

const Icon = styled.i`
    margin-right: 20px;
`

export const AllExpenses = ({ token }: TokenProps) => {
  const [expenses, setExpenses] = useState<Array<ExpensesDto>>([]);

  const reloadAllExpenses = () => {
    axios.request({
      url: 'http://localhost:8080/expenses',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    })
        .then(res => {
          const data = res.data
          if (data !== undefined) {
            const expenses: Array<ExpensesDto> = data;
            setExpenses(expenses)
          }
        })
        .catch(err => {
          console.log(err)
        })
  }

  useEffect(() => reloadAllExpenses(), [])

  return(
      <>
        <Table bordered hover variant="dark">
          <thead>
          <tr>
            <th>#</th>
            <th>Wartość</th>
            <th>Kategoria</th>
            <th>Opis</th>
            <th>Data</th>
            <th>Akcje</th>
          </tr>
          </thead>
          <tbody>
          {expenses?.map(expense => (
              <tr>
                <td>*</td>
                <td>{expense?.amount}</td>
                <td>{expense?.category}</td>
                <td>{expense?.purchaseDate}</td>
                <td>{expense?.description}</td>
                <td>
                  <Icon className="bi-gear" onClick={() => console.log(expense.amount)}/>
                  <Icon className="bi-trash" onClick={() => console.log(expense.amount)}/>
                </td>
              </tr>
          ))}
          </tbody>
        </Table>
    </>
  )
}