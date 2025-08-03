const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const WrapAsync = require("../utils/wrapAsync.js");
const{isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const{storage} = require("../cloudConfig.js");
const upload = multer({storage});

router
.route("/")
.get( WrapAsync(listingController.index))
.post( isLoggedIn,
   
    upload.single('listing[image]'),
     validateListing,
    WrapAsync(listingController.createListings)
);

//NEW ROUTE
router.get("/new", isLoggedIn,(listingController.renderNewForm));

router.route("/:id")
.get(WrapAsync(listingController.showListing))
.put(isLoggedIn, 
    isOwner,
    upload.single('listing[image]'),
    validateListing, 
    WrapAsync( listingController.updateListings))
.delete( isLoggedIn, isOwner,
    WrapAsync( listingController.destroyListing)
);

//EDIT ROUTE
router.get("/:id/edit", isLoggedIn, isOwner,
    WrapAsync( listingController.renderEditForm));

module.exports = router;

