import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {uuid} from "uuidv4";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import './App.css';

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] =useState([]);

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    }
    else {
      setSearchResults(contacts);
    }
  };

  useEffect(() => {
    const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(retrieveContacts)setContacts(retrieveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
   <div className="ui container">
     <Router>
        <Header />
        <Switch>
        <Route 
          path="/add" 
          render={(props) => (
            <AddContact {...props} addContactHandler={addContactHandler}
            />
          )}
        />
        <Route 
          path="/" 
          exact
          render={(props) => (
            <ContactList 
            {...props} 
            contacts={searchTerm.length < 1 ? contacts: searchResults} 
            getContactId={ removeContactHandler } 
            term={searchTerm}
            searchKeyword={searchHandler}
          /> 
          )}  
        />
        <Route path="/contact/:id" component={ContactDetail} />
        </Switch>
     </Router> 
   </div>
  );
}

export default App;
