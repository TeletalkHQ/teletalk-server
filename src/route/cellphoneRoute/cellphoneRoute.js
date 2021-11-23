const { Router } = require("express");

const { authDefaultMDW } = require("~/middleware/authDefaultMDW");
const { contactValidatorMDW } = require("~/middleware/contactValidatorMDW");
const { errorResponser } = require("~/middleware/errorResponser");
const { findUserFromDB } = require("~/middleware/findUserFromDB");
const { selfStuffControllerMDW } = require("~/middleware/selfStuffControllerMDW");
const { targetUserFinderByCellphone } = require("~/middleware/targetUserFinderByCellphone");

const {
	addContactCellphoneController,
} = require("~/controller/cellphoneController/indexCellphoneController");
const {
	addBlockCellphoneController,
} = require("~/controller/cellphoneController/addBlockCellphoneController");

const {
	cellphoneRouteTemplate: { addContact, addBlock },
} = require("~/template/routeTemplate/cellphoneRouteTemplate");

const cellphoneRoute = Router();

// cellphoneRoute.use(authDefaultMDW);
// cellphoneRoute.use(contactValidatorMDW);
// cellphoneRoute.use(selfStuffControllerMDW);

// cellphoneRoute.use(findUserFromDB);

// cellphoneRoute.use(targetUserFinderByCellphone);

// //? comment :  middleware: danger : errorResponser
// cellphoneRoute.use(errorResponser);

cellphoneRoute.post(addContact.route, addContactCellphoneController);
cellphoneRoute.post(addBlock.route, addBlockCellphoneController);

module.exports = { cellphoneRoute };
