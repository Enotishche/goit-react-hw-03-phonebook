import propTypes from 'prop-types';
import styles from './Filter.module.css';

const ContactsFilter = ({ filter, handleChange }) => {
  return (
    <div>
      <h3>Find contacts by name</h3>
      <input
        type="text"
        name="filter"
        onChange={handleChange}
        value={filter}
        className={styles.filter}
        placeholder="Filter"
      />
    </div>
  );
};

ContactsFilter.propTypes = {
  handleChange: propTypes.func.isRequired,
  filter: propTypes.string.isRequired,
};

export default ContactsFilter;
