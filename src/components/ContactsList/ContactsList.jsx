import css from './ContactsList.module.css';
import PropTypes from 'prop-types';
export const ContactsList = ({ filteredItems, deleteItem }) => {
  return (
    <ul className={css.contactsList}>
      {filteredItems.map(({ name, number, id }) => {
        return (
          <li key={id} className={css.contactsListItem}>
            {name}:{number}
            <button onClick={() => deleteItem(id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
};
ContactsList.propTypes = {
  filteredItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteItem: PropTypes.func.isRequired,
};
