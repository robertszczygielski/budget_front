import { AllAssets } from "./assets/AllAssets";
import styled from "styled-components";
import { useState } from "react";
import { AddAsset } from "./assets/AddAsset";
import { AllExpenses } from "./expenses/AllExpenses";

const ButtonLogout = styled.button`
  background-colour: teal;
  color: red;
`

const StandardButton = styled.button`
  background-colour: teal;
  color: green;
`

const ButtonDiv = styled.div`
    display: flex;
`

enum ButtonDirections {
    ALL_ASSET = "all_asset",
    ADD_ASSET = "add_asset",
    ALL_EXPENSES = "all_expenses",
}

interface MainViewProps {
    token: string;
    setToken: (token: string) => void;
}

export const MainView = ({token, setToken}: MainViewProps) => {
    const [viewToDisplay, setViewToDisplay] = useState(ButtonDirections.ALL_ASSET);

    const logoutUser = (): void => {
        setToken('')
    }

    const setAllAssets = () => {
      setViewToDisplay(ButtonDirections.ALL_ASSET)
    }

    const setAddAssets = () => {
      setViewToDisplay(ButtonDirections.ADD_ASSET)
    }

    const setAllExpenses = () => {
      setViewToDisplay(ButtonDirections.ALL_EXPENSES)
    }

  return(
    <>
        <ButtonDiv>
            <ButtonLogout onClick={logoutUser}>Logout</ButtonLogout>
            <StandardButton onClick={setAllAssets}>Wszystkie przychody</StandardButton>
            <StandardButton onClick={setAddAssets}>Dodaj przychody</StandardButton>
            <StandardButton onClick={setAllExpenses}>Wszystkie wydatki</StandardButton>
        </ButtonDiv>
        {viewToDisplay === ButtonDirections.ALL_ASSET && <AllAssets token={token}/>}
        {viewToDisplay === ButtonDirections.ADD_ASSET && <AddAsset token={token}/>}
        {viewToDisplay === ButtonDirections.ALL_EXPENSES && <AllExpenses token={token}/>}
    </>
  )

}