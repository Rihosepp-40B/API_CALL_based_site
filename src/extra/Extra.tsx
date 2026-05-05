import { motion } from "framer-motion"

export default function ExtraApp() {
  // lihtsalt piltidega leht, kolmandaks leheks
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
                      src="https://akns-images.eonline.com/eol_images/Entire_Site/20260320/eb2d7e1c-9faf-4aae-8b70-f3277239428f_1774017069.jpg?fit=around%7C776:481&output-quality=90&crop=776:481;center,top"
                      alt=""
                      className="img-fluid"
                    />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="col-md-12 rounded-start lightning left">
                      <img
                      src="https://akns-images.eonline.com/eol_images/Entire_Site/20260320/674e6c64-8e0d-4ab7-93d3-bf7414dcd5b6_1774031050.jpg?fit=around%7C776:1254&output-quality=90&crop=776:1254;center,top"
                      alt=""
                      className="img-fluid"
                    />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="col-md-12 rounded-start lightning left">
                      <img
                      src="https://akns-images.eonline.com/eol_images/Entire_Site/20260320/f0c048d4-53b1-4834-abc7-bfcec1a8056c_1774031050.jpg?fit=around%7C776:1254&output-quality=90&crop=776:1254;center,top"
                      alt=""
                      className="img-fluid"
                    />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="col-md-12 rounded-start lightning right">
                      <img
                      src="https://i.guim.co.uk/img/media/2653774b3949670483c1c637c4b43ad06eea84ed/0_0_4563_3062/master/4563.jpg?width=1020&dpr=1&s=none&crop=none"
                      alt=""
                      className="img-fluid"
                    />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="col-md-12 rounded-start lightning right">
                      <img
                      src="https://i.guim.co.uk/img/media/a054b27f71103433c0dc99bf1b2a33eca56e644c/0_0_2662_2700/master/2662.jpg?width=1020&dpr=1&s=none&crop=none"
                      alt=""
                      className="img-fluid"
                    />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="col-md-12 rounded-start lightning right">
                      <img
                      src="https://i.guim.co.uk/img/media/c465df27889ec1a0a36d1a2972559928c7ffdcc6/0_0_3600_2400/master/3600.jpg?width=1020&dpr=1&s=none&crop=none"
                      alt=""
                      className="img-fluid"
                    />
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div className="col-12 row">
              <div className="">

              </div>
          </div>
          <div className="col-12 row">
              <div className="">

              </div>
          </div>
        </div>
      </motion.div>
    </div>  
  )
}