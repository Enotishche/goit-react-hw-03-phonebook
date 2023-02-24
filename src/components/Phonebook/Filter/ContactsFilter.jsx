import propTypes from 'prop-types';
import styles from './Filter.module.css';

const ContactsFilter = ({ filter, onChange }) => {
  return (
    <div>
      <h3>Find contacts by name</h3>
      <input
        type="text"
        name="filter"
        onChange={onChange}
        value={filter}
        className={styles.filter}
        placeholder="Filter"
      />
    </div>
  );
};

ContactsFilter.propTypes = {
  onChange: propTypes.func.isRequired,
  filter: propTypes.string.isRequired,
};

export default ContactsFilter;
