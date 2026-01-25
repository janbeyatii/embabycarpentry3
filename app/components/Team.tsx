import Image from 'next/image'

export default function Team() {
  const teamMembers = [
    {
      name: 'John Smith',
      role: 'Lead Carpenter',
      image: '/images/pic-1.png',
      bio: '20+ years of experience in custom carpentry and construction'
    },
    {
      name: 'Mike Johnson',
      role: 'Project Manager',
      image: '/images/pic-2.png',
      bio: 'Expert in managing large-scale construction projects'
    },
    {
      name: 'David Williams',
      role: 'Master Builder',
      image: '/images/pic-3.png',
      bio: 'Specialized in architectural design and implementation'
    },
    {
      name: 'Robert Brown',
      role: 'Safety Coordinator',
      image: '/images/pic-4.png',
      bio: 'Ensuring all projects meet the highest safety standards'
    }
  ]

  return (
    <section className="team" id="team">
      <h1 className="heading heading-center">Our Expert Team</h1>
      <p className="subheading" style={{ textAlign: 'center', maxWidth: '60rem', margin: '0 auto 4rem' }}>
        Meet the skilled professionals who bring your construction dreams to life
      </p>

      <div className="box-container team-box-container">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <div className="image">
              <Image src={member.image} alt={member.name} width={300} height={300} />
            </div>
            <div className="content">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <p style={{ fontSize: '1.3rem', color: 'var(--light-color)', marginTop: '1rem' }}>
                {member.bio}
              </p>
              <div className="social">
                <a href="#" aria-label={`${member.name} LinkedIn`}>
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" aria-label={`${member.name} Twitter`}>
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" aria-label={`${member.name} Email`}>
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
