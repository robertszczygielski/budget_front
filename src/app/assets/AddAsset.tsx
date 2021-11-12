import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { AssetDto } from "./AssetDto";
import axios from "axios";
import { FormGroup } from "react-bootstrap";
import { useEffect, useState } from "react";

const Label = styled.label`
    font-size: 1em;
    left: 10%;
    top: 0;
    text-transform: capitalize;
    pointer-events: none;
    will-change: transform, font-size;
`
interface AddAssetProps {
    token: string;
}

enum Category {
    SALARY = "SALARY",
    BONUS = "BONUS",
    LOAN_RETURNED = "LOAN_RETURNED",
    RENT = "RENT",
    OTHER = "OTHER",
}

export const AddAsset = ({ token }: AddAssetProps) => {
    const [currency, setCurrency] = useState<Array<string>>();

const getCurrencyCodes = () => {
    axios.request({
        url: 'http://localhost:8080/currency/codes',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })
        .then(res => {
            const data = res.data
            if (data !== undefined) {
                setCurrency(data);
            }
        })
        .catch(err => {
            console.log(err)
        })
}

const onSubmit = (values: AssetDto) => {
    axios.request({
        url: 'http://localhost:8080/assets',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        data: [{
            amount: values.amount,
            incomeDate: values.incomeDate + "T01:01:01.001Z",
            category: values.category,
            description: values.description,
            currencyCode: values.currencyCode
        }]
    })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}

useEffect(() => {
    getCurrencyCodes();
}, [])

return(
    <>
        <Formik
            initialValues={{
                amount: 0,
                incomeDate: '',
                category: '',
                description: '',
                currencyCode: '',
            }}
            validationSchema={Yup.object({
                amount: Yup.number(),
                incomeDate: Yup.string(),
                category: Yup.string(),
                description: Yup.string(),
                currencyCode: Yup.string(),
            })}
            onSubmit={onSubmit}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <Label>Kwota:</Label>
                    <Field
                        placeholder="Kwota"
                        name="amount"
                        type="number"
                    />
                    <ErrorMessage name="amount" />
                    <br/>
                    <Label>Data przychodu</Label>
                    <Field
                        placeholder="RRRR-MM-DD"
                        name="incomeDate"
                        type="input"
                    />
                    <ErrorMessage name="incomeDate" />
                    <br/>
                    <Label htmlFor="category">Kategoria:</Label>
                    <br/>
                    <div role="group" aria-labelledby="category-radio-group">
                    {
                        Object.keys(Category).map( (c) =>
                            <>
                                <label>
                                    <Field type="radio" name="category" value={c} />
                                    {c}
                                </label>
                                <br/>
                            </>
                         )
                    }
                    </div>
                    <ErrorMessage name="category" />
                    <br/>

                    <Label htmlFor="description">Opis</Label>
                    <Field
                        placeholder="Opis"
                        name="description"
                        type="input"
                    />
                    <ErrorMessage name="description" />
                    <br/>

                    <Label htmlFor="currencyCode">Kod Waluty</Label>
                    <div role="group" aria-labelledby="currency-radio-group">
                        {
                            currency?.map( (c) =>
                                <>
                                    <label>
                                        <Field type="radio" name="currencyCode" value={c} />
                                        {c}
                                    </label>
                                    <br/>
                                </>
                            )
                        }
                        <label>
                            <Field type="radio" name="currencyCode" value="PLN" checked/>
                            PLN
                        </label>
                    </div>

                    <ErrorMessage name="currencyCode" />
                    <br/>
                    <button type="submit">Submit</button>
                </form>
            )}
        </Formik>
    </>
)
}