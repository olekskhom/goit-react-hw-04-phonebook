import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localeStorageData = JSON.parse(localStorage.getItem('contacts'));
    setContacts(() => [...localeStorageData]);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFilterChange = event => {
    setFilter(() => event.target.value);
  };

  const addContact = (name, number, id) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }

    setContacts(prevState => [...prevState, { name, number, id }]);
  };

  const filterContacts = () => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const deleteContact = name => {
    const deleteContacts = contacts.filter(contact => {
      return contact.name.toLowerCase() !== name.toLowerCase();
    });

    setContacts(() => [...deleteContacts]);
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Phonebook</h2>
      <ContactForm addContact={addContact} />
      <h2 className={css.title}>Contacts</h2>
      <Filter filter={filter} hendleFilterChange={handleFilterChange} />
      <ContactList contacts={filterContacts()} deleteContact={deleteContact} />
    </div>
  );
};
