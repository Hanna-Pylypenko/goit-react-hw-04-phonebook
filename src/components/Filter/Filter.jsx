import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ value, onChange }) => {
  const filterId = nanoid();
  return (
    <div className={css.filterInput}>
      <label htmlFor={filterId} className={css.filterLabel}>
        Find contacts by name
        <input
          value={value}
          type="text"
          name="filter"
          id={filterId}
          onChange={onChange}
        />
      </label>
    </div>
  );
};
Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
