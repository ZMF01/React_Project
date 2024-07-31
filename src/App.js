import React from 'react';
import customers from './memdb.js'

function log(message){console.log(message);}

export function App(params) {
  // let blankCustomer = { "id": -1, "name": "", "email": "", "password": "" };
  let formObject = customers[0];
  let mode = (formObject.id >= 0) ? 'Update' : 'Add';

  // const getCustomers =  function(){
  //   log("in getCustomers()");
  // }

  const handleListClick = function(item){
    log("in handleListClick()");
  }  

  const handleInputChange = function (event) {
    log("in handleInputChange()");
  }

  let onCancelClick = function () {
    log("in onCancelClick()");
  }

  let onDeleteClick = function () {
    log("in onDeleteClick()");
  }

  let onSaveClick = function () {
    log("in onSaveClick()");
  }

  return (
    <div>
      <div className="boxed" >
        <h4>Customer List</h4>
        <table id="customer-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Pass</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(
              (item, index) => {
                return (<tr key={item.id} 
                onClick={()=>handleListClick(item)} 
                >
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                </tr>);
              }
            )}
          </tbody>
        </table>
    </div>
    <div className="boxed">
      <div>
        <h4>{mode}</h4>
      </div>
      <form >
        <table id="customer-add-update" >
          <tbody>
            <tr>
              <td className={'label'} >Name:</td>
              <td><input
                type="text"
                name="name"
                value={formObject.name}
                onChange={handleInputChange}
                placeholder="Customer Name"
                required /></td>
            </tr>
            <tr>
              <td className={'label'} >Email:</td>
              <td><input
                type="email"
                name="email"
                value={formObject.email}
                onChange={handleInputChange}
                placeholder="name@company.com" /></td>
            </tr>
            <tr>
              <td className={'label'} >Pass:</td>
              <td><input
                type="text"
                name="password"
                value={formObject.password}
                onChange={handleInputChange}
                placeholder="password" /></td>
            </tr>
            <tr className="button-bar">
              <td colSpan="2">
                <input type="button" value="Delete" onClick={onDeleteClick} />
                <input type="button" value="Save" onClick={onSaveClick} />
                <input type="button" value="Cancel" onClick={onCancelClick} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
    </div>
  );
}

export default App;

