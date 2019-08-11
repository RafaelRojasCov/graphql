import { Router } from "express";
import execFirebase from "../bin/firebase";

const router = Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/firestore", (req, res, next) => {
  res.send(execFirebase());
});

export default router;
