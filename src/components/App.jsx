import React, { Component } from 'react';
import { ContactsList } from './ContactsList/ContactsList';
import { nanoid } from 'nanoid';
import { ContactsForm } from './ContactsForm/ContactsForm';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  componentDidMount() {
    if (localStorage.getItem('contacts')) {
      const contacts = localStorage.getItem('contacts');
      const parsedContacts = JSON.parse(contacts);
      this.setState({ contacts: parsedContacts });
    }
  }
  onFilterHandler = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  filterContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };
  onSubmitHandler = ({ name, number }) => {
    let contactData = {
      id: nanoid(),
      name: name,
      number: number,
    };
    this.state.contacts.forEach(contact => {
      if (contact.name.toLowerCase() === name.toLowerCase()) {
        alert(`${name} is already in contacts`);
        contactData = {
          id: '',
          name: '',
          number: '',
        };
      }
    });
    contactData.id &&
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contactData],
      }));
  };
  deleteItem = itemId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== itemId),
    }));
  };

  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactsForm onSubmit={this.onSubmitHandler} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.onFilterHandler} />
        <ContactsList
          deleteItem={this.deleteItem}
          filteredItems={this.filterContacts()}
        />
      </div>
    );
  }
}
