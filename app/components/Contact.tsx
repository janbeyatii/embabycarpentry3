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
        ></iframe>

        <form action="">
          <h3>get in touch</h3>
          <input
            type="text"
            name="name"
            placeholder="name"
            className="box"
            required
            minLength={2}
            pattern="[A-Za-z\s\-']+"
            title="Please enter a valid name (letters, spaces, hyphens or apostrophes only)"
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            className="box"
            required
            title="Please enter a valid email address"
          />
          <input
            type="tel"
            name="phone"
            placeholder="phone (e.g. 613-555-1234)"
            className="box"
            required
            pattern="[\d\s\-\.\(\)\+]{10,20}"
            title="Please enter a valid phone number (10–20 digits, may include spaces, dashes, parentheses or +)"
          />
          <textarea
            name="message"
            placeholder="message"
            className="box"
            cols={30}
            rows={10}
            required
            minLength={10}
            title="Please enter at least 10 characters"
          ></textarea>
          <input type="submit" value="send message" className="btn" />
        </form>
      </div>
    </section>
  )
}
