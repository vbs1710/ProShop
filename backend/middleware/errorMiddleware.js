// ye wala error ya middleware invoke jab hi hoga when url jo hum request kr rhe h vo exist nhi krti ... for eg. /api/products/1 exist nhi krti(1 objectId mei cast nhi hoga(cast to objectId failed aisa kuch error aayega)) pr /api/products/62170f12389b7803e18809e5 (62170f12389b7803e18809e5 ye id database mei exist krti h pr ismei agar ek number bhi change kr du toh vo id objectID mei cast toh ho jaayegi pr exist nhi kregi databse mei aur iss case mei sirf niche wala middleware invoke hoga ) 
const notFound = (req,res,next) => {
    const e = new Error(`Not Found - ${req.originalUrl}`) // jo parenthesis mei h vo naye error ka message h
    res.status(404)
    next(e)
}

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export {notFound,errorHandler} 