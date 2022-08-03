import { useState, useEffect } from 'react';
import { ContactsList } from './ContactsList/ContactsList';
import { nanoid } from 'nanoid';
import { ContactsForm } from './ContactsForm/ContactsForm';
import { Filter } from './Filter/Filter';
const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);
  return [state, setState];
};
export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const onFilterHandler = evt => {
    setFilter(evt.currentTarget.value);
  };

  const filterContacts = () => {
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  };
  const onSubmitHandler = ({ name, number }) => {
    let contactData = {
      id: nanoid(),
      name: name,
      number: number,
    };
    contacts.forEach(contact => {
      if (contact.name.toLowerCase() === name.toLowerCase()) {
        alert(`${name} is already in contacts`);
        contactData = {
          id: '',
          name: '',
          number: '',
        };
      }
    });
    contactData.id && setContacts(prevState => [...prevState, contactData]);
  };
  const deleteItem = itemId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== itemId)
    );
  };

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
      <ContactsForm onSubmit={onSubmitHandler} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={onFilterHandler} />
      <ContactsList deleteItem={deleteItem} filteredItems={filterContacts()} />
    </div>
  );
};
