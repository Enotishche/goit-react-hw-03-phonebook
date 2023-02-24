import { Component } from 'react';
import FormAddContact from './FormAddContact/FormAddContact';
import ContactList from './ContactList/ContactList';
import ContactsFilter from './Filter/ContactsFilter';
import { nanoid } from 'nanoid';
import styles from './Phonebook.module.css';

class Phonebook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const localContacts = JSON.parse(localStorage.getItem('contacts'));
    if (localContacts) {
      this.setState({ contacts: localContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = contact => {
    if (this.isDuplicate(contact)) {
      return alert(
        `${contact.name} - ${contact.number} is already in contacts`
      );
    }
    this.setState(prev => {
      const newContact = {
        id: nanoid(),
        ...contact,
      };
      return {
        contacts: [...prev.contacts, newContact],
      };
    });
  };

  removeContact = id => {
    this.setState(prev => {
      const newContacts = prev.contacts.filter(item => item.id !== id);

      return {
        contacts: newContacts,
      };
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  isDuplicate({ name, number }) {
    const { contacts } = this.state;
    const result = contacts.find(
      item => item.name === name || item.number === number
    );
    return result;
  }

  getFilteredContacts() {
    const { contacts, filter } = this.state;

    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(({ name, number }) => {
      const normalizedName = name.toLocaleLowerCase();
      const normalizedNumber = number.toLocaleLowerCase();
      const result =
        normalizedName.includes(normalizedFilter) ||
        normalizedNumber.includes(normalizedFilter);
      return result;
    });

    return filteredContacts;
  }

  render() {
    const { addContact, removeContact, handleChange } = this;
    const { filter } = this.state;
    const contacts = this.getFilteredContacts();
    const isContacts = contacts.length !== 0;
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Contacts</h2>

        <div className={styles.contactBlock}>
          <div>
            <FormAddContact onSubmit={addContact} />
          </div>
          <div>
            <ContactsFilter onChange={handleChange} filter={filter} />
            <ContactList items={contacts} removeContact={removeContact} />
          </div>
          {!isContacts && <p>There are no contacts yet</p>}
        </div>
      </div>
    );
  }
}
export default Phonebook;
