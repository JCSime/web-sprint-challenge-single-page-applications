import React from "react";
import '../App.css';
import {Switch, Route, Link, useHistory} from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import Form from './Form';
import Order from './Order';

const initialFormValues = {
  size: '',
  sauce: '',

  pepperoni: false,
  sausage: false,
  canadianBacon: false,
  
  sub: '',
  specialIns: '',
}
const initialFormErrors = {
  size: '',
  sauce: '',
  sub: '',
  specialIns: '',
}
const initialOrder = []
const initialDisabled = true;


export default function App() {
  const [orders, setOrders] = useState(initialOrder);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const postNewOrder = newOrder => {
    axios.post('http://fakeapi.com/api/orders', newOrder)
    .then(resp => {
      setOrders([resp.data, ...orders]);
    }).catch(err => console.error(err))
    .finally(() => setFormValues(initialFormValues))
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
    .validate(value)
    .then(() => setFormErrors({ ...formErrors, [name]: '' }))
    .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = () => {
    const newOrder = {
      size: formValues.size.trim(),
      sauce: formValues.sauce.trim(),
      toppings: ['pepperoni', 'sausage', 'canadianBacon'].filter(topping => !!formValues[topping])
    }
    postNewOrder(newOrder);
  }

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])
  return (
    <div className="App">
      <header>Header goes here!</header>
      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
      {
        orders.map(order => {
          return (
            <Order key={order.id} details={order} />
          )
        })
      }
    </div>
  );
};
