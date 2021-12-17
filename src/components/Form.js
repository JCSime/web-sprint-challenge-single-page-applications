import React from 'react';

export default function Form(props) {
    const {
        values,
        submit,
        change,
        disabled,
        errors,
    } = props;
    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }
    const onChange = evt => {
        const { 
            name, 
            value, 
            checked, 
            type 
        } = evt.target;
        const valueToUse = type ==='checkbox' ? checked : value;
        change(name, valueToUse)
    }

    return (
        <form id='pizza-form' className='form container' onSubmit={onSubmit}>
            <h1>Build Your Own Pizza</h1>
            <img src='../Assets/Pizza.jpg' alt='pizza picture' />
            <h2>Build your own pizza</h2>
            <div className='form-group inputs'>
                <div className='size'>
                    <h3>Choice of Size</h3>
                    <label>Size
                        <select
                            onChange={onChange}
                            value={values.size}
                            name='size'
                            id='size-dropdown'
                        >
                            <option value=''>Select</option>
                            <option value='small'>Small</option>
                            <option value='medium'>Medium</option>
                            <option value='large'>large</option>
                        </select>
                    </label>
                </div>
                <div className='sauce'>
                    <h3>Choice of Sauce</h3>
                    <label>Sauce
                        <p>Marinara</p>
                        <input 
                        type='radio'
                        name='sauce'
                        value='marinara'
                        onChange={onChange}
                        checked={values.sauce === 'marinara'}
                        />
                        <p>BBQ</p>
                        <input 
                        type='radio'
                        name='sauce'
                        value='BBQ'
                        onChange={onChange}
                        checked={values.sauce === 'BBQ'}
                        />
                        <p>Garlic Ranch</p>
                        <input 
                        type='radio'
                        name='sauce'
                        value='Garlic Ranch'
                        onChange={onChange}
                        checked={values.sauce === 'Garlic Ranch'}
                        />
                        <p>Spinach Alfredo</p>
                        <input 
                        type='radio'
                        name='sauce'
                        value='Spinach Alfredo'
                        onChange={onChange}
                        checked={values.sauce === 'Spinach Alfredo'}
                        />
                    </label>
                </div>
                <div className='toppings'>
                    <h3>Add Toppings</h3>
                    <label>Pepperoni
                        <input
                            type='checkbox'
                            name='pepperoni'
                            checked={values.pepperoni}
                            onChange={onChange}
                        />
                    </label>
                    <label>Sausage
                        <input
                            type='checkbox'
                            name='sausage'
                            checked={values.sausage}
                            onChange={onChange}
                        />
                    </label>
                    <label>Canadian Bacon
                        <input
                            type='checkbox'
                            name='canadianBacon'
                            checked={values.canadianBacon}
                            onChange={onChange}
                        />
                    </label>
                </div>
                <div className='special'>
                    <h3>Special Instructions</h3>
                    <input
                        value={values.specialIns}
                        onChange={onChange}
                        name='specialIns'
                        type='text'
                        id='special-text'
                        placeholder='Any notes?'
                    />
                </div>
                <div className='form-group submit'>
                    <button id='order-button' disabled={disabled}>$ Add to Order $</button>
                    <div className='errors'>
                        <div>{errors.size}</div>
                        <div>{errors.sauce}</div>
                    </div>
                </div>
            </div>
        </form>
    )
}