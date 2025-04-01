import Form from 'next/form'
import './globals.css';


export default function Page() {
    return (
        <>
        <main>
      <section className="order-form container">
         <form className="order__form">
            <div className="text">
               <h2>CONTACT</h2>
               <h2>MINITEL</h2>
            </div>
            <Form action="/search" className="form-group">
               <label for="fullName">Nom et Prénom :</label>
               <input type="text" id="fullName" name="name" required/>
            </Form>
       
            <div className="form-group">
               <label for="message">Message :</label>
               <textarea id="message" name="message" rows="5" required></textarea>
            </div>          
       
            <button type="submit" className="btn">ENVOYER</button>
         </form>
      </section>

      </main></>
    )
}