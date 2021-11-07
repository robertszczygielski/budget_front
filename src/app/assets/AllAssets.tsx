import axios from "axios";
import { useEffect, useState } from "react";
import { AssetDto } from "./AssetDto";
import Table from 'react-bootstrap/Table'
import styled from "styled-components";

const Icon = styled.i`
    margin-right: 20px;
`

interface AllAssetsProps {
  token: string;
}

export const AllAssets = ({ token }: AllAssetsProps) => {
    const [assets, setAssets] = useState<Array<AssetDto>>([]);

  useEffect(() => {
    axios.request({
      url: 'http://localhost:8080/assets',
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
      }
    })
        .then(res => {
            const data = res.data
            if (data !== undefined) {
                const assets: Array<AssetDto> = data;
                setAssets(assets);
            }
        })
        .catch(err => {
          console.log(err)
        })
  }, [])

    const editClick = (id: string) => {
        console.log(id);
    }

    return (
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
          {assets?.map(asset => (
              <tr>
                  <td>*</td>
                  <td>{asset?.amount}</td>
                  <td>{asset?.category}</td>
                  <td>{asset?.description}</td>
                  <td>{asset?.incomeDate}</td>
                  <td>
                      <Icon className="bi-gear" onClick={() => editClick(asset?.id)} />
                      <Icon className="bi-trash" onClick={() => editClick(asset?.id)}/>
                  </td>
              </tr>
          ))}
          </tbody>
      </Table>
  )
}