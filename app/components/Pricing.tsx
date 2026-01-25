export default function Pricing() {
  const plans = [
    { icon: 'fas fa-home', name: 'basic plan', price: 250, features: ['interior design', 'refurbishment', 'material supply', 'maintenance', '24/7 support'] },
    { icon: 'fas fa-building', name: 'premium plan', price: 650, features: ['interior design', 'refurbishment', 'material supply', 'maintenance', '24/7 support'] },
    { icon: 'fas fa-city', name: 'ultimate plan', price: 1250, features: ['interior design', 'refurbishment', 'material supply', 'maintenance', '24/7 support'] },
  ]

  return (
    <section className="pricing" id="pricing">
      <h1 className="heading"> our pricing </h1>

      <div className="box-container">
        {plans.map((plan, index) => (
          <div key={index} className="box">
            <i className={plan.icon}></i>
            <h3>{plan.name}</h3>
            <div className="price"><span>$</span>{plan.price}<span>/mo</span></div>
            <div className="list">
              {plan.features.map((feature, idx) => (
                <p key={idx}>{feature}</p>
              ))}
            </div>
            <a href="#" className="btn">choose plan</a>
          </div>
        ))}
      </div>
    </section>
  )
}
