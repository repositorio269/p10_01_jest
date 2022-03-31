import React, { useEffect, useState } from 'react'
import useDateInput from '../hooks/useDateInput';
import useNumberInput from '../hooks/useNumberInput';
import useSelectInput from '../hooks/useSelectInput';
import useTextInput from '../hooks/useTextInput'
import formatCurrency from '../utils/formatCurrency';

export default function CreateBudget() {

    const inputsData = {
        customer: {
            value: '',
            label: 'Cliente',
            maxLength: 100,
            valid: false,
            errorMessages: ['*','El Cliente debe tener al menos 4 caracteres'],
            pattern: /^.{4,}$/
        },
        cif: {
            value: '',
            label: 'CIF',
            maxLength: 9,
            valid: false,
            errorMessages: ['*','El CIF debe comenzar por letra válida y tener 9 caracteres'],
            pattern: /([ABCDEFGHPQS])([0-9]{8})/i
        },
        contact: {
            value: '',
            label: 'Contacto',
            maxLength: 100,
            valid: true,
            errorMessages: ['',''],
            pattern: /.*/i // All credits to Raul :)
        },
        date: {
            value: new Date().toISOString().substring(0,10),
            label: 'Fecha presupuesto'
        },
        amount: {
            value: 0,
            label: 'Importe presupuesto'
        },
        tax: {
            value: 0.21,
            label: '% de IVA',
            options: [
                {text: '0 %',value: 0},
                {text: '4 %',value: 0.04},
                {text: '10 %',value: 0.1},
                {text: '21 %',value: 0.21},
            ]
        }

    }

    const [customerInput, customerValue, customerValid] = useTextInput(inputsData.customer);  
    const [cifInput, cifValue, cifValid] = useTextInput(inputsData.cif); 
    const [contactInput, contactValue] = useTextInput(inputsData.contact);
    const [dateInput, dateValue] = useDateInput(inputsData.date);
    const [amountInput, amountValue] = useNumberInput(inputsData.amount);
    const [taxInput, taxValue] = useSelectInput(inputsData.tax);

    const [calcFields, setCalcFields] = useState({
        taxAmount: 0,
        totalBudget: 0
    })

    const [isValidForm, setIsValidForm] = useState(false);

    useEffect(() => {
        const taxAmount = amountValue * taxValue;
        const totalBudget = amountValue + taxAmount;
        setCalcFields({taxAmount, totalBudget});
    }, [amountValue, taxValue])

    const handleOnSubmit = e => {
        e.preventDefault();
        console.log({
            customer: customerValue,
            cif: cifValue,
            contact: contactValue,
            date: dateValue,
            amount: amountValue,
            tax: taxValue,
            //...
        })
    }

    useEffect(() => {
         setIsValidForm(customerValid && cifValid);
    }, [customerValid, cifValid])

    return (
        <div className="container">
            <div className="row">
                <div className="col-100">
                    <form onSubmit={handleOnSubmit}>
                        <div className="row">
                            <div className="col-100">
                                {customerInput}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-100">
                                {cifInput}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-100">
                                {contactInput}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50">
                                {dateInput}
                            </div>
                            <div className="col-50">
                                {amountInput}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50"></div>
                            <div className="col-50">
                                {taxInput}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50"></div>
                            <div className="col-50">
                                <label>Importe de IVA</label>
                                <input type="string"
                                       readOnly
                                       value={formatCurrency('EUR', calcFields.taxAmount)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50"></div>
                            <div className="col-50">
                                <label>Total Presupuesto</label>
                                <input type="string"
                                       readOnly
                                       value={formatCurrency('EUR', calcFields.totalBudget)}/>
                            </div>
                        </div>

                        <div className="row end">
                            <button type='submit'
                                    disabled={!isValidForm}>Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
