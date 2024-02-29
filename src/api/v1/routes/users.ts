import {Router} from "express";

export const router: Router = Router();

// middleware that is specific to this router
/*router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
});*/
// define the home page route
router.get('/sign-in', (req, res) => {
  res.status(200).send({user: "Signed in!"});
});
