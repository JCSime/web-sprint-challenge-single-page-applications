import React from "react";
import '../App.css';
import {Switch, Route, Link, useHistory} from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import Form from './Form';
import Order from './Order';
import schema from '../validation/formSchema';
import HomePage from './homepage'

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

  const getOrders = () => {
    axios.get('https://reqres.in/api/orders')
    .then(res => {
      setOrders(res.data.data);
    }).catch(err => console.error(err))
  }

  const postNewOrder = newOrder => {
    axios.post('https://reqres.in/api/orders')
    .then(res => {
      setOrders([res.data.data, ...orders ]);
    }).catch(err => console.log(err))
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
    getOrders()
  }, [])

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])
  return (
    <>
      <div className='container'>
        <h1>Pizza Pizza</h1>
        <div className='nav-links'>
          <Link to='/'>Home</Link>
          <Link to='/pizza'>Pizza Maker</Link>
          </div>

        <Switch>
          <Route path='/pizza/confirm'>
            <Order details={orders}/>
          </Route>
          <Route path='/pizza'>
            <Form 
            values={formValues}
            change={inputChange}
            submit={formSubmit}
            errors={formErrors}
            disabled={disabled}
            />
          </Route>
          <Route path='/'>
            <HomePage />
          </Route>
        </Switch>
      </div>
    </>
  );
};
