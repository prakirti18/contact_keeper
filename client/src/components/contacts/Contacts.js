import React, { Fragment, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts } = contactContext;

  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  },[]);


  if (contacts!==null && contacts.length === 0) {
    return <h4>Please add a contact.</h4>;
  }

  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map((contact) => (
              <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact}/>
              </CSSTransition>
            ))
          : contacts!==null && contacts.map((contact) => (
              <CSSTransition  key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact}/>
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
