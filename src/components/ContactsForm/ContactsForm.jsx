import { nanoid } from 'nanoid';
import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ContactsForm.module.css';
export class ContactsForm extends Component {
  state = {
    name: '',
    number: '',
  };
  nameInputId = nanoid();
  numberInputId = nanoid();
  inputHandler = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };

  onContactInfoSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };
  reset = () => {
    this.setState({ name: '', number: '' });
  };
  render() {
    return (
      <form onSubmit={this.onContactInfoSubmit} className={css.contactsForm}>
        <label htmlFor={this.nameInputId}>Name</label>
        <input
          id={this.nameInputId}
          value={this.state.name}
          onChange={this.inputHandler}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label htmlFor={this.numberInputId}>Number</label>
        <input
          id={this.numberInputId}
          value={this.state.number}
          onChange={this.inputHandler}
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
  }
}

ContactsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
