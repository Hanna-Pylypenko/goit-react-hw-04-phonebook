import { nanoid } from 'nanoid';
import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactsForm.module.css';
export const ContactsForm = ({ onSubmit }) => {
  const [contactName, setName] = useState('');
  const [contactNumber, setNumber] = useState('');

  const nameInputId = nanoid();
  const numberInputId = nanoid();
  const inputHandler = evt => {
    const { name, value } = evt.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const onContactInfoSubmit = evt => {
    evt.preventDefault();
    onSubmit(contactName, contactNumber);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={onContactInfoSubmit} className={css.contactsForm}>
      <label htmlFor={nameInputId}>Name</label>
      <input
        id={nameInputId}
        value={contactName}
        onChange={inputHandler}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label htmlFor={numberInputId}>Number</label>
      <input
        id={numberInputId}
        value={contactNumber}
        onChange={inputHandler}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className="submitContactBtn" type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
