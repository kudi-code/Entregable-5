import React, { useState } from 'react';
import NavBar from './NavBar';
import { purchaseThunk } from "../redux/actions";
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';



const Buy = () => {
    // "street": "Green St. 1456",
    // "colony": "Southwest",
    // "zipCode": 12345,
    // "city": "USA",
    // "references": "Some references"
    const [street, setStreet] = useState("")
    const [colony, setColony] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [city, setCity] = useState("")
    const [references, setReferences] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submit = () => {
        const address = {
            street,
            colony,
            zipcode,
            city,
            references
        }
        dispatch(purchaseThunk(address))
        navigate(`/purchases`)
    }

    return (
        <div>
            <NavBar></NavBar>

            <h4>Please Fill your data to proceed</h4>
            <form action="" onSubmit={submit}>
                <label htmlFor="street">street</label> <br />
                <input type="text"
                className='street'
                onChange={e => setStreet(e.target.value)}
                value= {street} />
                <br />
                <label htmlFor="colony">colony</label> <br />
                <input type="text"
                className='colony'
                onChange={e => setColony(e.target.value)}
                value= {colony} />
                <br />
                <label htmlFor="zipcode">zipcode</label> <br />
                <input type="text"
                className='zipcode'
                onChange={e => setZipcode(e.target.value)}
                value= {zipcode} />
                <br />
                <label htmlFor="city">city</label> <br />

                <input type="text"
                className='city'
                onChange={e => setCity(e.target.value)} 
                value= {city}/>
                <br />
                <label htmlFor="references">references</label> <br />
                <input type="text"
                className='references'
                onChange={e => setReferences(e.target.value)} 
                value= {references}/> <br />
                <button>Purchase</button>
            </form>
        </div>
    );
};

export default Buy;