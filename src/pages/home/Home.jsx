import ContactList from '../../components/contactList/ContactList'
import './Home.css'

function Home() {
  return (
    <div className='d-flex flex-column justify-content-center w-100 p-1'>
      <h3 className="fs-1 fw-bold front text-cust-color text-center mt-4">Contacts</h3>
      <ContactList />
    </div>
  );
}

export default Home;
