import React from "react";
import ContactCard from "../contactCard/ContactCard";
import { useGlobalStore } from "../../hooks/useGlobalStore.js";
import { useLocation } from "react-router";

import photo1 from "../../assets/images/img.1.jpeg";
import photo2 from "../../assets/images/img.2.jpeg";
import photo3 from "../../assets/images/img.3.jpeg";
import photo4 from "../../assets/images/img.4.jpeg";

const contactImages = [photo1, photo2, photo3, photo4];

function ContactList() {
  const { store } = useGlobalStore();
  const location = useLocation();

  const hadleFavoritesPath = () => {
    if (location.pathname === "/favorites") {
      return store.contacts.filter((contact) => contact.is_favorite);
    }
    return store.contacts;
  };

  return (
    <div className="d-flex justify-content-center flex-column align-items-center gap-2">
      {hadleFavoritesPath().length > 0 ? (
        hadleFavoritesPath().map((contact) => (
          <ContactCard
            key={contact.id}
            base64_image={
              contact.base64_image ||
              contactImages[contact.id % contactImages.length]
            }
            city={contact.city}
            country={contact.country}
            email={contact.email}
            full_name={contact.full_name}
            id={contact.id}
            is_favorite={contact.is_favorite}
            phone_number={contact.phone_number}
          />
        ))
      ) : (
        <div className="d-flex flex-column justify-content-center z-3">
          <h6 className="text-light text-center mt-5 fs-3">
            No contacts here yet...
          </h6>
          <img src="/no-connection.png" alt="No Data" />
        </div>
      )}
    </div>
  );
}

export default ContactList;
