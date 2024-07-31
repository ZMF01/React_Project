import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import customers from './memdb.js'
import { getAll, post, put, deleteById } from './memdb.js'
import { CustomerList } from './CustomerList.js';
import { CustomerAddUpdateForm } from './CustomerAddUpdateForm.js';

function log(message){console.log(message);}

export function App(params) {
  let blankCustomer = { "id": -1, "name": "", "email": "", "password": "" };
  //let formObject = customers[0];
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);
  let mode = (formObject.id >= 0) ? 'Update' : 'Add';
  const [refreshFlag, setRefreshFlag] = useState(0);


  // Update Customers with the useEffect Hook
  const getCustomers =  function(){
    //log("in getCustomers()");
    setCustomers(getAll());
  }
  useEffect(() => { getCustomers() }, [refreshFlag]);

  const handleListClick = function(item){
    //log("in handleListClick()");
    setFormObject(item);
  } 


  const handleInputChange = function (event) {
    //log("in handleInputChange()");
    const name = event.target.name;
    const value = event.target.value;
    let newFormObject = {...formObject}
    newFormObject[name] = value;
    setFormObject(newFormObject);
  }

  let onCancelClick = function () {
   // log("in onCancelClick()");
   setFormObject(blankCustomer);
  }

  // Implement the Delete Button
  let onDeleteClick = function () {
    //log("in onDeleteClick()");
    if(formObject.id >= 0){
      deleteById(formObject.id);
      setRefreshFlag(refreshFlag+1);
    }
    setFormObject(blankCustomer);
  }

  let onSaveClick = function () {
    //log("in onSaveClick()");
    if (mode === 'Add') {
      post(formObject);
      setRefreshFlag(refreshFlag+1);
    }
    if (mode === 'Update') {
      put(formObject.id, formObject);
      setRefreshFlag(refreshFlag+1);
    }
    setFormObject(blankCustomer);
  }

  let pvars = {
    mode: mode,
    handleInputChange: handleInputChange,
    formObject: formObject,
    onDeleteClick: onDeleteClick,
    onSaveClick: onSaveClick,
    onCancelClick: onCancelClick
  }

  return (
    <div>
      <CustomerList
        customers={customers}
        formObject={formObject}
        handleListClick={handleListClick}
      />
      <CustomerAddUpdateForm {...pvars} />
    </div>
  );
}

export default App;

