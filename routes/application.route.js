import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { 
  applyJob, 
  getApplicants, 
  getAppliedJobs, 
  updateStatus, 
  sendMailToApplicant,   // ✅ new controller for mail feature
  sendMailToRecruiter    // ✅ optional, if you need recruiter mail feature
} from "../controllers/application.controller.js";

const router = express.Router();

// Existing routes (unchanged)
router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

// ✅ New mail feature routes
router.route("/mail/applicant/:id").post(isAuthenticated, sendMailToApplicant);
router.route("/mail/recruiter/:id").post(isAuthenticated, sendMailToRecruiter);

export default router;
