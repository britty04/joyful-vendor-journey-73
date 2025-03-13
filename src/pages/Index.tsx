
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import CategorySelector from '../components/CategorySelector';
import FeaturedVendors from '../components/FeaturedVendors';
import AIRecommendation from '../components/AIRecommendation';
import { Star, Award, Shield, Clock } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <Hero />
      
      {/* Trust Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <Star className="h-8 w-8 text-eventBlue-500" />, 
                title: 'Verified Vendors', 
                description: 'Every vendor is thoroughly vetted for quality and reliability.' 
              },
              { 
                icon: <Award className="h-8 w-8 text-eventPurple-500" />, 
                title: 'Best Price Guarantee', 
                description: 'Get the best rates with our price match promise.' 
              },
              { 
                icon: <Shield className="h-8 w-8 text-eventGreen-500" />, 
                title: 'Secure Bookings', 
                description: 'Your payments and personal data are always protected.' 
              },
              { 
                icon: <Clock className="h-8 w-8 text-eventRed-500" />, 
                title: '24/7 Support', 
                description: 'Our team is always available to help with any issues.' 
              }
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 p-3 bg-gray-50 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <CategorySelector />
      <FeaturedVendors />
      <AIRecommendation />
      
      {/* Customer Testimonials */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-bold text-gray-900 mb-4">What Parents Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of happy parents who found the perfect vendors for their children's events.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya Shah',
                role: 'Parent of 6-year-old',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                quote: 'Found an amazing magician for my son's birthday with just a few clicks. The kids were thrilled and I didn't have to stress about planning!'
              },
              {
                name: 'Rahul Mehta',
                role: 'Father of twins',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                quote: 'The AI recommendations helped me find vendors within my budget. Everything was perfect for my twins' 5th birthday celebration.'
              },
              {
                name: 'Anita Desai',
                role: 'Mother of 8-year-old',
                image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                quote: 'EventHive made it so easy to compare vendors and find the perfect cake decorator. The secure payment system gave me peace of mind.'
              }
            ].map((testimonial, index) => (
              <div key={index} className="glass-card rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={16} 
                      className="inline-block mr-1 text-yellow-400 fill-yellow-400" 
                    />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
          
          {/* Stats */}
          <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '5,000+', label: 'Verified Vendors' },
              { value: '15,000+', label: 'Successful Events' },
              { value: '98%', label: 'Satisfaction Rate' },
              { value: '24/7', label: 'Customer Support' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="font-bold text-3xl md:text-4xl text-primary mb-2">{stat.value}</div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-bold text-3xl md:text-4xl mb-6">Ready to Create Magical Memories?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Start planning your perfect event today with our curated selection of top-rated vendors.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/vendors" 
                className="rounded-full bg-white text-primary px-8 py-3 font-medium transition-all hover:bg-opacity-90 active:scale-95"
              >
                Find Vendors
              </a>
              <a 
                href="/vendor-signup" 
                className="rounded-full bg-transparent border border-white text-white px-8 py-3 font-medium transition-all hover:bg-white/10 active:scale-95"
              >
                Join as Vendor
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
