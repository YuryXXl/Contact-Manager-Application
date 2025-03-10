import { useState } from 'react';
import GlassCard from '../glassCard/GlassCard';
import './ContactCard.css';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { BsFillBookmarkDashFill } from 'react-icons/bs';
import { FcEditImage } from 'react-icons/fc';
import { FcRemoveImage } from 'react-icons/fc';
import { IoMdContact } from 'react-icons/io';
import {
  addToFavorites,
  fetchContacts,
  deleteFromFavorites,
} from '../../utils/api';
import { useGlobalStore } from '../../hooks/useGlobalStore';

function ContactCard({
  base64_image,
  city,
  country,
  email,
  full_name,
  id,
  is_favorite,
  phone_number,
}) {
  const { store, dispatch } = useGlobalStore();
  const [isFav, setIsFav] = useState(is_favorite);
  const handleFavorite = async () => {
    setIsFav((prev) => !prev);

    try {
      if (isFav) {
        await deleteFromFavorites(store.user.user_id, id);
      } else {
        await addToFavorites(store.user.user_id, id);
      }

      const getContactsResponse = await fetchContacts(store.user.user_id);
      console.log('Fetched Contacts: ', getContactsResponse);
      dispatch({ type: 'SET_CONTACTS', payload: getContactsResponse });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <GlassCard type="glass-contact-card">
      <div className="d-flex justify-content-between">
        <div className="d-flex justify-content-start align-items-center">
          <button
            onClick={handleFavorite}
            className="btn border border-0 m-0 p-0"
          >
            {is_favorite ? (
              <BsFillBookmarkCheckFill className="fs-5 text-primary opacity-75" />
            ) : (
              <BsFillBookmarkDashFill className="fs-5 text-light opacity-25" />
            )}
          </button>
          <div className="image-container">
            {base64_image ? (
              <img
                className="profile-image ms-4"
                src={base64_image}
                alt="Profile image"
              />
            ) : (
              <IoMdContact className="placeholder-image ms-4" />
            )}
          </div>
          <div className="text-light ms-5">
            <div className="fs-6 fw-bold cust-border">{full_name}</div>
            <div className="card-info-secondary">{phone_number}</div>
            <div className="card-info-secondary">{email}</div>
            <div className="card-info-secondary">{city}</div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <button className="btn border border-0 btn-sm m-0 p-0">
            <FcEditImage className="fs-3 opacity-50" />
          </button>
          <button className="btn border border-0 btn-sm m-0 p-0">
            <FcRemoveImage className="fs-3 opacity-50" />
          </button>
        </div>
      </div>
    </GlassCard>
  );
}

export default ContactCard;
