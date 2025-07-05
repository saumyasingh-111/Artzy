const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing = require("../models/listing");
const {listingSchema}=require("../schemas.js");
const{isLoggedIn, isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const {storage}=require("../cloudConfig.js")
const multer=require('multer');
const upload=multer({storage})

router.route("/")
.get(wrapAsync(listingController.index))
.post(
  isLoggedIn,
  upload.single('listing[image]'),
    validateListing,
  wrapAsync(listingController.createListing));


//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

module.exports.createListing = async (req, res) => {
    const listing = new Listing(req.body.listing);
    listing.image = {
        url: req.file.path,
        filename: req.file.filename
    };
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
};

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
  isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.updateListing)
)
  .delete(isLoggedIn, isOwner,wrapAsync(listingController.destroyListing));



//Edit Route
router.get("/:id/edit",
  isLoggedIn,
   isOwner,
   wrapAsync(listingController.renderEditForm)
  );


module.exports=router;