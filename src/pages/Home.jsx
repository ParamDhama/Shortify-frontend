import Hero from '../components/Home/Hero'
import Features from '../components/Home/Features'
import Working from '../components/Home/Working'
import FAQ from '../components/Home/FAQ'
import Footer from '../components/Home/Footer'
import Navbar from '../components/Miscellaneous/Navbar'

function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Features/>
      <Working/>
      <FAQ/>
      <Footer/>
    </div>
  )
}

export default Home
