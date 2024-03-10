import express, {Router} from "express";
import {validateToken} from "../middleware/validateToken";

export const router: Router = Router();

// middleware that is specific to this router
/*router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
});*/
// define the home page route
router.post('/sign-in', (req: express.Request, res: express.Response) => {
  res.status(200).send({user: "Signed in!"});
});

router.get('/token', (req, res) => {
  res.status(200).send({user: "Signed in!"});
});
