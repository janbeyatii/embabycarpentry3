import ContactFormInline from './ContactFormInline'

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <h1 className="heading"> contact us </h1>

      <div className="row">
        <iframe 
          className="map" 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89305.30000000001!2d-75.9308!3d45.4215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce0718cc4a6ad7%3A0x79e097b3e1c0b3b8!2sOttawa%2C%20ON!5e0!3m2!1sen!2sca!4v1641716772852!5m2!1sen!2sca" 
          allowFullScreen={true} 
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <ContactFormInline />
      </div>
    </section>
  )
}
