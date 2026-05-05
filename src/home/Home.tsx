import { motion } from "framer-motion"
import RandomApp from './RandomApp'

export default function HomeApp() {
  // Tervitus leht
  return (
    <div className="container my-5">
      <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className=""
      >
        <div className="row my-5">
          <div className="col-12">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-2">
                  <div className="col-md-12 rounded-start lightning left">
                    <img
                    src="https://akns-images.eonline.com/eol_images/Entire_Site/20260320/6b7559fa-5100-48e8-addd-1ed70d1f0a75_1774031050.jpg?fit=around%7C776:1254&output-quality=90&crop=776:1254;center,top"
                    alt=""
                    className="img-fluid"
                  />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h1 className="card-title">Welcome</h1>
                    <p className="card-text">
                      For a quick Chuck Norris joke feel free to use random joke selector below.
                    </p>
                    <p className="card-text">
                      Or you can go to surf around for more content.
                    </p>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="lightning right">
                  <img
                    src="https://i.guim.co.uk/img/media/5b18ad34e7f560fa86b503d756fe67eeceaeac39/0_0_1877_2833/master/1877.jpg?width=1020&dpr=1&s=none&crop=none"
                    alt=""
                    className="img-fluid rounded-end"
                  />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RandomApp />
      </motion.div>
    </div>  
  )
}