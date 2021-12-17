import React from 'react';

export default function Form(props) {
    const {
        values,
        submit,
        change,
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
        <form className='pizza-form' onSubmit={onSubmit}>
            <h1>Build Your Own Pizza</h1>
            <img src='' alt='pizza picture' />
            <h2>Build your own pizza</h2>
            <div className='form-group inputs'>
                <h3>Choice of Size</h3>
                <label>Size
                    <select
                        onChange={onChange}
                        value={values.size}
                        name='size'
                    >
                        <option value=''>Select</option>
                        <option value='small'>Small</option>
                        <option value='medium'>Medium</option>
                        <option value='large'>large</option>
                    </select>
                </label>
                <h3>Choice of Sauce</h3>
                <label>Sauce
                    <input></input>
                </label>
                <h3>Add Toppings</h3>
                <h3>Choice of Substitute</h3>
                <h4>choose up to 1</h4>
                <h3>Special Instructions</h3>
            </div>
            
        </form>
    )
}