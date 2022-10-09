import React, { useContext, useState } from 'react';
import ContactList from '../components/ContactList';
import { getContacts, deleteContact } from '../utils/api';
import SearchBar from '../components/SearchBar';
import { useSearchParams } from 'react-router-dom';
import LocaleContext from '../context/LocaleContext';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [contacts, setContacts] = useState([]);
  const [keyword, setKeyword] = useState(() => searchParams.get('keyword') || '');

  const { locale } = useContext(LocaleContext);

  React.useEffect(() => {
    async function fetchContacts() {
      const { data, error } = await getContacts();

      if (!error) {
        setContacts(data);
      }
    }

    fetchContacts();
  }, []);

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  async function onDeleteHandler(id) {
    await deleteContact(id);

    const { data } = await getContacts();
    setContacts(data);
  }

  const filteredContacts = contacts.filter((contact) => {
    return contact.name.toLowerCase().includes(keyword.toLocaleLowerCase());
  });

  return (
    <section>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <h2>{locale === 'id' ? 'Daftar Kontak' : 'Contacts List'}</h2>
      <ContactList contacts={filteredContacts} onDelete={onDeleteHandler} />
    </section>
  )
}

export default HomePage;