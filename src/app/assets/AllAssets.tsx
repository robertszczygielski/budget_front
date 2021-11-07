import axios from "axios";
import { useEffect, useState } from "react";
import { AssetDto } from "./AssetDto";
import Table from 'react-bootstrap/Table'

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

  return (
      <Table responsive>
          <thead>
              <tr>
                  <th>#</th>
                  <th>Wartość</th>
                  <th>Kategoria</th>
                  <th>Opis</th>
                  <th>Data</th>
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
              </tr>
          ))}
          </tbody>
      </Table>
  )
}