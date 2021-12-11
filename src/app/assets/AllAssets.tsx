import axios from "axios";
import { useEffect, useState } from "react";
import { AssetDto } from "./AssetDto";
import Table from 'react-bootstrap/Table'
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import { TokenProps } from "../common/BudgetProps";

const Icon = styled.i`
    margin-right: 20px;
`

export const AllAssets = ({token}: TokenProps) => {
    const [assets, setAssets] = useState<Array<AssetDto>>([]);
    const [showModal, setShowModal] = useState(false);
    const [assetToRemove, setAssetToRemove] = useState<AssetDto | undefined>(undefined)

    const reloadAllAssets = () => {
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
    }

    useEffect(() => reloadAllAssets(), [])

    const editClick = (assetDto: AssetDto) => {
        console.log(assetDto);
    }

    const delClick = (assetDto: AssetDto) => {
        setShowModal(true);
        setAssetToRemove(assetDto)
    }

    const fetchRemoveAsset = () => {
        axios.request({
            url: 'http://localhost:8080/assets',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: assetToRemove
        })
        .then(() => {
            setShowModal(false);
            reloadAllAssets();
        })
        .catch(err => { console.log(err); })
    }

    return (
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
                {assets?.map(asset => (
                    <tr>
                        <td>*</td>
                        <td>{asset?.amount}</td>
                        <td>{asset?.category}</td>
                        <td>{asset?.description}</td>
                        <td>{asset?.incomeDate}</td>
                        <td>
                            <Icon className="bi-gear" onClick={() => editClick(asset)}/>
                            <Icon className="bi-trash" onClick={() => delClick(asset)}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Usuwanie przychodu
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Usunąć przychód:</p>
                    <p>Wartość: {assetToRemove?.amount}</p>
                    <p>Opis: {assetToRemove?.description}</p>
                </Modal.Body>
                <button onClick={() => setShowModal(false)}>Cancel</button>
                <button onClick={fetchRemoveAsset}>Usuń</button>
            </Modal>
        </>
    )
}