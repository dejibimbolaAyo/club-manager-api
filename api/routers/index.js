const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = express.Router();
const passport = require('passport');
const appRoot = require('app-root-path');

require(`${appRoot}/api/middleware/authentication/passport`)

router.use(cors());
router.use(express.json());
router.use(cookieParser());
router.use(express.urlencoded({ extended: true }));
router.use(passport.initialize());
router.options('*', cors())


export default router