

const     flashMiddleware = (req, res, next) => {
        // if there's a flash message, transfer
        // it to the context, then clear it
        res.locals.flash = req.session.flash
        delete req.session.flash
        next()
    }





const getNewsData = () => [
    {
      heading: 'Covid is Cured',
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      Auther: 'Una L\'Estrange'
    },
    {
        heading: 'Covid is still here',
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        Auther: 'Una again',

    }  
  ]
  
  const newsMiddleware = (req, res, next) => {
    if(!res.locals.partials) res.locals.partials = {}
    res.locals.partials.newsContext = getNewsData()
    next()
  }

module.exports = { newsMiddleware: newsMiddleware, flashMiddleware: flashMiddleware }
